import React from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getStories } from 'app/content/utils/mdx';

import {
  Block,
  Prose,
  Caption,
  Chapter,
  Figure,
  Image,
  CompareImage,
  Chart,
  PageHero,
} from '@lib';
import {
  EnhancedMapBlock,
  EnhancedScrollyTellingBlock,
} from '../../../components/mdx-components/block';
import Providers from 'app/(datasets)/providers';
import { draftMode } from 'next/headers';
import { ApolloClient, InMemoryCache, useQuery } from '@apollo/client';
import { STORIES_PAGE, STORIES_PAGE_DRAFT } from '../../../queries/stories';
import { getDatasetsMetadata } from 'app/content/utils/mdx';

async function generateStaticParams() {
  const posts = getStories();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

async function getPost(slug) {
  const baseUrl = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:1337';
  const path = `/api/articles?filters%5Bslug%5D%5B$eq%5D=${slug}&populate=*`;
  const { isEnabled } = await draftMode();

  const url = new URL(path, baseUrl);
  const res = await fetch(url);

  // const data = await res.json();

  const client = new ApolloClient({
    uri: process.env.STRAPI_GRAPHQL_API,
    cache: new InMemoryCache(),
  });

  const qeuryValue = isEnabled ? STORIES_PAGE_DRAFT : STORIES_PAGE;
  const status = isEnabled ? 'DRAFT' : 'PUBLISHED';
  console.log('isEnabled', isEnabled);
  const { data } = await client.query({
    query: qeuryValue,
    variables: { slug: slug },
  });

  return data;
}

async function translateData(slug) {
  let strapiData;
  await getPost(slug).then((data) => {
    strapiData = data;
  });
  const { description, name, cover, blocks } = strapiData.articles[0];
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
    content: blocks,
  };
  return newData;
}

