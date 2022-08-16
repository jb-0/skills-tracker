import React, { useEffect } from 'react';
import Chart from 'chart.js';

export function JobCountChart(props) {
  useEffect(() => {
    async function createChart() {
      const ctx = document.getElementById(props.search._id).getContext('2d');
      new Chart(ctx, {
        type: 'line',

        data: {
          labels: props.search.dailySearchTermCount.map((day) => day.timestamp),
          datasets: [
            {
              label: 'Number of jobs',
              backgroundColor: '#ffb703',
              borderColor: '#212529',
              borderWidth: '1.5',
              data: props.search.dailySearchTermCount.map((day) => day.count),
            },
          ],
        },

        options: {
          maintainAspectRatio: false,
          elements: {
            point: {
              radius: 0,
            },
          },
          scales: {
            xAxes: [
              {
                type: 'time',
                time: {
                  unit: 'month',
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
                  autoSkip: true,
                  maxTicksLimit: 6,
                },
              },
            ],
          },
        },
      });
    }

    createChart();
  });

  return <canvas id={props.search._id} data-testid={props.search._id}></canvas>;
}
