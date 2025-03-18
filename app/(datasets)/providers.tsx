import React, { ReactNode } from 'react';
import DataProvider from 'app/store/providers/data';
import VedaUIConfigProvider from 'app/store/providers/veda-ui-config';
import DevseedUIThemeProvider from 'app/store/providers/theme';
import { DatasetMetadata } from 'app/types/content';

interface ProviderProps {
  datasets?: DatasetMetadata[];
  children: ReactNode;
}

export default function Providers({ datasets, children }: ProviderProps) {
  return (
    <DevseedUIThemeProvider>
      <VedaUIConfigProvider>
        {datasets ? (
          <DataProvider initialDatasets={datasets}>{children}</DataProvider>
        ) : (
          children
        )}
      </VedaUIConfigProvider>
    </DevseedUIThemeProvider>
  );
}
