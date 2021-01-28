import styled from 'styled-components';

export const FirstLandingSection = styled.section`
  background-color: var(--secondary-color);
  width: 100%;
`;

export const FirstLandingSectionFlex = styled.section`
  margin: 0 auto;
  padding: var(--primary-pad) var(--primary-pad) 0;
  max-width: 900px;
  display: flex;
  flex-direction: row;
  flex-wrap: ${(props) => (props.device === 'desktop' ? 'nowrap' : 'wrap')};
  align-items: flex-end;
  justify-content: center;

  & article {
    text-align: justify;
    align-self: center;
    padding-right: ${(props) => (props.device === 'desktop' ? '70' : '0')}px;
  }

  & h1 {
    text-align: center;
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
  padding: 50px 0;
  color: var(--secondary-color);

  & p {
    text-align: justify;
  }
`;

export const SecondLandingSectionContent = styled.article`
  max-width: 900px;
  margin: auto;
  padding: var(--primary-pad) var(--primary-pad) 0;
  display: flex;
  flex-wrap: ${(props) => (props.device === 'desktop' ? 'nowrap' : 'wrap-reverse')};
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

export const SocialLoginSection = styled.section`
  text-align: center;
  max-width: 280px;
  min-width: 260px;
  margin: ${(props) => (props.device === 'desktop' ? '0 100px 0 0' : 'auto')};
`;

export const SocialButton = styled.div `
  margin: 20px 0;
`;

export const ThirdLandingSection = styled.section`
  padding: var(--primary-pad) var(--primary-pad) 50px;
  background-color: var(--secondary-color);

  & :empty {
    display: none;
  }
`;