import React, { useState } from 'react';
import JobCountChart from './JobCountChart';
import Delete from '@material-ui/icons/Delete';
import Alert from '@material-ui/lab/Alert';
import { SavedSearchCardContainer } from './SavedSearchCard.Styles';

function ProfileSavedSearchCard(props) {
  const locationCapitalised = props.search.searchTerms.locationName.charAt(0).toUpperCase() + 
    props.search.searchTerms.locationName.slice(1);

  const [alert, setAlert] = useState(false);
    

  async function deleteSearch() {
    // Update state to ensure the visual representation is removed
    props.removeSavedSearch(props.search._id);

    // API call to remove the search from the user's saved search in the DB
    const res = await fetch(`/api/job/search/delete/${props.search._id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        frontend: 'react-frontend',
      },
    });

    try {
      const response = await res.json();
    } catch (err) {
      setAlert(true);
    }
  }

  function handleAlertClose() {
    setAlert(false);
  }
  
  return (
    <SavedSearchCardContainer>
      {alert ? (
        <Alert severity={'error'} onClose={handleAlertClose}>
          Unable to delete saved search at this time, if this problem persists
          please contact tbrt92@gmail.com
        </Alert>
      ) : (
        <>
          <p>Search terms: {props.search.searchTerms.keywords}</p>
          <p>Location: {locationCapitalised}</p>
          <JobCountChart search={props.search} />

          {/* Only display the delete button if the user is on the profile screen, otherwise they are on
      a public screen such as Home > Trending which is not a location they can alter */}
          {props.source === 'profile' ? (
            <Delete
              onClick={deleteSearch}
              className="delete-icon"
              htmlColor="#212529"
              fontSize="large"
              data-testid="delete"
            />
          ) : null}
        </>
      )}
    </SavedSearchCardContainer>
  );
}

export default ProfileSavedSearchCard;
