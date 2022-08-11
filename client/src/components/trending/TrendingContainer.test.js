import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import TrendingContainer from './TrendingContainer';
describe('TrendingContainer component', () => {
  // Create test data which will be used to mock server responses
  const validSavedSearchRouteResponse = JSON.stringify({
    msg: 'saved searches found for user',
    trendingSearches: [
      {
        dailySearchTermCount: [
          { timestamp: '2020-11-13T08:36:05.986+00:00', count: '252' },
        ],
        _id: '5fef3fc6d774164b709a0c76',
        searchTerms: {
          keywords: 'node angular sql',
          locationName: 'london',
          distanceFromLocation: 10,
        },
        __v: 0,
      },
      {
        dailySearchTermCount: [
          { timestamp: '2020-11-13T08:36:05.986+00:00', count: '252' },
        ],
        _id: '5fef3fc6d774164b709a0c76',
        searchTerms: {
          keywords: 'python',
          locationName: 'manchester',
          distanceFromLocation: 10,
        },
        __v: 0,
      },
    ],
  });

  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
    fetch.resetMocks();
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('the trending section is blank while data is fetched', async () => {
    const promise = Promise.resolve();
    fetch.mockResponseOnce(validSavedSearchRouteResponse);

    act(() => {
      render(<TrendingContainer />, container);
    });


    // Before the mocked results are rendered we do not expect anything to appear
    expect(screen.queryAllByText(/Trending skill searches/i)).toHaveLength(0);
    
    await act(() => promise);

    // Once the mocked results are returned the trending section will be displayed
    expect(screen.queryAllByText(/Trending skill searches/i)).toHaveLength(1);
  });

  it('a list of trending searches is displayed', async () => {
    const promise = Promise.resolve();
    fetch.mockResponseOnce(validSavedSearchRouteResponse);

    act(() => {
      render(<TrendingContainer />, container);
    });

    await act(() => promise);

    // Expect the two mocked returns to be rendered
    expect(screen.queryAllByText(/node angular sql/i)).toHaveLength(1);
    expect(screen.queryAllByText(/python/i)).toHaveLength(1);
  });

  it('if a server error occurs the trending section is not displayed', async () => {
    const promise = Promise.resolve();
    fetch.mockResponseOnce(JSON.stringify({ msg: 'server error' }), {
      status: 500,
    });

    act(() => {
      render(<TrendingContainer />, container);
    });
    
    await act(() => promise);
    
    // Given the mock returns a 500, we shouldn't be seeing anything 
    expect(screen.queryAllByText(/Trending skill searches/i)).toHaveLength(0);
  });
});
