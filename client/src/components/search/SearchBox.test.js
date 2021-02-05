import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import SearchBox from './SearchBox';
import { SearchProvider } from '../../context/SearchContext';

describe('SearchBox component', () => {
  let container = null;
  beforeEach(async () => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);

    await act(async () => {
      const promise = Promise.resolve()
      render(
        <SearchProvider>
          <SearchBox />
        </SearchProvider>,
        container
        );
        await act(() => promise);
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('search box is successfully rendered', () => {
    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('the bound value matches user typed input', async () => {
    // Imitate user typing each letter of Jav and assert it is displayed in textbox
    await userEvent.type(screen.getByRole('textbox'), 'Jav');
    expect(screen.getByDisplayValue('Jav')).toBeInTheDocument();
  });

  it('renders correctly when passed arrays containing suggested terms and search terms', async () => {
    const {act} = renderer;
    const promise = Promise.resolve()

    const tree = renderer
    .create(
      <SearchProvider>
          <SearchBox />
        </SearchProvider>
    );

    await act(() => promise);

    expect(tree.toJSON()).toMatchSnapshot()
  });
});
