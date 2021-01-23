import React, { useContext } from 'react';
import TrendingContainer from '../components/trending/TrendingContainer';
import { ViewContext } from '../context/ViewContext';
import {
  FacebookLoginButton,
  GoogleLoginButton,
} from 'react-social-login-buttons';
import iphoneImg from '../images/iphone.png'
import * as Styles from './Landing.Styles';

function Landing() {
  const size = useContext(ViewContext);
  console.log(size.device.toLowerCase());
  return (
    <>
      <Styles.FirstLandingSection>
        <Styles.FirstLandingSectionFlex device={size.device.toLowerCase()}>
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
            <Styles.AppOnPhoneImg
              src={iphoneImg}
              alt="Man sitting in breakout area with laptop"
            />
          </div>
        </Styles.FirstLandingSectionFlex>
      </Styles.FirstLandingSection>
      <Styles.SecondLandingSection>
        <Styles.SecondLandingSectionContent>
          <h1>Sign up now</h1>
          <p className="large-p secondary-font-color">
            Creating an account allows you to save searches as well as track new
            searches that are not currently in our database.
          </p>
          <Styles.SocialLoginSection>
            <a href="/auth/facebook">
              <FacebookLoginButton>Sign up with Facebook</FacebookLoginButton>
            </a>
            <a href="/auth/google">
              <GoogleLoginButton>Sign up with Google</GoogleLoginButton>
            </a>
          </Styles.SocialLoginSection>
        </Styles.SecondLandingSectionContent>
      </Styles.SecondLandingSection>
      <Styles.ThirdLandingSection>
        <TrendingContainer />
      </Styles.ThirdLandingSection>
    </>
  );
}

export default Landing;
