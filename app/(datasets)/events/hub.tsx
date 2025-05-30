'use client';
import React from 'react';
import { StoriesHubContent, useFiltersWithQS } from '@lib';
import Providers from '../providers';

export default function Hub({ stories: allStories }: { stories: any }) {
  const controlVars = useFiltersWithQS();

  return (
    <Providers>
      <StoriesHubContent
        allStories={allStories}
        onFilterchanges={() => controlVars}
        storiesString={{
          one: 'event',
          other: 'events',
        }}
      />
    </Providers>
  );
}
