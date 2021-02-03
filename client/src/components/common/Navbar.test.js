import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import Navbar from './Navbar';
import { UserContext } from '../../context/UserContext';

describe('Navbar component', () => {
  let container = null;

  function renderWithContext(userContextValue) {
    let doc;
    act(() => {
      doc = render(
        <UserContext.Provider value={[userContextValue, jest.fn()]}>
            <Navbar />
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
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('the home link points to the correct path', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: true,
      authenticated: false,
      isAuthenticated: jest.fn(),
    };

    // Render the app, as it is in a checking auth state only a loader should be returned
    const doc = renderWithContext(userContextValue);

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '/')
  });

  it('the search link points to the correct path', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: true,
      authenticated: false,
      isAuthenticated: jest.fn(),
    };

    // Render the app, as it is in a checking auth state only a loader should be returned
    const doc = renderWithContext(userContextValue);

    expect(screen.getByText('Search').closest('a')).toHaveAttribute('href', '/search')
  });

  it('the register/login link points to the correct path', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: true,
      authenticated: false,
      isAuthenticated: jest.fn(),
    };

    // Render the app, as it is in a checking auth state only a loader should be returned
    const doc = renderWithContext(userContextValue);

    expect(screen.getByText('Register/Login').closest('a')).toHaveAttribute('href', '/login')
  });

  it('the profile icon points to the correct path', async () => {
    // Define user context mark authenticated as true, this would mock state of auth'd user
    const userContextValue = {
      checkingAuthentication: true,
      authenticated: true,
      isAuthenticated: jest.fn(),
    };

    // Render the app, as it is in a checking auth state only a loader should be returned
    const doc = renderWithContext(userContextValue);

    expect(screen.getByTestId('profile-icon').closest('a')).toHaveAttribute('href', '/profile')
  });
});
