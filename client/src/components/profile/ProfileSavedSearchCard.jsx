import React from 'react';
import './ProfileSavedSearchCard.css'

function ProfileSavedSearchCard(props) {
  return (
    <div className="saved-search-card">
      <p>
        Search terms: {props.search.searchTerms.keywords}
        <br />
        Location: {props.search.searchTerms.locationName}
      </p>
    </div>
  );
}

export default ProfileSavedSearchCard;
