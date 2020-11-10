import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import renderer from 'react-test-renderer';

import Search from './Search';
import { UserProvider } from '../../context/UserContext';
import { SearchProvider } from '../../context/SearchContext';

describe('Search component', () => {
  it('combined search components render correctly with default state', () => {
    const tree = renderer
      .create(
        <UserProvider>
          <SearchProvider>
            <Search />
          </SearchProvider>
        </UserProvider>
      )
      .toJSON();
    expect(tree).toMatchSnapshot();
  });
});
