import '@testing-library/jest-dom/extend-expect';
import React from "react";
import { unmountComponentAtNode } from "react-dom";
import { render, screen } from '@testing-library/react';
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

  it("terms passed in via array are rendered successfully", () => {
    act(() => {
      render(<SearchTerms searchTerms={['node', 'sql']} />, container);
    });

    expect(screen.getByText('x node')).toBeInTheDocument();
    expect(screen.getByText('x sql')).toBeInTheDocument();
  });
});
