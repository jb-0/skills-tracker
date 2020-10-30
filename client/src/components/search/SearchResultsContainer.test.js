import '@testing-library/jest-dom/extend-expect';
import React from 'react';
import { unmountComponentAtNode } from 'react-dom';
import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';

import SearchResultsContainer from './SearchResultsContainer';

describe('SearchResultsContainer component', () => {
  let container = null;

  beforeAll(() => jest.spyOn(window, 'fetch'))
  
  beforeEach(() => {
    // setup a DOM element as a render target
    container = document.createElement('div');
    document.body.appendChild(container);
  });

  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    // cleanup on exiting
    unmountComponentAtNode(container);
    container.remove();
    container = null;
  });

  test('the number of search results are successfully rendered', async () => {
    fetch.mockResponseOnce(JSON.stringify({ noOfResults: 254, msg: 'results found' }));

    await act(async () => {  
      render(<SearchResultsContainer searchTerms={['node']} location={'london'} />, container);
    });
    
    const message = await screen.findByText('254');
 
    expect(message).toBeInTheDocument();
    // expect(screen.getByText('254')).toBeInTheDocument();
    expect(fetch).toHaveBeenCalledTimes(1);
  })
});
