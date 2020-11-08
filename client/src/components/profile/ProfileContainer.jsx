import React, { useEffect, useState } from 'react';
import ProfileSavedSearchCard from './ProfileSavedSearchCard'
import { v4 as uuidv4 } from 'uuid';
import './ProfileContainer.css'

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
    <div className="saved-searches-grid">
      {savedSearches ? savedSearches.map((search) => {
        return <ProfileSavedSearchCard search={search} key={uuidv4()}/>
      }) : null}
    </div>
  );
}

export default ProfileContainer;
