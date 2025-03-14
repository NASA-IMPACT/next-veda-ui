'use client';
import React from 'react';
import { CatalogContent, useFiltersWithQS } from '@lib';
import { useRouter } from 'next/navigation';
import Providers from '../providers';

export default function Catalog({ datasets }: { datasets: any }) {
  const controlVars = useFiltersWithQS();
  const router = useRouter();

  const handleCardNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <Providers>
      <CatalogContent
        datasets={datasets}
        search={controlVars.search}
        onAction={controlVars.onAction}
        taxonomies={controlVars.taxonomies}
        onCardNavigate={handleCardNavigation}
      />
    </Providers>
  );
}
