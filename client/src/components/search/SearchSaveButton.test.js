import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

// Given the shared context from state, the SearchSaveButton component is rendered via
// Search rather than directly.
import SearchSaveButton from './SearchSaveButton';
import { UserContext } from '../../context/UserContext';
import { SearchContext } from '../../context/SearchContext';
import userEvent from '@testing-library/user-event';

describe('SearchSaveButton component', () => {
  let container = null;

  function renderWithContext(userContextValue, searchContextValue) {
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

    return doc;
  }

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

  test('when no search terms are submitted the save button is not rendered', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = { authenticated: true };

    // Define search context
    const searchContextValue = {
      submittedLocation: 'london',
      submittedSearchTerms: [],
    };

    // Render the Search Save Button Component with relevant surrounding context providers
    // as no search terms are provided we expect the button not to be rendered
    renderWithContext(userContextValue, searchContextValue);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  test('when a user is unauthenticated the save button is not rendered', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = { authenticated: false };

    // Define search context
    const searchContextValue = {
      submittedLocation: 'london',
      submittedSearchTerms: ['node', 'react'],
    };

    // Render the Search Save Button Component with relevant surrounding context providers
    // as the user is not authenticated we expect the button not to be rendered
    renderWithContext(userContextValue, searchContextValue);
    expect(screen.queryAllByRole('button')).toHaveLength(0);
  });

  test('when search terms are submitted and a user is authenticated the search button is rendered', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = { authenticated: true };

    // Define search context
    const searchContextValue = {
      submittedLocation: 'london',
      submittedSearchTerms: ['node', 'react'],
    };

    // Render the Search Save Button Component with relevant surrounding context providers
    // as the user is not authenticated we expect the button not to be rendered
    renderWithContext(userContextValue, searchContextValue);
    expect(screen.queryAllByRole('button')).toHaveLength(1);
  });

  test('on clicking save if the response status is not 200 or 409 an error alert is displayed', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = { authenticated: true };

    // Define search context
    const searchContextValue = {
      submittedLocation: 'london',
      submittedSearchTerms: ['node', 'react'],
    };

    // Render the Search Save Button with relevant surrounding context providers
    const doc = renderWithContext(userContextValue, searchContextValue);

    // Mock server response for a 500, meaning a record has already been saved
    fetch.mockResponseOnce(JSON.stringify({ msg: 'server error' }), {
      status: 500,
    });

    // Click the search button to trigger search
    await act(async () => {
      userEvent.click(screen.getByRole('button'));
    });

    // Get error alert classes
    const errorAlertClasses = doc.container.getElementsByClassName(
      'MuiAlert-standardError'
    );

    // Using length asset that one success alert is present, also check that the msg is rendered
    expect(errorAlertClasses.length).toEqual(1);

    // Unlike 409 and 200 returns, any other code is given a default message rather than using the 
    // server sent "msg"
    expect(
      await screen.findByText('an unexpected error has occurred, please try again')
    ).toBeInTheDocument();
  });

  test('clicking the save button for a duplicate search displays a warning alert', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = { authenticated: true };

    // Define search context
    const searchContextValue = {
      submittedLocation: 'london',
      submittedSearchTerms: ['node', 'react'],
    };

    // Render the Search Save Button with relevant surrounding context providers
    const doc = renderWithContext(userContextValue, searchContextValue);

    // Mock server response for a 409, meaning a record has already been saved
    fetch.mockResponseOnce(JSON.stringify({ msg: 'record already exists' }), {
      status: 409,
    });

    // Click the search button to trigger search
    await act(async () => {
      userEvent.click(screen.getByRole('button'));
    });

    // Get warning alert classes
    const warningAlertClasses = doc.container.getElementsByClassName(
      'MuiAlert-standardWarning'
    );

    // Using length asset that one success alert is present, also check that the msg is rendered
    expect(warningAlertClasses.length).toEqual(1);
    expect(
      await screen.findByText('record already exists')
    ).toBeInTheDocument();
  });

  test('clicking the save button for a new search displays a success alert', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = { authenticated: true };

    // Define search context
    const searchContextValue = {
      submittedLocation: 'london',
      submittedSearchTerms: ['node', 'react'],
    };

    // Render the Search Save Button with relevant surrounding context providers
    const doc = renderWithContext(userContextValue, searchContextValue);

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
    expect(successAlertClasses.length).toEqual(1);
    expect(await screen.findByText('record created')).toBeInTheDocument();
  });
});
