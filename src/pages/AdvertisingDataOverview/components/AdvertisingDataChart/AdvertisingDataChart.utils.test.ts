import { getAdvertisingDataChartValues } from './AdvertisingDataChart.utils';
import { AdvertisingDataFilterValues } from '../../types/advertisingDataFilter';
import { AdvertisingDataRecord } from '../../../../types/advertisingData';
import { AdvertisingDataChartValues } from '../../types/advertisingDataChart';
import { buildAdvertisingData } from '../../../../__test__/advertisingDataBuilder';

describe('getAdvertisingDataChartValues', () => {
  const advertisingData: AdvertisingDataRecord[] = [
    buildAdvertisingData({
      date: '2019-01-01',
      datasource: 'Facebook Ads',
      campaign: 'Like Ads',
      clicks: 10,
      impressions: 100,
    }),
    buildAdvertisingData({
      date: '2019-01-01',
      datasource: 'Facebook Ads',
      campaign: 'Offer Campaigns - Conversions',
      clicks: 5,
      impressions: 50,
    }),
    buildAdvertisingData({
      date: '2019-01-03',
      datasource: 'Facebook Ads',
      campaign: 'Like Ads',
      clicks: 10,
      impressions: 100,
    }),
    buildAdvertisingData({
      date: '2019-01-02',
      datasource: 'Google Analytics',
      campaign: 'New General Campaign - RUS - Mobile',
      clicks: 1,
      impressions: 20,
    }),
    buildAdvertisingData({
      date: '2019-01-01',
      datasource: 'Google Analytics',
      campaign: 'GDN Prospecting - Interstitials - Prio 2 Offer',
      clicks: 5,
      impressions: 50,
    }),
  ];

  it('should return all data if no filters applied', () => {
    // given
    const filter: AdvertisingDataFilterValues = {
      campaign: [],
      datasource: [],
    };

    // when
    const result = getAdvertisingDataChartValues(advertisingData, filter);

    // then
    expect(result).toEqual<AdvertisingDataChartValues>({
      dates: ['2019-01-01', '2019-01-02', '2019-01-03'],
      clicks: [20, 1, 10],
      impressions: [200, 20, 100],
    });
  });

  it('should return filtered data if specific campaigns selected', () => {
    // given
    const filter: AdvertisingDataFilterValues = {
      campaign: ['Like Ads', 'Offer Campaigns - Conversions'],
      datasource: [],
    };

    // when
    const result = getAdvertisingDataChartValues(advertisingData, filter);

    // then
    expect(result).toEqual<AdvertisingDataChartValues>({
      dates: ['2019-01-01', '2019-01-03'],
      clicks: [15, 10],
      impressions: [150, 100],
    });
  });

  it('should return filtered data if specific datasources selected', () => {
    // given
    const filter: AdvertisingDataFilterValues = {
      campaign: [],
      datasource: ['Google Analytics'],
    };

    // when
    const result = getAdvertisingDataChartValues(advertisingData, filter);

    // then
    expect(result).toEqual<AdvertisingDataChartValues>({
      dates: ['2019-01-01', '2019-01-02'],
      clicks: [5, 1],
      impressions: [50, 20],
    });
  });

  it('should return filtered data if specific campaigns and datasources selected', () => {
    // given
    const filter: AdvertisingDataFilterValues = {
      campaign: ['Like Ads'],
      datasource: ['Facebook Ads'],
    };

    // when
    const result = getAdvertisingDataChartValues(advertisingData, filter);

    // then
    expect(result).toEqual<AdvertisingDataChartValues>({
      dates: ['2019-01-01', '2019-01-03'],
      clicks: [10, 10],
      impressions: [100, 100],
    });
  });
});
