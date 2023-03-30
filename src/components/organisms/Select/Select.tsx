import React, { FC, memo } from 'react';
import ReactSelect, { createFilter } from 'react-select';
import { SelectOptionList } from '../../molecules/SelectOptionList';
import { Option } from '../../../types/select';

const customFilter = createFilter({ ignoreAccents: false });

export type SelectProps = {
  id: string;
  name: string;
  options: Option[];
  isMulti?: boolean;
  onChange?: (name: string, value: string | string[]) => void;
};

const Select: FC<SelectProps> = memo(({
  id,
  name,
  options,
  isMulti = false,
  onChange,
}) => {
  const handleChange = (value: unknown) => {
    onChange?.(name, isMulti
      ? (value as Option[]).map((option) => option.value)
      : (value as Option).value
    );
  };

  return (
    <ReactSelect
      id={id}
      name={name}
      components={{ MenuList: SelectOptionList }}
      options={options}
      filterOption={customFilter}
      isMulti={isMulti}
      onChange={handleChange}
    />
  );
});

export default Select;
