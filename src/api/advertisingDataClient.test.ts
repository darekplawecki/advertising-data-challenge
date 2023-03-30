import { getAdvertisingData } from './advertisingDataClient';
import { AdvertisingDataRecord } from '../types/advertisingData';
import { parseCsv } from '../utils/csv';

jest.mock('../utils/csv');

describe('getAdvertisingData', () => {
  global.fetch = jest.fn();
  const fetchMock = fetch as jest.Mock;
  const parseCsvMock = parseCsv as jest.Mock;

  beforeEach(() => {
    fetchMock.mockReset();
    parseCsvMock.mockReset();
  });

  it('should fetch data if fetch status is ok', async () => {
    // given
    fetchMock.mockResolvedValueOnce({
      ok: true,
      text: () => Promise.resolve('testCsv'),
    });
    parseCsvMock.mockReturnValueOnce([{
      Date: '01.01.2019',
      Datasource: 'Facebook Ads',
      Campaign: 'Like Ads',
      Clicks: 274,
      Impressions: 1979,
    }, {
      Date: '01.01.2019',
      Datasource: 'Facebook Ads',
      Campaign: 'Offer Campaigns - Conversions',
      Clicks: null,
      Impressions: null,
    }]);

    // when
    const result = await getAdvertisingData();

    // then
    expect(result).toEqual<AdvertisingDataRecord[]>([{
      date: '2019-01-01',
      datasource: 'Facebook Ads',
      campaign: 'Like Ads',
      clicks: 274,
      impressions: 1979,
    }, {
      date: '2019-01-01',
      datasource: 'Facebook Ads',
      campaign: 'Offer Campaigns - Conversions',
      clicks: 0,
      impressions: 0,
    }]);
  });

  it ('should throw error if fetch status is not ok', async () => {
    // given
    fetchMock.mockResolvedValueOnce({
      ok: false,
    });

    // when & then
    await expect(getAdvertisingData()).rejects.toThrow('The advertising data could not be loaded.');
  });
});
