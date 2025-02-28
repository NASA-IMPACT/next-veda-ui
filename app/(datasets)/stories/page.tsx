import React from 'react';
import { getStoriesMetadata } from 'app/content/utils/mdx';
import Hub from './hub';
import { processTaxonomies } from 'app/content/utils/data';

export default async function Page() {
  const stories = getStoriesMetadata().map((d) => ({
    ...d.metadata,
    path: `stories/${d.slug}`,
  }));

  const fetchStories = async () => {
    const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? process.env.DEV_URL;
    const path = `/api/articles?&populate=*`;

    const url = new URL(path, baseUrl);
    const res = await fetch(url);

    const data = await res.json();
    return data;
  };

  async function translateData() {
    let strapiData;
    await fetchStories().then((data) => {
      strapiData = data;
    });
    // console.log('strapiData', strapiData);

    const newData = strapiData.data.map((item) => {
      const { description, name, cover, slug, publishedAt } = item;

      return {
        id: slug,
        name: name,
        description: description,
        media: {
          src: `http://localhost:1337${cover.formats.large.url}`,
          alt: item.cover.alternativeText,
        },
        path: `stories/${slug}`,
        pubDate: { publishedAt },
        taxonomy: ['test'],
      };
    });
    return newData;
  }
  const strapiStories = await translateData();
  console.log('newData', strapiStories);
  return (
    <section>
      <div className='grid-container'>
        <Hub stories={strapiStories} />
      </div>
    </section>
  );
}
