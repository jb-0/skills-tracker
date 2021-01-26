import styled from 'styled-components';

export const FooterStyled = styled.footer`
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  background-color: var(--primary-color);
  text-align: center;

  & a, p {
    color: var(--secondary-color);
  }
`;