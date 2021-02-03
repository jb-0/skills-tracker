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
  transition: color 0.3s linear;

  &:hover {
    color: var(--tertiary-color);
  }
`;

export const ProfileIcon = styled.a`
  position: absolute;
  padding: 0;
  margin: 0;
  top: 12px;
  right: 20px;

  &:hover {
    cursor: pointer;
  }

  &:hover .MuiSvgIcon-root {
    fill: var(--tertiary-color);
    transition: fill 0.3s linear;
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
