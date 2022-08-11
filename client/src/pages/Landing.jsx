import { Button } from '@mui/material';
import React, { useContext } from 'react';
import TrendingContainer from '../components/trending/TrendingContainer';
import { ViewContext } from '../context/ViewContext';
import iphoneImg from '../images/phone.png';
import {
  FirstLandingSection,
  FirstLandingSectionFlex,
  AppOnPhoneImg,
  SecondLandingSection,
  SecondLandingSectionContent,
  SocialLoginSection,
  ThirdLandingSection,
  SocialButton,
} from './Landing.Styles';

function Landing() {
  const size = useContext(ViewContext);

  return (
    <>
      <FirstLandingSection>
        <FirstLandingSectionFlex device={size.device.toLowerCase()}>
          <article>
            <h1>Track in demand skills in your area</h1>
            <p className="large-p">
              While there are plenty of great job sites out there it can be
              challenging to get a true gauge of how in demand a set of skills
              are, especially when you want to track this over time or observe
              historic trends. Skills Search provides an easy to use solution to
              this problem.
            </p>
          </article>
          <div>
            <AppOnPhoneImg
              src={iphoneImg}
              alt="Man sitting in breakout area with laptop"
            />
          </div>
        </FirstLandingSectionFlex>
      </FirstLandingSection>
      <SecondLandingSection>
        <SecondLandingSectionContent device={size.device.toLowerCase()}>
          <SocialLoginSection device={size.device.toLowerCase()}>
            <SocialButton>
              <a href="/auth/facebook">
                <Button>Sign up with Facebook</Button>
              </a>
            </SocialButton>
            <SocialButton>
              <a href="/auth/google">
                <Button>Sign up with Google</Button>
              </a>
            </SocialButton>
          </SocialLoginSection>
          <div>
            <h1>Sign up now</h1>
            <p className="large-p secondary-font-color">
              Creating an account allows you to save searches as well as track
              new searches that are not currently in our database.
            </p>
          </div>
        </SecondLandingSectionContent>
      </SecondLandingSection>
      <ThirdLandingSection>
        <TrendingContainer />
      </ThirdLandingSection>
    </>
  );
}

export default Landing;
