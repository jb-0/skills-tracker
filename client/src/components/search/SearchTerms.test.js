import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from "react-dom/test-utils";

import SearchTerms from "./SearchTerms";

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

  it('terms passed in via array are rendered successfully and prefixed with "x"', () => {
    act(() => {
      render(<SearchTerms searchTerms={['node', 'sql']} />, container);
    });

    expect(screen.getByText('x node')).toBeInTheDocument();
    expect(screen.getByText('x sql')).toBeInTheDocument();
  });

  it('when an empty array is passed, no terms (prefixed with "x") are rendered', () => {
    act(() => {
      render(<SearchTerms searchTerms={[]} />, container);
    });

    expect(screen.queryByText('x')).toBeNull();
  });

  it('renders correctly when passed an array containing search terms', () => {
    const tree = renderer
      .create(<SearchTerms searchTerms={['node', 'sql']} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when passed an empty array', () => {
    const tree = renderer
      .create(<SearchTerms searchTerms={[]} />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });  
});
