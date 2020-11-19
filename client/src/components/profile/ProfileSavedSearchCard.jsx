import React, { useEffect } from 'react';
import './ProfileSavedSearchCard.css';
import Chart from 'chart.js';

function ProfileSavedSearchCard(props) {

  useEffect(() => {
    async function createChart() {
      const ctx = document.getElementById(props.search._id).getContext('2d');
      console.log(props.search.dailySearchTermCount.timestamp);
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',
        
        // The data for our dataset
        data: {
          labels: props.search.dailySearchTermCount.map(day => day.timestamp),
          datasets: [
            {
              label: 'Number of jobs',
              backgroundColor: '#ffb703',
              borderColor: '#212529',
              data: props.search.dailySearchTermCount.map(day => day.count)
            },
          ],
        },

        // Configuration options go here
        options: {},
      });
    }

    createChart();
  }, []);

  return (
    <div className="saved-search-card">
      <p>
        Search terms: {props.search.searchTerms.keywords}
        <br />
        Location: {props.search.searchTerms.locationName}
      </p>
      <canvas id={props.search._id}></canvas>
    </div>
  );
}

export default ProfileSavedSearchCard;
