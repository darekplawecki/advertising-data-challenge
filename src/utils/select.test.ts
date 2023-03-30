import { AdvertisingDataRecord } from '../types/advertisingData';
import { getOptions } from './select';
import { Option } from '../types/select';
import { buildAdvertisingData } from '../__test__/advertisingDataBuilder';

describe('getOptions', () => {
  it('should return unique and sorted options', () => {
    // given
    const advertisingData: AdvertisingDataRecord[] = [
      buildAdvertisingData({
        datasource: 'Google Analytics',
        campaign: 'New General Campaign - RUS - Mobile',
      }),
      buildAdvertisingData({
        datasource: 'Facebook Ads',
        campaign: 'Like Ads',
      }),
      buildAdvertisingData({
        datasource: 'Facebook Ads',
        campaign: 'Like Ads',
      }),
      buildAdvertisingData({
        datasource: 'Google Analytics',
        campaign: 'GDN Prospecting - Interstitials - Prio 2 Offer',
      }),
    ];

    // when
    const result = getOptions(advertisingData, 'datasource');

    // then
    expect(result).toEqual<Option[]>([
      {
        label: 'Facebook Ads',
        value: 'Facebook Ads',
      },
      {
        label: 'Google Analytics',
        value: 'Google Analytics',
      },
    ]);
  });
});
