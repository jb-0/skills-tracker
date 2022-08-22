import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import JobCountChart from './JobCountChart';

describe('JobCountChart component', () => {
  // Create test data
  const search = {
    dailySearchTermCount: [{ timestamp: '2020-11-13T08:36:05.986+00:00', count: '252' }],
    _id: '5fef3fc6d774164b709a0c76',
    searchTerms: {
      keywords: 'node angular sql',
      locationName: 'london',
      distanceFromLocation: 10,
    },
    __v: 0,
  };

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

  it('a canvas is created for the job count chart with the supplied search id', async () => {
    act(() => {
      render(<JobCountChart search={search} />, container);
    });

    expect(screen.queryAllByTestId(search._id)).toHaveLength(1);
  });
});
