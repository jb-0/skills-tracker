import React from 'react';
import './SavedSearchCard.css';
import JobCountChart from './JobCountChart';

function ProfileSavedSearchCard(props) {
  const locationCapitalised = props.search.searchTerms.locationName.charAt(0).toUpperCase() + 
    props.search.searchTerms.locationName.slice(1);

  function deleteSearch() {
    console.log(props.search._id);
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
        <button onClick={deleteSearch}>x</button> :
        null }
    </div>
  );
}

export default ProfileSavedSearchCard;
