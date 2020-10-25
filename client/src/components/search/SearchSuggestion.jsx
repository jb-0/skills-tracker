import React from 'react';
import './SearchSuggestion.css';

function SearchSuggestion(props) {
  return (
    <div>
      {props.suggestedTerms.map((suggestedTerm) => {
        return (
          <div
            onClick={props.addSearchTerm}
            id={suggestedTerm}
            className="suggested-term-container"
          >
            <p id={suggestedTerm}>{suggestedTerm}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchSuggestion;
