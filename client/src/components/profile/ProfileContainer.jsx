import React, { useEffect, useState } from 'react';
import ProfileSavedSearchCard from '../common/SavedSearchCard';
import { v4 as uuidv4 } from 'uuid';
import './ProfileContainer.css';

function ProfileContainer() {
  const [savedSearches, setSavedSearches] = useState();
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
      } catch (err) {
        // TODO: add error handling
      }
    }

    fetchData();
  }, []);

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
              return <ProfileSavedSearchCard search={search} key={uuidv4()} source="profile" />;
            })
          : null}
      </div>
    </div>
  );
}

export default ProfileContainer;
