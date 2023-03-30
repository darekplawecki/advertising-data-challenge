import React, { FC, FormEvent, useCallback, useMemo, useState } from 'react';
import './AdvertisingDataFilter.scss';
import { AdvertisingDataFilterValues } from '../../types/advertisingDataFilter';
import { AdvertisingDataRecord } from '../../../../types/advertisingData';
import { Select } from '../../../../components/organisms/Select';
import { getOptions } from '../../../../utils/select';

type AdvertisingDataFilterProps = {
  data: AdvertisingDataRecord[];
  onFilterApply: (filter: AdvertisingDataFilterValues) => void;
};

const AdvertisingDataFilter: FC<AdvertisingDataFilterProps> = ({
  data,
  onFilterApply,
}) => {
  const [filter, setFilter] = useState<AdvertisingDataFilterValues>({
    campaign: [],
    datasource: [],
  });

  const campaigns = useMemo(() => getOptions(data, 'campaign'), [data]);
  const datasources = useMemo(() => getOptions(data, 'datasource'), [data]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onFilterApply(filter);
  }

  const handleChange = useCallback((name: string, value: any) => {
    setFilter((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }, []);

  return (
    <div className="AdvertisingDataFilter">
      <h3>Filter dimension values</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="campaign">Campaigns</label>
        <Select
          id="campaign"
          name="campaign"
          options={campaigns}
          isMulti
          onChange={handleChange}
        />
        <label htmlFor="datasource">Datasources</label>
        <Select
          id="datasource"
          name="datasource"
          options={datasources}
          isMulti
          onChange={handleChange}
        />
        <button type="submit">Apply</button>
      </form>
    </div>
  );
};

export default AdvertisingDataFilter;
