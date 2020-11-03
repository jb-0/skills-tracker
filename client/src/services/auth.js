async function isAuthenticated() {
  // API will return true or false depending on whether user is logged in
  const res = await fetch('/api/user/isloggedin', {
    method: 'GET',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      frontend: 'react-frontend',
    },
  });

  // Fail safe, if for any reason we cannot reach the server or the request is bad and a non-200
  // is returned we switch to false to ensure private routes remain private. Ultimately auth
  // is on backend so even if response was mocked no data would be returned.
  if (res.status === 200) {
    return await res.json();
  } else {
    return false;
  }
};

export default isAuthenticated;
