import React, { useEffect, useState } from 'react';
import ProfileSavedSearchCard from '../searchCard/SavedSearchCard';
import Loader from '../common/Loader'
import { v4 as uuidv4 } from 'uuid';
import { SavedSearchCardsGrid, SavedSearchesContainer, 
  NoSavedSearchesMessage} from './ProfileContainer.Styles'

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
        setSavedSearches(false);
        setFetchingData(false);
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

  // If we are currently fetching the user's data then display a loader
  if (fetchingData) {
    return <Loader />;
  }
  return (
    <SavedSearchesContainer>
      {!savedSearches && (
        <NoSavedSearchesMessage>
          <h1>:(</h1>
          <p>
            You have no saved searches, go to the Search page to search for a
            skillset and click save to add it to your profile.
          </p>
        </NoSavedSearchesMessage>
      )}
      <SavedSearchCardsGrid>
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
      </SavedSearchCardsGrid>
    </SavedSearchesContainer>
  );
}

export default ProfileContainer;
