import { AdvertisingDataRecord } from '../types/advertisingData';
import { parseCsv } from '../utils/csv';

const GET_ADVERTISING_DATA_URL = 'http://adverity-challenge.s3-website-eu-west-1.amazonaws.com/DAMKBAoDBwoDBAkOBAYFCw.csv';

const mapCsvRow = (csvRow: any): AdvertisingDataRecord => {
  const dateParts = csvRow.Date.split('.');
  const date = `${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`;
  return {
    date,
    datasource: csvRow.Datasource,
    campaign: csvRow.Campaign,
    clicks: csvRow.Clicks || 0,
    impressions: csvRow.Impressions || 0,
  };
};

export const getAdvertisingData = async (): Promise<AdvertisingDataRecord[]> => {
  const response = await fetch(GET_ADVERTISING_DATA_URL);

  if (!response.ok) {
    throw Error('The advertising data could not be loaded.');
  }

  const results = parseCsv(await response.text());

  return results.map<AdvertisingDataRecord>(mapCsvRow);
};
