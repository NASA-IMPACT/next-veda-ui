import React from 'react';
import { notFound } from 'next/navigation';
import { CustomMDX } from 'app/components/mdx';
import { getDatasets } from 'app/content/utils/mdx';
import { PageHero, LegacyGlobalStyles } from '@lib';
import Providers from 'app/(datasets)/providers';

export default function DatasetOverviewPage({ params }: { params: any }) {
  const dataset = getDatasets().find((dataset) => dataset.slug === params.slug);

  if (!dataset) {
    notFound();
  }

  return (
    <section>
      <article className='prose'>
        <Providers>
          <LegacyGlobalStyles />
          <PageHero
            title={dataset.metadata.name}
            description={dataset.metadata.description}
            coverSrc={dataset.metadata.media?.src}
            coverAlt={dataset.metadata.media?.alt}
          />
        </Providers>
        <CustomMDX source={dataset.content} />
      </article>
    </section>
  );
}
