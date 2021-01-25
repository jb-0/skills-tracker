import styled from 'styled-components';

export const FirstLandingSection = styled.section`
  background-color: var(--secondary-color);
  width: 100%;
`;

export const FirstLandingSectionFlex = styled.section`
  margin: 0 auto;
  padding: var(--primary-pad) var(--primary-pad) 0;
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
  -webkit-filter: drop-shadow(0 0 10px #212529);
  filter: drop-shadow(0 0 10px #212529);
  width: 250px;
  vertical-align: bottom;
`;

export const SecondLandingSection = styled.section`
  width: 100%;
  background-color: var(--primary-color);
  height: 500px;
  color: var(--secondary-color);
`;

export const SecondLandingSectionContent = styled.article`
  max-width: 700px;
  margin: auto;
  padding: var(--primary-pad) var(--primary-pad) 0;
`;

export const SocialLoginSection = styled.section`
  text-align: center;
  max-width: 280px;
  margin: 20px auto;
`;

export const ThirdLandingSection = styled.section`
  padding: var(--primary-pad) var(--primary-pad) 50px;
  background-color: var(--secondary-color);

  & :empty {
    display: none;
  }
`;