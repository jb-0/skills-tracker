import React, { useContext } from 'react';
import './SearchSuggestion.css';
import { v4 as uuidv4 } from 'uuid';
import { ViewContext } from '../../context/ViewContext';

function SearchSuggestion(props) {
  const size = useContext(ViewContext);

  return (
    <div>
      {props.suggestedTerms.map((suggestedTerm) => {
        return (
          <div
            onClick={props.addSearchTerm}
            id={suggestedTerm}
            className={
              size.device === 'Desktop'
                ? 'suggested-term-container'
                : 'suggested-term-container-mobile suggested-term-container'
            }
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
