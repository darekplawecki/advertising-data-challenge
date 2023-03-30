import React, { FC, useMemo } from 'react';
import { AdvertisingDataFilterValues } from '../../types/advertisingDataFilter';
import { getAppliedFilterText } from './AdvertisingDataAppliedFilter.utils';

type AdvertisingDataAppliedFilterProps = {
  filter: AdvertisingDataFilterValues;
};

const AdvertisingDataAppliedFilter: FC<AdvertisingDataAppliedFilterProps> = ({
  filter,
}) => {
  const { campaign, datasource } = filter;

  const appliedDatasources = useMemo(
    () => getAppliedFilterText(datasource, 'Datasource', 'All Datasources'),
    [datasource]
  );
  const appliedCampaigns = useMemo(
  () => getAppliedFilterText(campaign, 'Campaign', 'All Campaigns'),
    [campaign]
  );

  return (
    <h3 className="AdvertisingDataAppliedFilter">
      {appliedDatasources}
      {'; '}
      {appliedCampaigns}
    </h3>
  );
};

export default AdvertisingDataAppliedFilter;
