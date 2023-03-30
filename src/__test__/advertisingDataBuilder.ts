import { AdvertisingDataRecord } from '../types/advertisingData';

export const buildAdvertisingData = (data: Partial<AdvertisingDataRecord>): AdvertisingDataRecord => ({
  date: '2019-01-01',
  datasource: 'Facebook Ads',
  campaign: 'Like Ads',
  clicks: 10,
  impressions: 100,
  ...data,
});
