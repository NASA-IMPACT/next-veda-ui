import React, { ReactNode } from 'react';
import DataProvider from '../store/providers/data';
import VedaUIConfigProvider from '../store/providers/veda-ui-config';
import DevseedUIThemeProvider from '../store/providers/theme';

export default function Providers ({
  datasets,
  children
}: {
  datasets?: any,
  children: ReactNode
}) {
  return (
    <DevseedUIThemeProvider>
      <VedaUIConfigProvider>
        {
          datasets ? (
            <DataProvider initialDatasets={datasets}>
              {children}
            </DataProvider>
          ) : (
            children
          )
        }
      </VedaUIConfigProvider>
    </DevseedUIThemeProvider>
  )
}