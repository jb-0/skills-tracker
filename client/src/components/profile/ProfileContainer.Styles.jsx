import styled from 'styled-components';

export const SavedSearchesContainer = styled.div`
  width: 90%;
  margin: auto;
`;

export const NoSavedSearchesMessage = styled.article`
  color: var(--secondary-color);

  & p {
    color: var(--secondary-color);
  }
`;

export const SavedSearchCardsGrid = styled.section`
  padding: 30px 0;
  margin: auto;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  grid-gap: 1rem;
  justify-items: center;
`;
