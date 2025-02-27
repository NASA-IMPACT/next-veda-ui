import React from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getStories } from 'app/content/utils/mdx';
import { PageHero } from '@lib';

async function generateStaticParams() {
  const posts = getStories();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337';
  const path = `/api/articles?filters%5Bslug%5D%5B$eq%5D=${slug}&populate=*`;

  const url = new URL(path, baseUrl);
  console.log(url);
  const res = await fetch(url);

  const data = await res.json();
  return data;
}

async function translateData(slug) {
  let strapiData;
  await getPost(slug).then((data) => {
    strapiData = data;
  });

  const { description, name, cover, blocks } = strapiData.data[0];
  const components = blocks[0].body;
  const newData = {
    metadata: {
      id: slug,
      name: name,
      description: description,
      media: {
        src: `http://localhost:1337${cover.formats.large.url}`,
        alt: cover.alternativeText,
      },
    },
    slug,
    content: components,
  };
  return newData;
}

export default async function StoryOverview({ params }: { params: any }) {
  console.log('this is a test');
  const strapiOn = process.env.USE_STRAPI_CMS;
  console.log(strapiOn);

  const post = await translateData(params.slug);
  // if (strapiOn) {
  // post = await translateData(params.slug);
  // } else {
  //   post = getStories().find((post) => post.slug === params.slug);
  // }
  if (!post) {
    notFound();
  }
  return (
    <section>
      <script
        type='application/ld+json'
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Story',
            title: post.metadata.name,
            description: post.metadata.description,
            coverSrc: post.metadata.media?.src,
            coverAlt: post.metadata.media?.alt,
          }),
        }}
      />
      <article className='prose'>
        <PageHero
          title={post.metadata.name}
          description={post.metadata.description}
          coverSrc={post.metadata.media?.src}
          coverAlt={post.metadata.media?.alt}
        />
        <CustomMDX source={post.content} />
      </article>
    </section>
  );
}
