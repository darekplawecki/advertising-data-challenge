import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

jest.mock('./pages/AdvertisingDataOverview/AdvertisingDataOverview', () => () => (
  <div>AdvertisingDataOverviewMock</div>
));

describe('When rendering', () => {
  it('should render AdvertisingDataOverview component', () => {
    // when
    render(<App />);

    // then
    expect(screen.getByText('AdvertisingDataOverviewMock')).toBeInTheDocument();
  });
});
