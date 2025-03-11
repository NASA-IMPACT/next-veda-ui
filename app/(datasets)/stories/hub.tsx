'use client';
import React from 'react';
import { StoriesHubContent, useFiltersWithQS } from '@lib';
import Providers from '../providers';
import { LegacyGlobalStyles } from 'app/lib';

export default function Hub({ stories: allStories }: { stories: any }) {
  const controlVars = useFiltersWithQS();

  return (
    <Providers>
      <LegacyGlobalStyles />
      <StoriesHubContent
        allStories={allStories}
        onFilterchanges={() => controlVars}
        storiesString={{
          one: 'story',
          other: 'stories',
        }}
      />
    </Providers>
  );
}
