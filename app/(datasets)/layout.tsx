import React, { ReactNode } from 'react';
import DataProvider from 'app/store/providers/data';
import { getDatasetsMetadata } from 'app/content/utils/mdx';

export default function DatasetLayout({
  children,
}: {
  children: JSX.Element | ReactNode;
}) {
  const datasets = getDatasetsMetadata();
  
  return <DataProvider initialDatasets={datasets}>{children}</DataProvider>;
}
