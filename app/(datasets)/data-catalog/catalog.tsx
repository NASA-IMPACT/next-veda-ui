'use client';
import React from 'react';
import { CatalogView, useFiltersWithQS } from '@lib';
import { useRouter } from 'next/navigation';

export default function Catalog({ datasets }: { datasets: any }) {
  const controlVars = useFiltersWithQS();
  const router = useRouter();

  const handleCardNavigation = (path: string) => {
    router.push(path);
  };

  return (
    <CatalogView
      datasets={datasets}
      search={controlVars.search}
      onAction={controlVars.onAction}
      taxonomies={controlVars.taxonomies}
      onCardNavigate={handleCardNavigation}
    />
  );
}
