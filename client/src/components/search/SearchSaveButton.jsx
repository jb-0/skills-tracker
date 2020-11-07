import React, { useContext, useState } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { UserContext } from '../../context/UserContext';
import Button from '../common/Button';
import Alert from '@material-ui/lab/Alert';

function SearchSaveButton() {
  const [userState] = useContext(UserContext);
  const [search] = useContext(SearchContext);


  const alertDefaults = {
    msg: undefined,
    severity: undefined,
    visible: false,
  };

  const [alert, setAlert] = useState(alertDefaults);

  async function saveSearch() {
    const searchTermString = search.searchTerms.join(' ');

    const body = {
      keywords: searchTermString,
      locationName: search.location,
      distanceFromLocation: '10',
    };

    const res = await fetch('/api/job/search/save', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        frontend: 'react-frontend',
      },
      body: JSON.stringify(body),
    });

    try {
      const response = await res.json();
      const alertValues = {visible: true, msg: response.msg};

      switch(res.status) {
        case 200:
          alertValues['severity'] = 'success';
          break;
        case 409:
          alertValues['severity'] = 'warning';
          break;
        default:
          throw new Error('unexpected response code');
      }
      
      setAlert(alertValues);

    } catch (err) {
      setAlert({
        msg: 'an unexpected error has occurred, please try again',
        severity: 'error',
        visible: true,
      });
    }
  }

  function handleAlertClose() {
    setAlert(alertDefaults);
  }

  return (
    <div>
      {search.submittedSearchTerms.length > 0 && userState.authenticated ? (
        <Button buttonText="Save" buttonAction={saveSearch} />
      ) : null}
      {alert.visible ? (
        <Alert severity={alert.severity} onClose={handleAlertClose}>
          {alert.msg}
        </Alert>
      ) : null}
    </div>
  );
}

export default SearchSaveButton;
