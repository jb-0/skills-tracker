import React from 'react';
import './SavedSearchCard.css';
import JobCountChart from './JobCountChart';
import Delete from '@material-ui/icons/Delete';

function ProfileSavedSearchCard(props) {
  const locationCapitalised = props.search.searchTerms.locationName.charAt(0).toUpperCase() + 
    props.search.searchTerms.locationName.slice(1);

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
      // TODO: add error handling
    }
  }
  
  return (
    <div className="saved-search-card">
      <p>
        Search terms: {props.search.searchTerms.keywords}
        <br />
        Location: {locationCapitalised}
      </p>
      <JobCountChart search={props.search} />
      {props.source === 'profile' ?
        <Delete
        onClick={deleteSearch}
        className="delete-icon"
        htmlColor="#212529"
        fontSize="large"
      /> :
        null }
    </div>
  );
}

export default ProfileSavedSearchCard;
