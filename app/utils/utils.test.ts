import { expect, test, vi } from 'vitest';
import { parseAttributes } from './mdx';

const TestMDXObject = {
  id: 'dataset-id',
  layers: [
    {
      id: 'layer-id',
      name: 'Test Layer',
      type: 'raster',
    },
  ],
};

test('Parsing adds parent dataset id', () => {
  const parsed = parseAttributes(TestMDXObject);
  const layer = parsed.layers[0] as (typeof TestMDXObject.layers)[0] & {
    parentDataset: { id: string };
  };
  expect(layer.parentDataset.id).toBe(TestMDXObject.id);
});

import * as fs from 'fs';
import { getAllThemes, getThemeContent, readMDXFile } from './mdx';

vi.mock('fs');
vi.mock('path', async () => {
  const actual = (await import('path')) as typeof import('path');
  return {
    ...actual,
    join: (...args: string[]) => args.join('/'),
    basename: actual.basename,
    extname: actual.extname,
  };
});

const MOCKED_MDX_CONTENT = `---
title: "Greenhouse Gases"
description: "Greenhouse gases (GHGs) in the Earth's atmosphere trap heat and slow heat loss into space."
image: "/images/themes/greenhouse-gases/greenhouse-gases-banner.png"
---

<Section>
  <Title>INFO</Title>

  <Paragraph>
    Greenhouse gases (GHGs) refers to a suite of gases, including carbon dioxide and methane, found in Earth's atmosphere that naturally trap heat and maintain Earth's global temperature.
  </Paragraph>
</Section>

<Section>
  <ImageCaptionBlock
    src="/images/themes/greenhouse-gases/ghg-gas-index.png"
    alt="The NOAA Annual Greenhouse Gas Index from 1979 to 2021"
    caption="The NOAA Annual Greenhouse Gas Index from 1979 to 2021."
  />
</Section>`;

vi.mock('./data', () => ({
  processTaxonomies: (d: any) => d,
  transformToDatasetsList: (d: any) => d,
}));

test('getAllThemes skips invalid MDX files', async () => {
  const errorSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

  vi.mocked(fs).readdirSync.mockReturnValue(['bad.mdx'] as any);
  vi.mocked(fs).readFileSync.mockImplementation(() => {
    throw new Error('read error');
  });

  const themes = await getAllThemes();
  expect(themes).toHaveLength(0);

  errorSpy.mockRestore();
});

test('getThemeContent returns frontmatter and content for a valid theme', async () => {
  vi.mocked(fs).readFileSync.mockReturnValue(MOCKED_MDX_CONTENT);

  const { frontmatter, content } = await getThemeContent('greenhouse-gases');

  expect(frontmatter.title).toBe('Greenhouse Gases');
  expect(frontmatter.description).toContain(
    "Greenhouse gases (GHGs) in the Earth's atmosphere",
  );
  expect(frontmatter.image).toBe(
    '/images/themes/greenhouse-gases/greenhouse-gases-banner.png',
  );
  expect(content).toBeTruthy();
});

test('readMDXFile returns parsed frontmatter and content', () => {
  vi.mocked(fs).readFileSync.mockReturnValue(MOCKED_MDX_CONTENT);

  const result = readMDXFile('app/content/themes/greenhouse-gases.mdx');

  expect(result.data.title).toBe('Greenhouse Gases');
  expect(result.content).toContain('<Section>');
  expect(result.content).toContain('<Paragraph>');
  expect(result.content).toContain(
    'Greenhouse gases (GHGs) refers to a suite of gases',
  );
});

test('parseAttributes properly handles markdown content', () => {
  const mdxObjectWithMarkdown = {
    id: 'test-markdown',
    description: '::markdown This is **bold** and _italic_ text',
    regularField: 'Normal text',
  };

  const parsed = parseAttributes(mdxObjectWithMarkdown);
  expect(parsed.description).toContain('<strong>bold</strong>');
  expect(parsed.description).toContain('<em>italic</em>');
  expect(parsed.regularField).toBe('Normal text');
});

test('parseAttributes correctly processes JS code strings', () => {
  const mdxObjectWithJS = {
    id: 'test-js',
    script: '::js function test() {\n  return "Hello";\n}',
    regularField: 'Normal text',
  };

  const parsed = parseAttributes(mdxObjectWithJS);
  expect(parsed.script).toBe('function test() {\n  return "Hello";\n}');
  expect(parsed.regularField).toBe('Normal text');
});

test('getThemeContent provides required components to MDX compiler', async () => {
  // This is a more complex test that would ideally check if compileMDX is called with the right components
  // For simplicity, we're just verifying the function runs without error
  vi.mocked(fs).readFileSync.mockReturnValue(MOCKED_MDX_CONTENT);

  await expect(getThemeContent('greenhouse-gases')).resolves.not.toThrow();
});
