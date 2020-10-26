import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";

import SearchSuggestion from "./SearchSuggestion";

describe('SearchTerms component', () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement("div");
    document.body.appendChild(container);
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('suggested terms passed in via array are rendered successfully', () => {
    act(() => {
      render(<SearchSuggestion suggestedTerms={['node', 'sql']} />, container);
    });

    expect(screen.getByText('node')).toBeInTheDocument();
    expect(screen.getByText('sql')).toBeInTheDocument();
  });

  it('when an empty array is passed, no suggested terms are rendered', () => {
    act(() => {
      render(<SearchSuggestion suggestedTerms={[]} />, container);
    });

    expect(screen.queryAllByTestId('suggested-term-container')).toHaveLength(0);
  });

  it('renders correctly when passed an array containing suggested terms', () => {
    const tree = renderer
      .create(<SearchSuggestion suggestedTerms={['node', 'sql']} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when passed an empty array', () => {
    const tree = renderer
      .create(<SearchSuggestion suggestedTerms={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });  
});
