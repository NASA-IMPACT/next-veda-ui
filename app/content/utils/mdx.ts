import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownit from 'markdown-it';
import { transformToDatasetsList, processTaxonomies } from './data';
import type {
  DatasetMetadata,
  ContentMetadata,
  DatasetWithContent,
  StoryWithContent,
  StoryMetadata,
} from 'app/types/content';
import { compileMDX } from 'next-mdx-remote/rsc';
import React from 'react';
import { Paragraph } from 'app/components/common/Paragraph';
import { Section } from 'app/components/common/Section';
import { VideoCaptionBlock } from 'app/components/common/VideoCaptionBlock';
import { ImageCaptionBlock } from 'app/components/common/ImageCaptionBlock';
import { Title } from 'app/components/common/Title';
import Carousel from 'app/components/common/Carousel';
import dynamic from 'next/dynamic';

const ClientOnly = dynamic(() => import('app/components/common/ClientOnly'), {
  ssr: false,
});

type ThemeFrontmatter = {
  title: string;
  description: string;
  image: string;
  pubDate?: string;
};

const STORY_CONTENT_PATH = path.join(
  process.cwd(),
  'app',
  'content',
  'stories',
);
const DATASET_CONTENT_PATH = path.join(
  process.cwd(),
  'app',
  'content',
  'datasets',
);

const THEME_CONTENT_PATH = path.join(process.cwd(), 'app', 'content', 'themes');

const md = markdownit();

export function parseAttributes<T extends Record<string, any>>(obj: T): T {
  const mdxData = {
    ...obj,
    ...(obj.layers
      ? {
          layers: obj.layers?.map((l) => ({
            ...l,
            parentDataset: { id: obj.id },
          })),
        }
      : {}),
  };

  const convert = (obj: any): any => {
    return Object.keys(obj).reduce(
      (acc: any, key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          acc[key] = convert(obj[key]);
        } else if (typeof obj[key] === 'string') {
          if (obj[key].includes('::markdown')) {
            const v = obj[key];
            const p = v.replace(/^::markdown ?/, '');
            const parsedVal = md.render(p);
            acc[key] = parsedVal.replaceAll(/(\r\n|\n|\r)/gm, '');
            return acc;
          }
          if (obj[key].includes('::js')) {
            const v = obj[key];
            const p = v.replace(/^::js ?/, '').replaceAll('\\n', '\n');
            acc[key] = p;
            return acc;
          } else {
            acc[key] = obj[key];
          }
        } else {
          acc[key] = obj[key];
        }
        return acc;
      },
      Array.isArray(obj) ? [] : {},
    );
  };

  return convert(mdxData) as T;
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

export function readMDXFile(filePath) {
  const rawContent = fs.readFileSync(filePath, 'utf-8');
  const parsedData = matter(rawContent);
  return parsedData;
}

function getMDXData(dir): ContentMetadata[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { content, data } = readMDXFile(path.join(dir, file));
    const parsedData = parseAttributes(data);
    const processedData = processTaxonomies(parsedData);
    const slug = path.basename(file, path.extname(file));

    return {
      metadata: processedData,
      slug,
      content,
    };
  });
}

function getMDXMetaData(dir: string): ContentMetadata[] {
  const mdxFiles = getMDXFiles(dir);
  return mdxFiles.map((file) => {
    const { data } = readMDXFile(path.join(dir, file));
    const parsedData = parseAttributes(data);
    const processedData = processTaxonomies(parsedData);
    const slug = path.basename(file, path.extname(file));
    return {
      metadata: processedData,
      slug,
    };
  });
}

export function getStoriesMetadata(): StoryMetadata[] {
  return getMDXMetaData(STORY_CONTENT_PATH) as StoryMetadata[];
}

export function getStories() {
  return getMDXData(STORY_CONTENT_PATH) as StoryWithContent[];
}

export function getDatasetsMetadata(): DatasetMetadata[] {
  return getMDXMetaData(DATASET_CONTENT_PATH) as DatasetMetadata[];
}

export function getDatasets(): DatasetWithContent[] {
  return getMDXData(DATASET_CONTENT_PATH) as DatasetWithContent[];
}

export function getTransformedDatasetMetadata() {
  return transformToDatasetsList(getDatasetsMetadata());
}

export function getTransformedDatasets() {
  return transformToDatasetsList(getDatasets());
}

/**
 * Returns metadata (frontmatter) for all available themes.
 *
 * This is used for:
 * - `generateStaticParams()` to statically generate all dynamic [theme] routes.
 * - Building listing pages that show multiple themes with their title, image, etc.
 *
 * It avoids compiling the full MDX content for performance reasons,
 * and only reads/parses frontmatter from the MDX files.
 */
export async function getAllThemes() {
  return getMDXFiles(THEME_CONTENT_PATH)
    .map((filename) => {
      const filePath = path.join(THEME_CONTENT_PATH, filename);

      try {
        const { data } = readMDXFile(filePath);
        const parsedData = parseAttributes(data);
        const slug = path.basename(filename, '.mdx');

        return {
          slug,
          ...parsedData,
        };
      } catch (err) {
        console.error(`Failed to parse theme file ${filename}:`, err);
        return null;
      }
    })
    .filter(Boolean);
}

/**
 * Returns both frontmatter and compiled JSX content for a single theme by slug.
 *
 * This is used in dynamic page rendering of `/themes/[theme]` pages:
 * - Reads and parses the specified MDX file
 * - Compiles the full MDX content
 * - Returns both the frontmatter and compiled content
 *
 */
export async function getThemeContent(slug: string) {
  const filePath = path.join(THEME_CONTENT_PATH, `${slug}.mdx`);
  const { content: rawContent, data } = readMDXFile(filePath);
  const frontmatter = parseAttributes(data) as ThemeFrontmatter;

  const { content } = await compileMDX({
    source: rawContent,
    components: {
      ClientOnly,
      p: function P({ children }: { children: React.ReactNode }) {
        return React.createElement(React.Fragment, null, children);
      },
      ImageCaptionBlock,
      VideoCaptionBlock,
      Section,
      Paragraph,
      Title,
      Carousel,
    },
    options: { parseFrontmatter: false },
  });

  return { frontmatter, content };
}
