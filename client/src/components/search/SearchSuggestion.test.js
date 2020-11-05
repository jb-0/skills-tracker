import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { fireEvent, render, screen } from '@testing-library/react';
import { act } from "react-dom/test-utils";

// Given the shared context from state, the searchSuggestion component is rendered via
// SearchContainer rather than directly.
import SearchContainer from "./SearchContainer";
import { SearchProvider } from '../../context/SearchContext';
import userEvent from '@testing-library/user-event';

describe('SearchTerms component', () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
    act(() => {
      render(<SearchProvider><SearchContainer/></SearchProvider>, container);
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('no suggested terms are rendered when the suggestedTerms array is empty', () => {
    expect(screen.queryAllByTestId('suggested-term-container')).toHaveLength(0);
  });

  it('search suggestions "JavaScript" and "Java" appear when "Jav" is entered', () => {
    // Start by typing the desired search term
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Jav' },
    });

    expect(screen.getByText('Java')).toBeInTheDocument();
    expect(screen.getByText('JavaScript')).toBeInTheDocument();
  });

  it('clicking a search suggestion adds it to the list of search terms', () => {
    // Start by typing the desired search term
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Jav' },
    });

    // Click on the suggested term Javascript, creating a search term container prefixed with x
    userEvent.click(screen.getByText('JavaScript'))
    expect(screen.getByText('x JavaScript')).toBeInTheDocument();
  });

  it('clicking a search suggestion twice does not duplicate term', () => {
    // Start by typing the desired search term
    fireEvent.change(screen.getByRole('textbox'), {
      target: { value: 'Jav' },
    });

    // Click on the suggested term Javascript, creating a search term container prefixed with x
    userEvent.click(screen.getByText('JavaScript'))
    userEvent.click(screen.getByText('JavaScript'))
    
    expect(screen.getAllByText('x JavaScript').length).toEqual(1);
  });
});
