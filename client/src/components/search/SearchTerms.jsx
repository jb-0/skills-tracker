import React from 'react';
import './SearchTerms.css'

function SearchTerms(props) {
  return (
    <div>
      {props.searchTerms.map((searchTerm) => {
        return (
          <div className="search-term-container">
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