import React,{ useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { UserContext } from '../../context/UserContext';
import Button from '../common/Button';

function SearchSaveButton() {
  const [userState] = useContext(UserContext)
  const [search]  = useContext(SearchContext);

  async function saveSearch() {
    const searchTermString = search.searchTerms.join(' ');

    const body = {
      keywords: searchTermString,
      locationName: search.location,
      distanceFromLocation: '10'
    }

    const res = await fetch(
      '/api/job/search/save',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          frontend: 'react-frontend',
        },
        body: JSON.stringify(body)
      }
    );
    
    try {
      const json = await res.json();
      console.log('json', json)
    } catch (err) {
      console.error('err', err);
    }
  
    
    // if (res.status === 200) {
    //   setJobs(await res.json());
    // } else {
    //   setJobs({ noOfResults: 0, msg: 'no results found' });
    // }
  }

  return (
    <div>
      {search.submittedSearchTerms.length > 0 && userState.authenticated ? (
        <Button buttonText="Save" buttonAction={saveSearch} />
      ) : null}
    </div>
  );
}

export default SearchSaveButton;
