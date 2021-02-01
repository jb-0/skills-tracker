import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import renderer from 'react-test-renderer';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import SavedSearchCard from './SavedSearchCard';
import { unmountComponentAtNode } from 'react-dom';

describe('Saved Search Card component', () => {
  let container = null;
  const sampleSearch = {
    _id: 1,
    searchTerms: {
      keywords: 'Node',
      locationName: 'coventry',
      distanceFromLocation: 10,
    },
    dailySearchTermCount: [
      { timestamp: '2020-11-13T08:36:05.986+00:00', count: '252' },
    ],
  };

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

  it('card renders with props passed in and locations are capitalised', async () => {
    act(() => {
      render(
        <SavedSearchCard
          search={sampleSearch}
          removeSavedSearch={jest.fn()}
          source="profile"
        />,
        container
      );
    });

    expect(screen.queryAllByText(/Coventry/)).toHaveLength(1);
  });

  it('delete button shows when saved search is rendered from a user profile', () => {
    act(() => {
      render(
        <SavedSearchCard
          search={sampleSearch}
          removeSavedSearch={jest.fn()}
          source="profile"
        />,
        container
      );
    });

    expect(screen.queryAllByTestId('delete')).toHaveLength(1);
  });

  it('delete button does not show when saved search is rendered from trending', () => {
    act(() => {
      render(
        <SavedSearchCard
          search={sampleSearch}
          removeSavedSearch={jest.fn()}
        />,
        container
      );
    });
    
    expect(screen.queryAllByTestId('delete')).toHaveLength(0);
  });

  it('the delete api route is called when the delete button is pressed', () => {
    fetch.mockResponseOnce({status: 200});

    act(() => {
      render(
        <SavedSearchCard
          search={sampleSearch}
          removeSavedSearch={jest.fn()}
          source="profile"
        />,
        container
      );
    });

    screen.debug()
    
    userEvent.click(screen.queryAllByTestId('delete'))


    // expect(screen.queryAllByText(/Coventry/)).toHaveLength(1);
  });
});
