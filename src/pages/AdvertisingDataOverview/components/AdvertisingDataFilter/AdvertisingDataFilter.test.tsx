import { act, render, screen } from '@testing-library/react';
import AdvertisingDataFilter from './AdvertisingDataFilter';
import { AdvertisingDataRecord } from '../../../../types/advertisingData';
import { buildAdvertisingData } from '../../../../__test__/advertisingDataBuilder';
import { SelectProps } from '../../../../components/organisms/Select/Select';
import userEvent from '@testing-library/user-event';

const selectProps: { [name: string]: SelectProps } = {};

jest.mock('../../../../components/organisms/Select/Select', () => (props: SelectProps) => {
  selectProps[props.name] = props;
  return <div>SelectMock</div>;
});

const advertisingData: AdvertisingDataRecord[] = [
  buildAdvertisingData({
    datasource: 'Facebook Ads',
    campaign: 'Like Ads',
  }),
  buildAdvertisingData({
    datasource: 'Facebook Ads',
    campaign: 'Offer Campaigns - Conversions',
  }),
  buildAdvertisingData({
    datasource: 'Google Analytics',
    campaign: 'New General Campaign - RUS - Mobile',
  }),
];

afterEach(() => {
  Object.keys(selectProps).forEach((name) => {
    delete selectProps[name];
  });
});

describe('When rendering', () => {
  it('should render filter form', () => {
    // when
    render(
      <AdvertisingDataFilter
        data={advertisingData}
        onFilterApply={jest.fn()}
      />
    );

    // then
    expect(selectProps.campaign).toMatchObject({
      id: 'campaign',
      name: 'campaign',
      options: [
        {
          label: 'Like Ads',
          value: 'Like Ads',
        },
        {
          label: 'New General Campaign - RUS - Mobile',
          value: 'New General Campaign - RUS - Mobile',
        },
        {
          label: 'Offer Campaigns - Conversions',
          value: 'Offer Campaigns - Conversions',
        }
      ],
      isMulti: true,
    });

    expect(selectProps.datasource).toMatchObject({
      id: 'datasource',
      name: 'datasource',
      options: [
        {
          label: 'Facebook Ads',
          value: 'Facebook Ads',
        },
        {
          label: 'Google Analytics',
          value: 'Google Analytics',
        }
      ],
      isMulti: true,
    });

    expect(screen.getByRole('button', { name: 'Apply' })).toBeInTheDocument();
  });
});

describe('When submitting', () => {
  it('should apply filter', () => {
    // given
    const onFilterApplyMock = jest.fn();
    render(
      <AdvertisingDataFilter
        data={advertisingData}
        onFilterApply={onFilterApplyMock}
      />
    );

    act(() => {
      selectProps.campaign?.onChange?.('campaign', ['Like Ads']);
      selectProps.datasource?.onChange?.('datasource', ['Facebook Ads']);
    });

    // when
    userEvent.click(screen.getByRole('button', { name: 'Apply' }));

    // then
    expect(onFilterApplyMock).toHaveBeenCalledWith({
      campaign: ['Like Ads'],
      datasource: ['Facebook Ads'],
    });
  });
});
