import React from 'react';
import { notFound } from 'next/navigation';
import { getAllThemes, getThemeContent } from 'app/content/utils/mdx';
import ThemeHero from '../ThemeHero';

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
    const { frontmatter, content } = await getThemeContent(theme);

    if (!frontmatter) {
      notFound();
    }

    return (
      <div className='themepage'>
        <ThemeHero
          title={frontmatter.title}
          description={frontmatter.description}
          coverSrc={frontmatter.image}
        />
        {content}
      </div>
    );
  } catch (error) {
    console.error(`Error loading theme ${theme}:`, error);
    notFound();
  }
}
