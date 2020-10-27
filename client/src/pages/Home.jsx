import React from 'react';
import './Home.css'
import Image from '../components/common/Image';
import SearchContainer from '../components/search/SearchContainer'


function HomePage() {
  return (
    <div className="home-top-container">
      <Image src="/images/home-hero.png" alt="Laptop and plant hero" />
      <div className="overlay-image-container">
        <h1>Search for your skillset</h1>
        <SearchContainer />
      </div>
      
    </div>
  );
}

export default HomePage;
