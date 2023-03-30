import React, { FC, useMemo } from 'react';
import './AdvertisingDataChart.scss';
import { AdvertisingDataRecord } from '../../../../types/advertisingData';
import { getAdvertisingDataChartValues } from './AdvertisingDataChart.utils';
import { MultiaxisLineChart } from '../../../../components/molecules/MultiaxisLineChart';
import { YAxisConfig } from '../../../../types/chart';
import { AdvertisingDataFilterValues } from '../../types/advertisingDataFilter';

const CLICKS_AXIS_ID = 'clicks';
const IMPRESSIONS_AXIS_ID = 'impressions';

const yAxes: YAxisConfig[] = [
  {
    id: CLICKS_AXIS_ID,
    showGrid: true,
    position: 'left',
  },
  {
    id: IMPRESSIONS_AXIS_ID,
    showGrid: false,
    position: 'right',
  }
];

type AdvertisingDataChartProps = {
  data: AdvertisingDataRecord[];
  filter: AdvertisingDataFilterValues;
};

const AdvertisingDataChart: FC<AdvertisingDataChartProps> = ({
  data,
  filter,
}) => {
  const [xAxis, datasets] = useMemo(() => {
    const { dates, clicks, impressions } = getAdvertisingDataChartValues(data, filter);
    return [dates, [{
      label: 'Clicks',
      data: clicks,
      color: 'rgb(255, 99, 132)',
      yAxisId: CLICKS_AXIS_ID,
    }, {
      label: 'Impressions',
      data: impressions,
      color: 'rgb(53, 162, 235)',
      yAxisId: IMPRESSIONS_AXIS_ID,
    }]];
  }, [data, filter]);

  return (
    <div className="AdvertisingDataChart">
      <MultiaxisLineChart
        xAxis={xAxis}
        yAxes={yAxes}
        datasets={datasets}
      />
    </div>
  );
};

export default AdvertisingDataChart;
