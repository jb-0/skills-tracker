import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from 'chart.js';
import 'chartjs-adapter-date-fns';
import { Line } from 'react-chartjs-2';
import { TrackedSearchResult } from '../../api';
import { useTheme } from '@mui/material';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, TimeScale);

export function JobCountChart(props: { search: TrackedSearchResult }) {
  const { palette } = useTheme();
  const data = {
    datasets: [
      {
        label: 'Number of jobs',
        backgroundColor: palette.primary.light,
        borderColor: palette.primary.dark,
        data: props.search.dailySearchTermCount.map((day) => parseInt(day.count)),
      },
    ],
    labels: props.search.dailySearchTermCount.map((day) => day.timestamp),
  };

  const opts = {
    maintainAspectRatio: false,
    scales: {
      x: {
        // The axis for this scale is determined from the first letter of the id as `'x'`
        // It is recommended to specify `position` and / or `axis` explicitly.
        type: 'time',
        time: {
          unit: 'month',
          displayFormats: {
            day: 'MMM D',
          },
        },
      },
    },
  };

  return <Line options={opts as any} data={data} />;
}
