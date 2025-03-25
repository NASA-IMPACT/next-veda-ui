import { expect, test } from 'vitest';
import { parseAttributes } from '../../app/content/utils/mdx';

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
  // @ts-expect-error the function is not typed yet
  const layer = parsed.layers[0];
  expect(layer.parentDataset.id).toBe(TestMDXObject.id);
});
