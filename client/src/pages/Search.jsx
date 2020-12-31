import React, { useContext } from 'react';
import './Search.css';
import Search from '../components/search/Search';
import { ViewContext } from '../context/ViewContext';

function HomePage() {
  const size = useContext(ViewContext);
  return (
    <div
      className={`image-container image-container-${size.device.toLowerCase()}`}
    >
      <div className="search-container">
        <h1>Search for your skillset</h1>
        <p>Select a location and begin typing a skill, click a skill from the predefined list to add
        it to your search. Finally click the search button to start searching. </p>
        <Search />
      </div>
    </div>
  );
}

export default HomePage;
