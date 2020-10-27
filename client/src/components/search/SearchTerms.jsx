import React from 'react';
import './SearchTerms.css'
import { v4 as uuidv4 } from 'uuid';

function SearchTerms(props) {
  return (
    <div>
      {props.searchTerms.map((searchTerm) => {
        return (
          <div className="search-term-container" key={uuidv4()} data-testid="search-term-container">
            <p onClick={props.removeSearchTerm} id={searchTerm}>
              x {searchTerm}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchTerms;