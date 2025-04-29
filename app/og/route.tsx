import React from 'react';
import { ImageResponse } from 'next/og'; // @TODO: Look into generating dynamic OG images and whether they are still leveragable with statically building as much as possible

export function GET(request: Request) {
  const url = new URL(request.url);
  const title = url.searchParams.get('title') || 'Earth Information Center';

  return new ImageResponse(
    (
      <div>
        <div>
          <h2>{title}</h2>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    },
  );
}
