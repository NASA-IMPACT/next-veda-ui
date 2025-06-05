'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export function BlogPosts({
  postType,
  posts = [],
}: {
  postType: string;
  posts?: any[];
}) {
  const prefix = postType === 'dataset' ? 'datasets' : 'events';
  return (
    <div>
      {posts.map((post) => (
        <Link
          key={post.slug}
          className='flex flex-col space-y-1 mb-4'
          href={`${prefix}/${post.slug}`}
        >
          <div>
            <p className='font-semibold text-neutral-900 dark:text-neutral-100 tracking-tight'>
              {post.metadata.name}
            </p>
          </div>
          <p>{post.metadata.description}</p>
          <div>
            {post.metadata.media && (
              <Image
                src={post.metadata.media.src}
                alt={post.metadata.media.alt}
                width={300}
                height={300}
              />
            )}
          </div>
        </Link>
      ))}
    </div>
  );
}
