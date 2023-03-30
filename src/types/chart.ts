export type ChartDataset = {
  yAxisId: string;
  label: string;
  color: string;
  data: number[];
};

export type YAxisConfig = {
  id: string;
  showGrid: boolean;
  position: 'left' | 'right';
};
