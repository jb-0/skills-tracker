import React, { useEffect } from 'react';
import './ProfileSavedSearchCard.css';
import Chart from 'chart.js';

function ProfileSavedSearchCard(props) {

  useEffect(() => {
    async function createChart() {
      const ctx = document.getElementById(props.search._id).getContext('2d');
      const chart = new Chart(ctx, {
        // The type of chart we want to create
        type: 'line',

        // The data for our dataset
        data: {
          labels: [
            'January',
            'February',
            'March',
            'April',
            'May',
            'June',
            'July',
          ],
          datasets: [
            {
              label: 'Number of jobs (dummy data)',
              backgroundColor: 'rgb(255, 99, 132)',
              borderColor: 'rgb(255, 99, 132)',
              data: [0, 10, 5, 2, 20, 30, 45],
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
