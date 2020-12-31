import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import Routes from './Routes';
import { UserContext } from '../context/UserContext';

describe('Routes testing', () => {
  let container = null;
  const history = createMemoryHistory();

  function renderWithContext(userContextValue) {
    let doc;
    act(() => {
      doc = render(
        <UserContext.Provider value={[userContextValue, jest.fn()]}>
          <Router history={history}>
            <Routes />
          </Router>
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

  it('a loader is displayed while authentication status is being checked', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: true,
      authenticated: false,
      isAuthenticated: jest.fn(),
    };

    // Render the app, as it is in a checking auth state only a loader should be returned
    const doc = renderWithContext(userContextValue);
    expect(doc.container.querySelectorAll('.loader')).toHaveLength(1);
  });

  it('loader is not present once authentication check is complete', async () => {
    // Define a promise as downstream components (trending will change)
    const promise = Promise.resolve()

    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: false,
      authenticated: true,
      isAuthenticated: jest.fn(() => promise),
    };

    // Render the app, as checking auth is set to false no loader should appear and the home page 
    // should be rendered and this is confirmed by checking the header text appears
    const doc = renderWithContext(userContextValue);
    expect(doc.container.querySelectorAll('.loader')).toHaveLength(0);
    expect(
      screen.getByText('Track in demand skills in your area')
    ).toBeInTheDocument();

    // Await completion
    await act(() => promise)
  });

  it('unauthenticated users cannot access the profiles route', async () => {
    // Define a promise as downstream components (trending will change)
    const promise = Promise.resolve();

    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: false,
      authenticated: false,
      isAuthenticated: jest.fn(() => promise),
    };

    history.push('/profile');

    // Render the app with including the history that would route to profile page, as user is
    // unauth'd they would be redirected to home page
    const doc = renderWithContext(userContextValue, history);

    expect(screen.getByText('Track in demand skills in your area')).toBeInTheDocument();

    // Await completion
    await act(() => promise);
  });

  it('authenticated users can access the profiles route', async () => {
    // Define a promise as downstream components (trending will change)
    const promise = Promise.resolve();

    // Define user context mark authenticated as true, this mocks state of auth'd user
    const userContextValue = {
      checkingAuthentication: false,
      authenticated: true,
      isAuthenticated: jest.fn(() => promise),
    };

    history.push('/profile');

    // Render the app with including the history that would route to profile page, as user is
    // auth'd they would see a logout button
    const doc = renderWithContext(userContextValue, history);

    expect(screen.getByText('Logout')).toBeInTheDocument();

    // Await completion
    await act(() => promise);
  });
});
