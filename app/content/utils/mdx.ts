import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import markdownit from 'markdown-it';
import { transformToDatasetsList, processTaxonomies, isDataset } from './data';
import type {
  DatasetMetadata,
  ContentMetadata,
  DatasetWithContent,
} from 'app/types/content';

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

const md = markdownit();

function parseAttributes(obj) {
  const convert = (obj) => {
    return Object.keys(obj).reduce(
      (acc, key) => {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
          acc[key] = convert(obj[key]);
        } else if (typeof obj[key] === 'string') {
          if (obj[key].includes('::markdown')) {
            const v = obj[key];
            const p = v.replace(/^::markdown ?/, '');
            // Conver the string to HTML
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

  return convert(obj);
}

function getMDXFiles(dir) {
  return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath) {
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

export function getStoriesMetadata() {
  return getMDXMetaData(STORY_CONTENT_PATH);
}

export function getStories() {
  return getMDXData(STORY_CONTENT_PATH);
}

export function getDatasetsMetadata() {
  return getMDXMetaData(DATASET_CONTENT_PATH);
}

export function getDatasets() {
  return getMDXData(DATASET_CONTENT_PATH);
}

export function getTransformedDatasetMetadata() {
  return transformToDatasetsList(getDatasetsMetadata() as DatasetMetadata[]);
}

export function getTransformedDatasets() {
  return transformToDatasetsList(getDatasets() as DatasetWithContent[]);
}
