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

  function renderWithContext(userContextValue, history) {
    let doc;
    act(() => {
      doc = render(
        <Router history={history}>
          <UserContext.Provider value={[userContextValue, jest.fn()]}>
            <Routes />
          </UserContext.Provider>
        </Router>,
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
    const doc = renderWithContext(userContextValue, createMemoryHistory());
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

    // Render the app, as checking auth is set to false no loader should appear and the home page should be rendered
    const doc = renderWithContext(userContextValue, createMemoryHistory());
    expect(doc.container.querySelectorAll('.loader')).toHaveLength(0);
    expect(
      screen.getByText('Track in demand skills in your area')
    ).toBeInTheDocument();

    // Await completion to ensure 
    await act(() => promise)
  });

  it('unauthenticated users cannot access the profiles route', () => {});

  it('authenticated users can access the profiles route', () => {});
});
