import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ProfileContainer from "./ProfileContainer";
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';

describe('ProfileContainer component', () => {
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

  function renderWithContext(userContextValue, searchContextValue) {
    let doc;
    act(() => {
      doc = render(
        <UserContext.Provider value={[userContextValue, jest.fn()]}>
            <ProfileContainer />
        </UserContext.Provider>,
        container
      );
    });

    return doc;
  }

  // it(`a loader is displayed while retrieving a user's saved searches`, () => {});

  it(`user's see a list of their saved searches when loading is complete`, async () => {
    // Define a promise as downstream components (trending will change)
    const promise = Promise.resolve()

    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: false,
      authenticated: true,
      isAuthenticated: jest.fn(() => promise),
    };

    // Construct a positive mock server response
    fetch.mockResponseOnce(
      JSON.stringify({
        msg: 'saved searches found for user',
        savedSearches: [
          {
            dailySearchTermCount: [{timestamp:
              '2020-11-13T08:36:05.986+00:00',
              count: '252'}],
            _id: '5fef3fc6d774164b709a0c76',
            searchTerms: {
              keywords: 'Node angular sql',
              locationName: 'london',
              distanceFromLocation: 10,
            },
            __v: 0,
          },
        ],
      })
    );

    

    // Render the Search Save Button Component with relevant surrounding context providers
    // as the user is not authenticated we expect the button not to be rendered
    renderWithContext(userContextValue);

    // screen.debug()

    // Await completion
    await act(() => promise)
  });

  // it('if a user has no saved searches an informative message is displayed', () => {});

  // it('if a server error occurs an informative message is displayed', () => {});
});
