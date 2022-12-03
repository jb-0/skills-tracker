import '@testing-library/jest-dom/extend-expect';

import isAuthenticated from './auth';

describe('auth service', () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  test('isAuthenticated returns false on receiving a non 200 server response', async () => {
    // Even if true is returned by server, if the response code is not 200 expect the function
    // to fail safe and return false
    fetch.mockResponseOnce(JSON.stringify(true), { status: 500 });

    const response = await isAuthenticated();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toEqual(false);
  });

  test('isAuthenticated returns true on receiving true and a 200 response', async () => {
    fetch.mockResponseOnce(JSON.stringify(true), { status: 200 });

    const response = await isAuthenticated();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toEqual(true);
  });

  test('isAuthenticated returns false on receiving false and a 200 response', async () => {
    fetch.mockResponseOnce(JSON.stringify(false), { status: 200 });

    const response = await isAuthenticated();
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(response).toEqual(false);
  });
});
