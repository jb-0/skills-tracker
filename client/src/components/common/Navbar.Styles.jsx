import styled from 'styled-components';

export const NavbarStyled = styled.nav`
  background-color: var(--primary-color);
  overflow: hidden;
  position: relative;
`;

export const NavItem = styled.a`
  ${(props) =>
    props.device === 'desktop'
      ? `border-bottom: solid ${
          props.active ? 'var(--tertiary-color)' : 'var(--primary-color)'
        }`
      : `border-left: solid ${
          props.active ? 'var(--tertiary-color)' : 'var(--primary-color)'
        }`};
  float: left;
  display: block;
  color: var(--secondary-color);
  text-align: center;
  padding: 12px 20px;
  text-decoration: none;

  &:hover {
    background-color: var(--secondary-color);
    color: var(--primary-color);

    ${(props) =>
      props.device === 'desktop'
        ? 'border-bottom: solid var(--secondary-color)'
        : 'border-left: solid var(--secondary-color)'};
  }
`;

export const ProfileIcon = styled.div`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 12px;
  right: 20px;

  &:hover {
    border-bottom: solid var(--secondary-color);
    cursor: pointer;
  }
`;

export const BurgerNav = styled.div`
  text-align: left;
  padding: 10px;

  & a {
    float: left;
    clear: left;
  }
`;
