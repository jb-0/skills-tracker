import React, { useContext } from 'react';
import Search from '../components/search/Search';
import { ViewContext } from '../context/ViewContext';
import { BackgroundImageContainer, SearchInstructions } from './Search.Styles';

function HomePage() {
  const size = useContext(ViewContext);

  return (
    <BackgroundImageContainer device={size.device.toLowerCase()}>
      <SearchInstructions>
        <h1>Search for your skillset</h1>
        <p>
          Select a location and begin typing a skill, click a skill from the
          predefined list to add it to your search. Finally click the search
          button to start searching.
        </p>
      </SearchInstructions>
      <Search />
    </BackgroundImageContainer>
  );
}

export default HomePage;
