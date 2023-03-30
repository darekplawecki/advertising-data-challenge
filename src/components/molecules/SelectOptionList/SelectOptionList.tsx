import React, { FC, ReactNode } from 'react';
import { MenuListProps } from 'react-select';
import { FixedSizeList as List } from 'react-window';
import './SelectOptionList.scss';

const OPTION_HEIGHT = 37;

type SelectOptionListProps = MenuListProps;

const SelectOptionList: FC<SelectOptionListProps> = ({
  options,
  maxHeight,
  getValue,
  children,
}) => {
  const listItemNodes = children as ReactNode[];
  const [value] = getValue();
  const initialOffset = options.indexOf(value) * OPTION_HEIGHT;
  const height = Math.min(maxHeight, options.length * OPTION_HEIGHT);

  return (
    <List
      width="100%"
      height={height}
      itemCount={listItemNodes.length}
      itemSize={OPTION_HEIGHT}
      initialScrollOffset={initialOffset}
    >
      {({ index, style }) => <div className="SelectOption" style={style}>{listItemNodes[index]}</div>}
    </List>
  );
};

export default SelectOptionList;
