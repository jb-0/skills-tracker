import React from 'react';
import './SearchSuggestion.css';
import { v4 as uuidv4 } from 'uuid';

function SearchSuggestion(props) {
  return (
    <div>
      {props.suggestedTerms.map((suggestedTerm) => {
        return (
          <div
            onClick={props.addSearchTerm}
            id={suggestedTerm}
            className="suggested-term-container"
            key={uuidv4()}
            data-testid="suggested-term-container"
          >
            <p id={suggestedTerm}>{suggestedTerm}</p>
          </div>
        );
      })}
    </div>
  );
}

export default SearchSuggestion;
