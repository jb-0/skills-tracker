import React, { useContext } from 'react';
import './Landing.css';
import Image from '../components/common/Image';
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
    <div>
      <Styles.FirstLandingSection>
        <Styles.FirstLandingSectionFlex device={size.device.toLowerCase()}>
          <div>
            <h1>Track in demand skills in your area</h1>
            <p className="large-p">
              While there are plenty of great job sites out there it can be
              challenging to get a true gauge of how in demand a set of skills
              are, especially when you want to track this over time or observe
              historic trends. Skills Search provides an easy to use solution to
              this problem.
            </p>
          </div>
          <div>
            <Styles.AppOnPhoneImg
              src={iphoneImg}
              alt="Man sitting in breakout area with laptop"
            />
          </div>
        </Styles.FirstLandingSectionFlex>
      </Styles.FirstLandingSection>
      <div
        className={`second-landing-container second-landing-container-${size.device.toLowerCase()}`}
      >
        <h1 className="secondary-font-color">Sign up now</h1>
        <p className="large-p secondary-font-color">
          Creating an account allows you to save searches as well as track new
          searches that are not currently in our database.
        </p>
        <div className="social-login-button">
          <a href="/auth/facebook">
            <FacebookLoginButton>Sign up with Facebook</FacebookLoginButton>
          </a>
        </div>
        <div className="social-login-button">
          <a href="/auth/google">
            <GoogleLoginButton>Sign up with Google</GoogleLoginButton>
          </a>
        </div>
      </div>
      <div
        className={`third-landing-container third-landing-container-${size.device.toLowerCase()}`}
      >
        <TrendingContainer />
      </div>
    </div>
  );
}

export default Landing;
