import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

// Given the shared context from state, the searchSuggestion component is rendered via
// SearchContainer rather than directly.
import Search from "./Search";
import { UserProvider } from '../../context/UserContext';
import { SearchProvider } from '../../context/SearchContext';
import userEvent from '@testing-library/user-event';

describe('SearchTerms component', () => {
  let container = null;
  beforeEach(async () => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);

    await act(async () => {
      const promise = Promise.resolve()
      render(<UserProvider><SearchProvider><Search/></SearchProvider></UserProvider>, container);
      await act(() => promise);
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('no searchTerms (prefixed with "x") are rendered when the searchTerms array is empty', () => {
    expect(screen.queryByText('x')).toBeNull();
  });

  it('a search suggestion add it to the list of search terms', () => {
    // Start by typing the desired search term
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Jav' },
    });

    // Click on the suggested term Javascript, creating a search term container prefixed with x
    userEvent.click(screen.getByText('JavaScript'))
    expect(screen.getByText('x JavaScript')).toBeInTheDocument();

    // Click on the created search term container to delete it
    userEvent.click(screen.getByText('x JavaScript'))
    expect(screen.queryAllByTestId('search-term-container')).toHaveLength(0);
  });
});
