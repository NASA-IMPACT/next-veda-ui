import React from 'react';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { highlight } from 'sugar-high';
import { LegacyGlobalStyles } from '@lib';

import {
  Block,
  Prose,
  Caption,
  Chapter,
  Figure,
  Image,
  CompareImage,
  Chart,
} from '@lib';
import {
  EnhancedMapBlock,
  EnhancedScrollyTellingBlock,
} from './mdx-components/block';
import { getDatasetsMetadata } from 'app/content/utils/mdx';
import Providers from 'app/(datasets)/providers';

function Table({ data }: { data: any }) {
  const headers = data.headers.map((header, index) => (
    <th key={index}>{header}</th>
  ));
  const rows = data.rows.map((row, index) => (
    <tr key={index}>
      {row.map((cell, cellIndex) => (
        <td key={cellIndex}>{cell}</td>
      ))}
    </tr>
  ));

  return (
    <table>
      <thead>
        <tr>{headers}</tr>
      </thead>
      <tbody>{rows}</tbody>
    </table>
  );
}

function Code({ children, ...props }: { children: any }) {
  const codeHTML = highlight(children);
  return <code dangerouslySetInnerHTML={{ __html: codeHTML }} {...props} />;
}

function slugify(str) {
  return str
    .toString()
    .toLowerCase()
    .trim() // Remove whitespace from both ends of a string
    .replace(/\s+/g, '-') // Replace spaces with -
    .replace(/&/g, '-and-') // Replace & with 'and'
    .replace(/[^\w\-]+/g, '') // Remove all non-word characters except for -
    .replace(/\-\-+/g, '-'); // Replace multiple - with single -
}

function createHeading(level) {
  const Heading = ({ children }: { children: JSX.Element }) => {
    const slug = slugify(children);
    return React.createElement(
      `h${level}`,
      { id: slug },
      [
        React.createElement('a', {
          href: `#${slug}`,
          key: `link-${slug}`,
          className: 'anchor',
        }),
      ],
      children,
    );
  };

  Heading.displayName = `Heading${level}`;

  return Heading;
}

const components = {
  h1: createHeading(1),
  h2: createHeading(2),
  h3: createHeading(3),
  h4: createHeading(4),
  h5: createHeading(5),
  h6: createHeading(6),
  code: Code,
  Table,
  Block: Block,
  Prose: Prose,
  Caption: Caption,
  Figure: Figure,
  Image: Image,
  Map: EnhancedMapBlock,
  CompareImage: CompareImage,
  ScrollytellingBlock: EnhancedScrollyTellingBlock,
  Link: Link,
  Chapter: Chapter,
  Chart: Chart,
};

export function CustomMDX(props: any) {
  const datasets = getDatasetsMetadata();
  return (
    <Providers datasets={datasets}>
      <LegacyGlobalStyles />
      <MDXRemote
        {...props}
        components={{ ...components, ...(props.components || {}) }}
      >
        {props.children}
      </MDXRemote>
    </Providers>
  );
}
