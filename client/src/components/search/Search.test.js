import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import Search from './Search';
import { UserProvider } from '../../context/UserContext';
import { SearchProvider } from '../../context/SearchContext';
import { unmountComponentAtNode } from 'react-dom';

describe('Search component', () => {
  let container = null;

  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(
        <UserProvider>
          <SearchProvider>
            <Search />
          </SearchProvider>
        </UserProvider>,
        container
      );
    });
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

  it('combined search components render correctly with default state', () => {
    const tree = renderer
      .create(
        <UserProvider>
          <SearchProvider>
            <Search />
          </SearchProvider>
        </UserProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('clicking search with coventry as the selected location returns results in coventry', async () => {
    // Switch the select from it's default to Coventry
    fireEvent.change(screen.getByTestId("select"), {
      target: { value: "Coventry" },
    });

    // At this point Coventry should only appear once on the page
    expect(screen.queryAllByText(/Coventry/)).toHaveLength(1);

    // Construct a positive mock server response
    fetch.mockResponseOnce(
      JSON.stringify({ noOfResults: 254, msg: 'results found' })
    );

    act(() => {
      // Type desired search term
      fireEvent.change(screen.getByRole('textbox'), {
        target: { value: 'Jav' },
      });
    });
    // Click on the suggested term Javascript to add it to add it to the search terms array
    userEvent.click(screen.getByText('JavaScript'));

    await act(async () => {
      // Click the search button to trigger search
      userEvent.click(screen.getByRole('button'));
    });

    // Having run a search, based on the mock response we should see Coventry twice
    expect(screen.queryAllByText(/Coventry/)).toHaveLength(2);
  });
});
