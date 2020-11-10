import React, { useContext } from 'react';
import './Landing.css';
import Image from '../components/common/Image';
import { ViewContext } from '../context/ViewContext';

function Landing() {
  const size = useContext(ViewContext);

  return (
    <div
      className={`top-landing-container top-landing-container-${size.device.toLowerCase()}`}
    >
      <h1>Track in demand skills in your area</h1>
      <div className="top-landing-container-grid">
        <p className="top-landing-container-text">
          While there are plenty of great job sites out there it can be
          challenging to get a true gauge of how in demand a set of skills are,
          especially when you want to track this over time or observe historic
          trends.
        </p>
        <div className="top-landing-container-first-image">
          <Image
            src="/images/guy-in-breakout-area.jpeg"
            alt="Man sitting in breakout area with laptop"
          />
        </div>
      </div>
      <p className="top-landing-container-bottom-text">
          Introducing Skills Tracker, a community driven skills tracking app.
          You can search for your skills combination and save it to your
          profile. We will periodically scan presenting it on a beautiful chart.
          If your skills and location already exist in our database you will
          have immediate access to historic chart data.
        </p>
    </div>
  );
}

export default Landing;
