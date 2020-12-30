import React, { useEffect, useState } from 'react';
import SavedSearchCard from '../searchCard/SavedSearchCard';
import { v4 as uuidv4 } from 'uuid';
import './TrendingContainer.css';

function TrendingContainer() {
  const [trendingSearches, setTrendingSearches] = useState();
  useEffect(() => {
    async function fetchData() {
      const res = await fetch('/api/job/search/trending', {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          frontend: 'react-frontend',
        },
      });

      try {
        const response = await res.json();
        setTrendingSearches(response.trendingSearches);
      } catch (err) {
        // If an error occurs set trending searches to false to ensure the section is not rendered
        setTrendingSearches(false);
      }
    }

    fetchData();
  }, []);

  if (!trendingSearches) return null
  return (
    <div className="trending-searches">
      <h1>🔥 Trending skill searches</h1>
      <div className="trending-searches-grid">
        {trendingSearches
          ? trendingSearches.map((search) => {
              return <SavedSearchCard search={search} key={uuidv4()} />;
            })
          : null}
      </div>
    </div>
  );
}

export default TrendingContainer;
