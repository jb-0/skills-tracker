import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, waitForElementToBeRemoved } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import ProfileContainer from './ProfileContainer';
import { UserContext } from '../../context/UserContext';

describe('ProfileContainer component', () => {
  // Create test data which will be used to mock server responses
  const validSavedSearchRouteResponse = JSON.stringify({
    msg: 'saved searches found for user',
    savedSearches: [
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

  it(`a loader is displayed while retrieving a user's saved searches`, async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: false,
      authenticated: true,
      isAuthenticated: jest.fn(),
    };

    // Render the profile container with relevant user context
    renderWithContext(userContextValue);

    // At this point a loader should be displayed (albeit briefly in real world cases)
    expect(screen.queryAllByTestId('loader')).toHaveLength(1);

    // The test can be considered complete once the 
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
  });

  it(`user's see a list of their saved searches when loading is complete`, async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: false,
      authenticated: true,
      isAuthenticated: jest.fn(),
    };

    // Construct a positive mock server response
    fetch.mockResponseOnce(validSavedSearchRouteResponse);

    // Render the profile container with relevant user context
    renderWithContext(userContextValue);

    // Wait for the loader to be removed
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
 
    // Once loader has gone expect that the saved searches are displayed
    expect(screen.getByText(/node angular sql/i)).toBeInTheDocument();
    expect(screen.getByText(/python/i)).toBeInTheDocument();
  });

  it('if a user has no saved searches an informative message is displayed', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: false,
      authenticated: false,
      isAuthenticated: jest.fn(),
    };

    // Construct a mock server response for a user with no saved searches
    fetch.mockResponseOnce({"msg": "no saved searches for user"});

    // Render the profile container with relevant user context
    renderWithContext(userContextValue);

    // Wait for the loader to be removed
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
 
    // Once loader has gone expect that the saved searches are displayed
    expect(screen.getByText('You have no saved searches, go to the Search page to search for a skillset and click save to add it to your profile.')).toBeInTheDocument();
  });

  it('if a server error occurs an informative message is displayed', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: false,
      authenticated: false,
      isAuthenticated: jest.fn(),
    };

    // Construct a mock server response for a user with no saved searches with an error code
    fetch.mockResponseOnce({"msg": "no saved searches for user"}, {
      status: 500,
      headers: { 'content-type': 'application/json' },
    });

    // Render the profile container with relevant user context
    renderWithContext(userContextValue);

    // Wait for the loader to be removed
    await waitForElementToBeRemoved(() => screen.getByTestId('loader'));
 
    // Once loader has gone expect that the saved searches are displayed
    expect(screen.getByText('You have no saved searches, go to the Search page to search for a skillset and click save to add it to your profile.')).toBeInTheDocument();
  });
});
