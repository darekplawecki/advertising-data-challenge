import React, { FC, useMemo } from 'react';
import {
  CategoryScale,
  Chart as ChartJS,
  ChartData,
  ChartOptions,
  Legend,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { ChartDataset, YAxisConfig } from '../../../types/chart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

export type MultiaxisLineChartProps = {
  xAxis: string[];
  yAxes: YAxisConfig[];
  datasets: ChartDataset[];
};

const MultiaxisLineChart: FC<MultiaxisLineChartProps> = ({
  xAxis,
  yAxes,
  datasets,
}) => {
  const data = useMemo<ChartData<'line', number[], string>>(() => ({
    labels: xAxis,
    datasets: datasets.map((dataset) => ({
      label: dataset.label,
      data: dataset.data,
      borderColor: dataset.color,
      yAxisID: dataset.yAxisId,
    })),
  }), [xAxis, datasets]);

  const options = useMemo<ChartOptions<'line'>>(() => ({
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      title: {
        display: false,
      },
    },
    scales: yAxes.reduce<any>((result, yAxis) => {
      result[yAxis.id] = {
        type: 'linear',
        display: true,
        position: yAxis.position as any,
        grid: {
          drawOnChartArea: yAxis.showGrid,
        },
      };
      return result;
    }, {}),
  }), [yAxes]);

  return (
    <Line
      options={options}
      data={data}
    />
  )
};

export default MultiaxisLineChart;
