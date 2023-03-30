import React, { FC, useEffect, useState } from 'react';
import { AdvertisingDataFilter } from './components/AdvertisingDataFilter';
import { AdvertisingDataChart } from './components/AdvertisingDataChart';
import './AdvertisingDataOverview.scss';
import { getAdvertisingData } from '../../api/advertisingDataClient';
import { AdvertisingDataRecord } from '../../types/advertisingData';
import { AdvertisingDataFilterValues } from './types/advertisingDataFilter';
import { AdvertisingDataAppliedFilter } from './components/AdvertisingDataAppliedFilter';

const AdvertisingDataOverview: FC = () => {
  const [loading, setLoading] = useState(true);
  const [advertisingData, setAdvertisingData] = useState<AdvertisingDataRecord[]>([]);

  const [filter, setFilter] = useState<AdvertisingDataFilterValues>({
    campaign: [],
    datasource: [],
  });

  useEffect(() => {
    getAdvertisingData()
      .then((data) => {
        setAdvertisingData(data);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="AdvertisingDataOverview">
      <header className="AdvertisingDataOverview__header">
        <h2>Advertising Data ETL-V Challenge</h2>
      </header>
      <div className="AdvertisingDataOverview__content">
        <div className="AdvertisingDataOverview__block AdvertisingDataOverview__left-block">
          <AdvertisingDataFilter
            data={advertisingData}
            onFilterApply={setFilter}
          />
        </div>
        <div className="AdvertisingDataOverview__block AdvertisingDataOverview__right-block">
          <AdvertisingDataAppliedFilter
            filter={filter}
          />
          <AdvertisingDataChart
            data={advertisingData}
            filter={filter}
          />
        </div>
      </div>
    </div>
  );
};

export default AdvertisingDataOverview;
