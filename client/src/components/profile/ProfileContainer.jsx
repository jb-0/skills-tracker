import React, { useEffect, useState } from 'react';
import ProfileSavedSearchCard from '../searchCard/SavedSearchCard';
import { v4 as uuidv4 } from 'uuid';
import './ProfileContainer.css';

function ProfileContainer() {
  const [savedSearches, setSavedSearches] = useState();
  const [fetchingData, setFetchingData] = useState(true);

  // On load get all the user's saved searches
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/job/search/saved', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          frontend: 'react-frontend',
        },
      });

      try {
        const response = await res.json();
        setSavedSearches(response.savedSearches);
        setFetchingData(false);
      } catch (err) {
        // TODO: add error handling
      }
    }

    fetchData();
  }, []);

  // Handle removal of saved searches, while the card calls API and removes from backend this func
  // is required to remove it from the FE
  function removeSavedSearch(searchId) {  
    setSavedSearches(previousValues => {
      return previousValues.filter(search => search._id !== searchId)
    });
  }

  // If we are currently fetching the user's data then
  if (fetchingData) {
    return <div>LOADING...</div>;
  }
  return (
    <div className="saved-searches">
      {!savedSearches && (
        <div>
          <h1>:(</h1>
          <p>
            You have no saved searches, go to the home page to search for a
            skillset and click save.
          </p>
        </div>
      )}
      <div className="saved-searches-grid">
        {savedSearches
          ? savedSearches.map((search) => {
              return (
                <ProfileSavedSearchCard
                  search={search}
                  removeSavedSearch={removeSavedSearch}
                  key={uuidv4()}
                  source="profile"
                />
              );
            })
          : null}
      </div>
    </div>
  );
}

export default ProfileContainer;
