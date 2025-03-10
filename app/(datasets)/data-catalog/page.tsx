import React from 'react';
import dynamic from 'next/dynamic';
import { getTransformedDatasetMetadata } from 'app/content/utils/mdx';

// @NOTE: Dynamically load to ensure only CSR since this depends ContextProviders for routing and etc...
const Catalog = dynamic(() => import('./catalog'), {
  ssr: false,
  loading: () => <p>Loading...</p>, // @NOTE @TODO: We need a loading state!!!
});

export default function Page() {
  const transformed = getTransformedDatasetMetadata();

  return (
    <section>
      <div className='grid-container'>
        <div className='grid-row margin-top-5'>
          <h1 className='font-ui-lg'>Data Catalog</h1>
        </div>
        <Catalog datasets={transformed} />
      </div>
    </section>
  );
}
