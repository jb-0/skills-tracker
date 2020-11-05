import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import renderer from 'react-test-renderer';

import SearchContainer from './SearchContainer';
import { SearchProvider } from '../../context/SearchContext';

describe('SearchContainer component', () => {
  // let container = null;
  // beforeEach(() => {
  //   // setup a DOM element as a render target
  //   container = document.createElement('div');
  //   document.body.appendChild(container);

  //   act(() => {
  //     render(<SearchProvider><SearchContainer /></SearchProvider>, container);
  //   });
  // });

  // afterEach(() => {
  //   // cleanup on exiting
  //   unmountComponentAtNode(container);
  //   container.remove();
  //   container = null;
  // });

  it('combined search components render correctly with default state', () => {
    const tree = renderer
      .create(<SearchProvider><SearchContainer /></SearchProvider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
