import React,{ useContext } from 'react';
import { SearchContext } from '../../context/SearchContext';
import { UserContext } from '../../context/UserContext';
import Button from '../common/Button';

function SearchSaveButton() {
  const [userState] = useContext(UserContext)
  const [search]  = useContext(SearchContext);

  return (
    <div>
      {search.submittedSearchTerms.length > 0 && userState.authenticated ? (
        <Button buttonText="Save" buttonAction={() => {}} />
      ) : null}
    </div>
  );
}

export default SearchSaveButton;
