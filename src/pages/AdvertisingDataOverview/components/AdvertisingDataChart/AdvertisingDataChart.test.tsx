import { MultiaxisLineChartProps } from '../../../../components/molecules/MultiaxisLineChart/MultiaxisLineChart';
import { render, screen } from '@testing-library/react';
import AdvertisingDataChart from './AdvertisingDataChart';
import { AdvertisingDataRecord } from '../../../../types/advertisingData';
import { AdvertisingDataFilterValues } from '../../types/advertisingDataFilter';
import { buildAdvertisingData } from '../../../../__test__/advertisingDataBuilder';

let multiaxisLineChartProps: MultiaxisLineChartProps | undefined;

jest.mock('../../../../components/molecules/MultiaxisLineChart/MultiaxisLineChart', () => (props: MultiaxisLineChartProps) => {
  multiaxisLineChartProps = props;
  return <div>MultiaxisLineChartMock</div>;
});

afterEach(() => {
  multiaxisLineChartProps = undefined;
});

describe('When rendering', () => {
  const advertisingData: AdvertisingDataRecord[] = [
    buildAdvertisingData({
      date: '2019-01-01',
      datasource: 'Google Analytics',
      campaign: 'GDN Prospecting - Interstitials - Prio 2 Offer',
      clicks: 5,
      impressions: 50,
    }),
    buildAdvertisingData({
      date: '2019-01-02',
      datasource: 'Google Analytics',
      campaign: 'New General Campaign - RUS - Mobile',
      clicks: 1,
      impressions: 20,
    }),
  ];
  const filter: AdvertisingDataFilterValues = {
    campaign: [],
    datasource: [],
  };

  it('should correctly initialize chart', () => {
    // when
    render(
      <AdvertisingDataChart
        data={advertisingData}
        filter={filter}
      />
    );

    // then
    expect(screen.getByText('MultiaxisLineChartMock')).toBeInTheDocument();

    expect(multiaxisLineChartProps).toEqual<MultiaxisLineChartProps>({
      xAxis: ['2019-01-01', '2019-01-02'],
      yAxes: [{
        id: 'clicks',
        showGrid: true,
        position: 'left',
      }, {
        id: 'impressions',
        showGrid: false,
        position: 'right',
      }],
      datasets: [{
        label: 'Clicks',
        data: [5, 1],
        color: 'rgb(255, 99, 132)',
        yAxisId: 'clicks',
      }, {
        label: 'Impressions',
        data: [50, 20],
        color: 'rgb(53, 162, 235)',
        yAxisId: 'impressions',
      }],
    });
  });
});
