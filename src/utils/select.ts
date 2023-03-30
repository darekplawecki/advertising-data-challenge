import { chain } from 'lodash';
import { Option } from '../types/select';

export const getOptions = <T>(
  data: T[],
  property: keyof T,
): Option[] => (
  chain(data)
    .uniqBy(property)
    .sortBy(property)
    .map((data) => ({
      value: data[property] as string,
      label: data[property] as string,
    }))
    .value()
);
