import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import renderer from 'react-test-renderer';

import Search from './Search';
import { SearchProvider } from '../../context/SearchContext';

describe('SearchContainer component', () => {

  it('combined search components render correctly with default state', () => {
    const tree = renderer
      .create(<SearchProvider><Search /></SearchProvider>)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
