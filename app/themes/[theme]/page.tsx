import React from 'react';
import { notFound } from 'next/navigation';
import path from 'path';
import { compileMDX } from 'next-mdx-remote/rsc';
import {
  getAllThemes,
  parseAttributes,
  readMDXFile,
} from 'app/content/utils/mdx';
import ThemeHero from '../ThemeHero';

type ThemeFrontmatter = {
  title: string;
  description: string;
  image: string;
};

export async function generateStaticParams() {
  const themes = await getAllThemes();

  return themes
    .filter((theme): theme is { slug: string } => theme !== null)
    .map((theme) => ({
      theme: theme.slug,
    }));
}

export default async function ThemePage({
  params,
}: {
  params: { theme: string };
}) {
  const { theme } = params;

  try {
    const filePath = path.join('app', 'content', 'themes', `${theme}.mdx`);
    const { content: rawContent, data } = readMDXFile(filePath);
    const frontmatter = parseAttributes(data) as ThemeFrontmatter;

    const { content } = await compileMDX({
      source: rawContent,
      components: {
        // Override default <p> rendering to avoid nested <p> tags
        // since MDX wraps plain text in <p> automatically,
        // and wrapping it again in JSX would result in invalid HTML.
        p: ({ children }) => <>{children}</>,
      },
      options: { parseFrontmatter: false },
    });

    if (!frontmatter) {
      notFound();
    }

    return (
      <div className='themepage'>
        <ThemeHero
          title={frontmatter.title as string}
          description={frontmatter.description as string}
          coverSrc={frontmatter.image as string}
        />
        {content}
      </div>
    );
  } catch (error) {
    console.error(`Error loading theme ${theme}:`, error);
    notFound();
  }
}
