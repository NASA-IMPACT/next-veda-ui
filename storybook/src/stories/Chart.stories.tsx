import type { Meta, StoryObj } from '@storybook/react';

// import { Chart } from '@/app/lib';
import {ChartStorybook} from './Chart';
import { mockData } from './hurricanData';
// import Providers from '@/app/(datasets)/providers';
// import { getDatasetsMetadata } from '@/app/content/utils/mdx';
// import DataProvider from '@/app/store/providers/data';

// const datasets = getDatasetsMetadata();
interface BlockChartProp {
  dataPath: string;
  idKey?: string;
  xKey: string;
  yKey: string;
  altTitle: string;
  altDesc: string;
  dateFormat: string;
}
const meta: Meta<typeof BlockChartProp> = {
  title: 'Example/Chart',
  component: ChartStorybook,
  argTypes: {
    dataPath: { control: 'text' },
    idKey: { control: 'text' },
    xKey: { control: 'text' },
    yKey: { control: 'text' },
    dateFormat: { control: 'text' },
  },
  // tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  // args: {
  //   dataPath: './assets/hurricane-maria-ida-chart1.csv',
  //   dateFormat: '%m/%Y',
  //   idKey: 'Zip',
  //   xKey: 'Month',
  //   yKey: 'Number of Tarps',
  //   altDesc: 'test',
  //   altTitle: 'test',
  // },
};
