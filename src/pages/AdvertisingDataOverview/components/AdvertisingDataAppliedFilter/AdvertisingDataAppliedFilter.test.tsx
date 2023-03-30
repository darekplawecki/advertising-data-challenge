import { render, screen } from '@testing-library/react';
import { AdvertisingDataFilterValues } from '../../types/advertisingDataFilter';
import { AdvertisingDataAppliedFilter } from './index';

describe('When rendering', () => {
  it('should render fallback text if all values applied', () => {
    // given
    const filter: AdvertisingDataFilterValues = {
      campaign: [],
      datasource: [],
    };

    // when
    render(
      <AdvertisingDataAppliedFilter filter={filter} />
    );

    // then
    expect(screen.getByText(/All Datasources/i)).toBeInTheDocument();
    expect(screen.getByText(/All Campaigns/i)).toBeInTheDocument();
  });

  it('should correctly render if one value selected', () => {
    // given
    const filter: AdvertisingDataFilterValues = {
      campaign: ['Like Ads'],
      datasource: ['Facebook Ads'],
    };

    // when
    render(
      <AdvertisingDataAppliedFilter filter={filter} />
    );

    // then
    expect(screen.getByText(/Datasource "Facebook Ads"/i)).toBeInTheDocument();
    expect(screen.getByText(/Campaign "Like Ads"/i)).toBeInTheDocument();
  });

  it('should correctly render if two values selected', () => {
    // given
    const filter: AdvertisingDataFilterValues = {
      campaign: ['Like Ads', 'New General Campaign'],
      datasource: ['Facebook Ads', 'Google Analytics'],
    };

    // when
    render(
      <AdvertisingDataAppliedFilter filter={filter} />
    );

    // then
    expect(screen.getByText(/Datasource "Facebook Ads" and "Google Analytics"/i)).toBeInTheDocument();
    expect(screen.getByText(/Campaign "Like Ads" and "New General Campaign"/i)).toBeInTheDocument();
  });

  it('should correctly render if more than two values selected', () => {
    // given
    const filter: AdvertisingDataFilterValues = {
      campaign: ['Like Ads', 'New General Campaign', 'GDN Prospecting'],
      datasource: ['Facebook Ads', 'Google Analytics', 'Google Adwords'],
    };

    // when
    render(
      <AdvertisingDataAppliedFilter filter={filter} />
    );

    // then
    expect(screen.getByText(/Datasource "Facebook Ads", "Google Analytics" and "Google Adwords"/i)).toBeInTheDocument();
    expect(screen.getByText(/Campaign "Like Ads", "New General Campaign" and "GDN Prospecting"/i)).toBeInTheDocument();
  });
});