export default async function StoryOverview({ params }: { params: any }) {
  const strapiOn = process.env.USE_STRAPI_CMS;
  let post;
  if (strapiOn) {
    post = await translateData(params.slug);
  } else {
    post = getStories().find((post) => post.slug === params.slug);
  }
  if (!post) {
    notFound();
  }
  const convertedDate = (dateFormat) => {
    if (dateFormat === 'MM_YYY') {
      return '%m/%Y';
    } else return '%d/%m/%Y';
  };
  const datasets = getDatasetsMetadata();
  const buildPage = (block) => {
    const components = block.__typename;
    switch (components) {
      case 'ComponentSharedCustomMdxBlock':
        return <CustomMDX source={block.customMDX} />;
        break;
      case 'ComponentSharedRichText':
        return (
          <div className='grid-row padding-bottom-3'>
            <CustomMDX source={block.body} />
          </div>
        );
        break;
      case 'ComponentSharedMedia':
        return (
          <div className='grid-row padding-bottom-3'>
            <img
              src={`http://localhost:1337${block.file.formats.medium.url}`}
              alt={block.file.alternativeText}
            />
          </div>
        );
        break;
      case 'ComponentSharedLineGraph':
        return (
          <div className='grid-row padding-bottom-3'>
            <Chart
              idKey={block.idKey}
              xKey={block.xKey}
              yKey={block.yKey}
              dateFormat={'%m/%Y'}
              dataPath={`http://localhost:1337${block.dataPath.url}`}
            />
            <Caption
              attrAuthor={block.Attribution.attributeAuthor}
              attrUrl={block.Attribution.attrURL}
            >
              {block.Caption}
            </Caption>
          </div>
        );
        break;
      case 'ComponentSharedMap':
        return (
          <div className='grid-row padding-bottom-3'>
            <div className='grid-col '>
              <EnhancedMapBlock
                datasetId={block.datasetId}
                layerId={block.layerId}
                zoom={block.zoom}
                center={block.center}
                dateTime={block.dateTime}
                compareDateTime={block.compareDateTime}
              />
              <Caption attrAuthor='NASA' attrUrl='https://nasa.gov/'>
                Comparison of nightlights data for Puerto Rico pre-landfall (17
                July 2017) and post-landfall (20 September 2017) for Hurricane
                Maria.
              </Caption>
            </div>
          </div>
        );
        break;
      case 'ComponentSharedGraphWithDesc':
        console.log(block);

        if (block.descriptionPosition === 'Description_Left') {
          return (
            <div className='grid-row padding-bottom-3'>
              <div className='grid-col-6 padding-right-2'>
                <CustomMDX source={block.sectionDesc.descriptionBlock} />
              </div>
              <div className='grid-col-6'>
                <Chart
                  idKey={block.lineGraph.idKey}
                  xKey={block.lineGraph.xKey}
                  yKey={block.lineGraph.yKey}
                  dateFormat={'%m/%Y'}
                  dataPath={`http://localhost:1337${block.lineGraph.dataPath.url}`}
                />

                <Caption
                  attrAuthor={block.lineGraph.Attribution.attributeAuthor}
                  attrUrl={block.lineGraph.Attribution.attrURL}
                >
                  {block.lineGraph.captionFig}
                </Caption>
              </div>
            </div>
          );
        } else {
          return (
            <div className='grid-row padding-bottom-3'>
              <div className='grid-col-6'>
                <Chart
                  idKey={block.lineGraph.idKey}
                  xKey={block.lineGraph.xKey}
                  yKey={block.lineGraph.yKey}
                  dateFormat={'%m/%Y'}
                  dataPath={`http://localhost:1337${block.lineGraph.dataPath.url}`}
                />

                <Caption
                  attrAuthor={block.lineGraph.Attribution.attributeAuthor}
                  attrUrl={block.lineGraph.Attribution.attrURL}
                >
                  {block.lineGraph.captionFig}
                </Caption>
              </div>
              <div className='grid-col-6 padding-left-2'>
                <CustomMDX source={block.sectionDesc.descriptionBlock} />
              </div>
            </div>
          );
        }

        break;
      case 'ComponentSharedSideBySide':
        if (block.Orientation === 'Image_Left') {
          return (
            <div className='grid-row padding-bottom-3'>
              <div className='grid-col-6'>
                <EnhancedMapBlock
                  datasetId={block.map.datasetId}
                  layerId={block.map.layerId}
                  zoom={block.map.zoom}
                  center={block.map.center}
                  dateTime={block.map.dateTime}
                  compareDateTime={block.map.compareDateTime}
                />
                <Caption attrAuthor='NASA' attrUrl='https://nasa.gov/'>
                  Comparison of nightlights data for Puerto Rico pre-landfall
                  (17 July 2017) and post-landfall (20 September 2017) for
                  Hurricane Maria.
                </Caption>
              </div>
              <div className='grid-col-6 padding-left-2'>
                <CustomMDX source={block.sectionDescription.customMDX} />
              </div>
            </div>
          );
        } else {
          return (
            <div className='grid-row padding-bottom-3'>
              <div className='grid-col-6 padding-right-2'>
                <CustomMDX source={block.sectionDescription.customMDX} />
              </div>
              <div className='grid-col-6'>
                <EnhancedMapBlock
                  datasetId={block.map.datasetId}
                  layerId={block.map.layerId}
                  zoom={block.map.zoom}
                  center={block.map.center}
                  dateTime={block.map.dateTime}
                  compareDateTime={block.map.compareDateTime}
                />
                <Caption attrAuthor='NASA' attrUrl='https://nasa.gov/'>
                  Comparison of nightlights data for Puerto Rico pre-landfall
                  (17 July 2017) and post-landfall (20 September 2017) for
                  Hurricane Maria.
                </Caption>
              </div>
            </div>
          );
        }
        break;
      default:
        return;
    }
  };

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
        <Providers>
          <PageHero
            title={post.metadata.name}
            description={post.metadata.description}
            coverSrc={post.metadata.media?.src}
            coverAlt={post.metadata.media?.alt}
          />
        </Providers>

        <div className='grid-container maxw-widescreen padding-x-0'>
          <Providers datasets={datasets}>
            {post.content.map((block) => {
              return <div className='padding-top-4'>{buildPage(block)}</div>;
            })}
          </Providers>
        </div>
      </article>
    </section>
  );
}
