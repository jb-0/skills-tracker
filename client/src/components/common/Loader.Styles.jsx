import styled from 'styled-components';

export const StyledLoader = styled.div`
  border: 16px solid var(--secondary-color);
  border-top: 16px solid var(--tertiary-color);
  background-color: var(--primary-color);
  border-radius: 50%;
  width: 90px;
  height: 90px;
  animation: spin 2s linear infinite;
  margin: 50px auto;

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;