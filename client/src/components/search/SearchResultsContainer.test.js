import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Given the shared context from state, the searchSuggestion component is rendered via
// SearchContainer rather than directly.
import SearchContainer from "./SearchContainer";
import { SearchProvider } from '../../context/SearchContext';
import SearchResultsContainer from './SearchResultsContainer';
import userEvent from '@testing-library/user-event';

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

    act(() => {
      render(
        <SearchProvider><SearchContainer/></SearchProvider>,
        container
      );
    });

    // Type desired search term
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Jav' },
    });

    // Click on the suggested term Javascript to add it to add it to the search terms array
    userEvent.click(screen.getByText('JavaScript'))

    // Click the search button to trigger search
    userEvent.click(screen.getByRole('button'))

    expect(await screen.findByText(/254/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('server error results in 0 results being returned', async () => {
    // Construct a server error response
    fetch.mockResponseOnce(JSON.stringify({ noOfResults: 254, msg: 'results found' }), {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });

    act(() => {
      render(
        <SearchProvider><SearchContainer/></SearchProvider>,
        container
      );
    });

    // Type desired search term
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Jav' },
    });

    // Click on the suggested term Javascript to add it to add it to the search terms array
    userEvent.click(screen.getByText('JavaScript'))

    // Click the search button to trigger search
    userEvent.click(screen.getByRole('button'))

    expect(await screen.findByText(/0/)).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
