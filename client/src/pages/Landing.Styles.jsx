import styled from 'styled-components';

export const FirstLandingSection = styled.section`
  background-color: var(--secondary-color);
  width: 100%;
`;

export const FirstLandingSectionFlex = styled.section`
  margin: 0 auto;
  max-width: 700px;
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.device === 'desktop' ? 'nowrap' : 'wrap')};
  align-items: flex-end;
  justify-content: center;

  & > div {
    padding: 0 20px;
  }
`;

export const AppOnPhoneImg = styled.img`
  -webkit-filter: drop-shadow(5px 3px 7px #212529);
  filter: drop-shadow(5px 3px 7px #212529);
  width: 200px;
  vertical-align: bottom;
`;