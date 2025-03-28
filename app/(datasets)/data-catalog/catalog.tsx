'use client';
import React from 'react';
import { CatalogContent, useFiltersWithQS } from '@lib';
import Providers from '../providers';

export default function Catalog({ datasets }: { datasets: any }) {
  const controlVars = useFiltersWithQS();

  return (
    <Providers>
      <CatalogContent
        datasets={datasets}
        search={controlVars.search}
        onAction={controlVars.onAction}
        taxonomies={controlVars.taxonomies}
      />
    </Providers>
  );
}
