import React from 'react';

function ProfileSavedSearchCard(props) {
  return (
    <p>
      Search terms: {props.search.searchTerms.keywords}
      <br />
      Location: {props.search.searchTerms.locationName}
    </p>
  );
}

export default ProfileSavedSearchCard;
