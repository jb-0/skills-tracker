import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event'

import SearchContainer from './SearchContainer';
import { SearchProvider } from '../../context/SearchContext';

describe('SearchContainer component', () => {
  let container = null;
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);

    act(() => {
      render(<SearchProvider><SearchContainer /></SearchProvider>, container);
    });
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  it('search suggestions "JavaScript" and "Java" appear when "Jav" is entered', () => {
    // Typing in Jav should suggest all permitted technical terms that begin with Jav, including
    // JavaScript and Java
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
