import React from 'react';
import dynamic from 'next/dynamic';
import { getStoriesMetadata } from 'app/content/utils/mdx';

// @NOTE: Dynamically load to ensure only CSR since these depends on VedaUI ContextProvider for routing...
const StoriesHub = dynamic(() => import('./hub'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // @NOTE @TODO: We need a loading state!!!
});

export default async function Page() {
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

  const strapiOn = process.env.USE_STRAPI_CMS;
  let stories;
  if (strapiOn) {
    stories = await translateData();
  } else {
    const stories = getStoriesMetadata().map((d) => ({
      ...d.metadata,
      path: `stories/${d.slug}`,
    }));
  }

  return (
    <div className='grid-container'>
      <h1 className='font-ui-lg'>Stories</h1>
      <StoriesHub stories={stories} />
    </div>
  );
}
