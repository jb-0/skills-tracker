import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import SearchResultsContainer from './SearchResultsContainer';

describe('SearchResultsContainer component', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('the number of search results are successfully rendered', async () => {
    // Construct a positive mock server response
    fetch.mockResponseOnce(
      JSON.stringify({ noOfResults: 254, msg: 'results found' })
    );

    await act(async () => {
      render(
        <SearchResultsContainer searchTerms={['node']} location={'london'} />,
        container
      );
    });

    expect(await screen.findByText(/254/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('server error results in 0 results being returned', async () => {
    // Construct a server error response
    fetch.mockResponseOnce(JSON.stringify({ noOfResults: 254, msg: 'results found' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });

    await act(async () => {
      render(
        <SearchResultsContainer searchTerms={['node']} location={'london'} />,
        container
      );
    });


    expect(await screen.findByText(/0/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
