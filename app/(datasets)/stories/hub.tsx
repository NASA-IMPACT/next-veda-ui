'use client';
import React from 'react';
import { StoriesHubContent, useFiltersWithQS } from '@lib';
import { useRouter } from "next/navigation";
import Link from 'next/link';


export default function Hub({
  stories: allStories
}: {
  stories: any;
}) {
  const router = useRouter();
  const controlVars = useFiltersWithQS({navigate: ({ search }) => router.replace(`?${search}`)});

  return (
    <StoriesHubContent 
      allStories={allStories} 
      onFilterchanges={() => controlVars}
      storiesString= {{
        one: 'story',
        other: 'stories'
      }}
      linkProperties={{
        LinkElement: Link,
        pathAttributeKeyName: 'href'
      }}
      storiesPagePath={'stories'}
    />
  );
}