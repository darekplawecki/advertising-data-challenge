import { chain, keys } from 'lodash';
import { AdvertisingDataRecord } from '../../../../types/advertisingData';
import { AdvertisingDataChartValues } from '../../types/advertisingDataChart';
import { AdvertisingDataFilterValues } from '../../types/advertisingDataFilter';

const isDataRecordIncluded = (
  record: AdvertisingDataRecord,
  filter: AdvertisingDataFilterValues,
): boolean => (
  (filter.campaign.length === 0 || filter.campaign.indexOf(record.campaign) !== -1)
    && (filter.datasource.length === 0 || filter.datasource.indexOf(record.datasource) !== -1)
);

export type GroupedData = Record<string, {
  clicks: number;
  impressions: number;
}>; // date => clicks, impressions

export const getAdvertisingDataChartValues = (
  data: AdvertisingDataRecord[],
  filter: AdvertisingDataFilterValues,
): AdvertisingDataChartValues => {
  const groupedData = chain(data)
    .filter((record) => isDataRecordIncluded(record, filter))
    .sortBy('date')
    .reduce<GroupedData>((result, record) => {
      result[record.date] = {
        clicks: (result[record.date]?.clicks || 0) + record.clicks,
        impressions: (result[record.date]?.impressions || 0) + record.impressions,
      };
      return result;
    }, {})
    .value();

  const dates = keys(groupedData);

  const allDatasets = chain(groupedData).values();
  const clicks = allDatasets.map('clicks').value();
  const impressions = allDatasets.map('impressions').value();

  return { dates, clicks, impressions };
};
