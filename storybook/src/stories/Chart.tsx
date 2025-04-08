import React from 'react';
import { Chart } from '@/app/lib';
import Providers from '@/app/(datasets)/providers';
import { getDatasetsMetadata } from '@/app/content/utils/mdx';
import DataProvider from '@/app/store/providers/data';
import { mockData, initialDataset } from './hurricanData';

interface BlockChartProp {
  dataPath: string;
  idKey?: string;
  xKey: string;
  yKey: string;
  altTitle: string;
  altDesc: string;
  dateFormat: string;
  colors?: string[];
  colorScheme?: string;
  renderLegend?: boolean;
  renderBrush?: boolean;
  xAxisLabel?: string;
  yAxisLabel?: string;
  highlightStart?: string;
  highlightEnd?: string;
  highlightLabel?: string;
  uniqueKeys?: any[];
  availableDomain?: [Date, Date];
  brushRange?: [Date, Date];
  onBrushRangeChange?: (range: [Date, Date]) => void;
}

export const ChartStorybook = ({
  dataPath,
  idKey,
  xKey,
  yKey,
  altTitle,
  altDesc,
  dateFormat,
}: BlockChartProp) => {
  return (<div>test</div>
    // <DataProvider initialDatasets={initialDataset}>
    //   <Providers>
    //     <Providers datasets={mockData}>
          // <Chart
          //   dataPath={dataPath}
          //   dateFormat={'%m/%Y'}
          //   idKey={idKey}
          //   xKey={xKey}
          //   yKey={yKey}
          //   altDesc={altDesc}
          //   altTitle={altTitle}
          // />
    //     </Providers>
    //   </Providers>
    // </DataProvider>
  );
};
