import React from 'react';
import ImageContainer from '../common/ImageContainer';
import './HomePage.css'

function HomePage() {
  return (
    <div className="home-top-container">
      <ImageContainer src="/images/home-hero.png" alt="Laptop and plant hero" />
      <div className="overlay-image-container">
        <h1>Search for your skillset</h1>
      </div>
      
    </div>
  );
}

export default HomePage;
