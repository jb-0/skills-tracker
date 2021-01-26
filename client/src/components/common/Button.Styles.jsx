import styled from 'styled-components';

export const ButtonStyled = styled.button`
  width: 100px;
  height: 40px;
  border-radius: 25px;
  outline-width: 0;
  border: solid;
  border-color: var(--primary-color);
  background-color: var(--secondary-color);
  margin: 10px;

  &:hover {
    color: var(--primary-color);
    background-color: var(--tertiary-color);
    cursor: pointer;
  }
`;