'use client';
import React from 'react';
import Link from 'next/link';
import { VedaUIProvider } from '@lib';

export default function VedaUIConfigProvider({ children }: { children: any }) {
  return (
    <VedaUIProvider
      config={{
        envMapboxToken: process.env.NEXT_PUBLIC_MAPBOX_TOKEN ?? '',
        envApiStacEndpoint: process.env.NEXT_PUBLIC_API_STAC_ENDPOINT ?? '',
        envApiRasterEndpoint: process.env.NEXT_PUBLIC_API_RASTER_ENDPOINT ?? '',
        navigation: {
          LinkComponent: Link,
          linkProps: {
            pathAttributeKeyName: 'href',
          },
        },
      }}
    >
      {children}
    </VedaUIProvider>
  );
}
