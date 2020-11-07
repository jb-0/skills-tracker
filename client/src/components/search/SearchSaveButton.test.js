import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Given the shared context from state, the SearchSaveButton component is rendered via
// Search rather than directly.
import SearchSaveButton from './SearchSaveButton';
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';
import userEvent from '@testing-library/user-event';

describe('SearchSaveButton component', () => {
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

  test('when no search terms are submitted the save button is not rendered', async () => {});

  test('when a user is unauthenticated the save button is not rendered', async () => {});

  test('when search terms are submitted and a user is authenticated the search button is rendered', 
    async () => {
      
    });

  
  test('if on clicking the save button a 200 or 409 response is not returned, an error alert is displayed', async () => {});

  test('clicking the save button for a duplicate search displays a warning alert', async () => {});

  test('clicking the save button for a new search displays a success alert', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = { authenticated: true };

    // Define search context
    const searchContextValue = {
      submittedLocation: 'london',
      submittedSearchTerms: ['node', 'react'],
    };

    // Render the Search Save Button with relevant surrounding context providers
    let doc;
    act(() => {
      doc = render(
        <UserContext.Provider value={[userContextValue, jest.fn()]}>
          <SearchContext.Provider value={[searchContextValue, jest.fn()]}>
            <SearchSaveButton />
          </SearchContext.Provider>
        </UserContext.Provider>,
        container
      );
    });

    // Mock server response for a 200, meaning a record was successfully created
    fetch.mockResponseOnce(JSON.stringify({ msg: 'record created' }), {
      status: 200,
    });

    // Click the search button to trigger search
    await act(async () => {
      userEvent.click(screen.getByRole('button'));
    });

    // Get success alert classes
    const successAlertClasses = doc.container.getElementsByClassName(
      'MuiAlert-standardSuccess'
    );

    // Using length asset that one success alert is present, also check that the msg is rendered
    expect(successAlertClasses.length).toEqual(1)
    expect(await screen.findByText('record created')).toBeInTheDocument();
  });
});
