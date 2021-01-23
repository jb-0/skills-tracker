import styled from 'styled-components';

export const SuggestedTermBox = styled.div`
  width: 80%;
  background-color: var(--secondary-color);
  margin: auto;
  padding: 10px 0;
  border: solid;
  border-color: var(--primary-color);
  border-width: thin;

  &:hover {
    color: var(--primary-color);
    background-color: var(--tertiary-color);
  }
`;
