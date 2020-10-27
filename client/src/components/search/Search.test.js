import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import renderer from 'react-test-renderer';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';

import Search from './Search';

describe('Search component', () => {
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

  it('search box is successfully rendered', () => {
    act(() => {
      render(
        <Search
          suggestedTerms={[]}
          searchTerms={[]}
          searchInputText={''}
          handleTextBoxUpdates={() => {return null}}
          addSearchTerm={() => {return null}}
          removeSearchTerm={() => {return null}}
        />,
        container
      );
    });

    expect(screen.getByRole('textbox')).toBeInTheDocument();
  });

  it('onChange callback executes when user inputs text', async () => {
    const onChange = jest.fn();

    act(() => {
      render(
        <Search
          suggestedTerms={[]}
          searchTerms={[]}
          searchInputText={''}
          handleTextBoxUpdates={onChange}
          addSearchTerm={() => {return null}}
          removeSearchTerm={() => {return null}}
        />,
        container
      );
    });

    // Imitate user typing each letter of Jav
    await userEvent.type(screen.getByRole('textbox'), 'Jav');

    expect(onChange).toHaveBeenCalledTimes(3);
  });

  it('renders correctly when passed arrays containing suggested terms and search terms', () => {
    const tree = renderer
      .create(<Search
        suggestedTerms={['node','sql']}
        searchTerms={['node','sql']}
        searchInputText={''}
        handleTextBoxUpdates={() => {return null}}
        addSearchTerm={() => {return null}}
        removeSearchTerm={() => {return null}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly when passed empty arrays', () => {
    const tree = renderer
      .create(<Search
        suggestedTerms={[]}
        searchTerms={[]}
        searchInputText={''}
        handleTextBoxUpdates={() => {return null}}
        addSearchTerm={() => {return null}}
        removeSearchTerm={() => {return null}}
      />)
      .toJSON();
    expect(tree).toMatchSnapshot();
  });  
});
