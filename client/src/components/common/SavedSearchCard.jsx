import React, { useEffect } from 'react';
import './SavedSearchCard.css';
import Chart from 'chart.js';

function ProfileSavedSearchCard(props) {
  useEffect(() => {
    async function createChart() {
      const ctx = document.getElementById(props.search._id).getContext('2d');
      const chart = new Chart(ctx, {
        type: 'line',

        data: {
          labels: props.search.dailySearchTermCount.map((day) => day.timestamp),
          datasets: [
            {
              label: 'Number of jobs',
              backgroundColor: '#ffb703',
              borderColor: '#212529',
              data: props.search.dailySearchTermCount.map((day) => day.count),
            },
          ],
        },

        options: {
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'day',
                  displayFormats: {
                    day: 'MMM D',
                  },
                },
              },
            ],
            yAxes: [
              {
                ticks: {
                  precision: 0,
                },
              },
            ],
          },
        },
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
