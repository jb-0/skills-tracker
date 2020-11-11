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
        <Search />
      </div>
    </div>
  );
}

export default HomePage;
