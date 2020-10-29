import React, { useState, useEffect } from 'react';

function SearchResultsContainer(props) {
  const [jobs, setJobs] = useState([]);

  async function fetchData() {
    const searchTermString = props.searchTerms.join(' ');

    const res = await fetch(
      `/api/job/search?keywords=${searchTermString}&locationName=${props.location}
        &distanceFromLocation=10`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          frontend: 'react-frontend',
        },
      }
    );

    if (res.status === 200) {
      setJobs(await res.json());
    } else {
      setJobs({ noOfResults: 0, msg: 'no results found' });
      console.log(res);
    }
  }

  useEffect(() => {
    fetchData();
  }, [props.searchTerms]);

  return (
    <div>
      <h1>
        For your search "{props.searchTerms.join(' ')}" there are currently{' '}
        {jobs.noOfResults} jobs
      </h1>
    </div>
  );
}

export default SearchResultsContainer;
