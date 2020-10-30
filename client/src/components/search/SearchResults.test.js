import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';

import SearchResults from './SearchResults';

describe('SearchResults component', () => {
  let container = null;
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

  it('props passed are rendered successfully and prefixed with "x"', () => {
    act(() => {
      render(
        <SearchResults
          searchTerms={['node', 'react']}
          location={'london'}
          jobs={{ noOfResults: 254, msg: 'results found' }}
        />,
        container
      );
    });

    expect(
      screen.getByText('There are currently 254 "node react" jobs in london')
    ).toBeInTheDocument();
  });

  it('renders correctly when passed props', () => {
    const tree = renderer
      .create(
        <SearchResults
          searchTerms={['node', 'react']}
          location={'london'}
          jobs={{ noOfResults: 254, msg: 'results found' }}
        />
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
