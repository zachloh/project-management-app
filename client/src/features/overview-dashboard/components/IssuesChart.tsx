import { ChartEvent } from 'chart.js';
import dayjs from 'dayjs';
import React from 'react';
import { Bar } from 'react-chartjs-2';

const generateDates = () => {
  const today = dayjs();
  const dates = [];

  for (let i = 0; i < 7; i++) {
    dates.push(today.subtract(i, 'day').format('DD/MM'));
  }

  return dates.reverse();
};

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        boxWidth: 14,
        boxHeight: 14,
        font: {
          weight: '700',
          size: 14,
        },
      },
      onHover: (event: ChartEvent) => {
        const element = event.native?.target as HTMLElement;
        element.style.cursor = 'pointer';
      },
      onLeave: (event: ChartEvent) => {
        const element = event.native?.target as HTMLElement;
        element.style.cursor = 'default';
      },
    },
    title: {
      display: true,
      text: 'Last 7 Days',
      font: {
        size: 18,
        weight: '900',
      },
    },
  },
  scales: {
    x: {
      grid: {
        borderDash: [3],
      },
      ticks: {
        font: {
          weight: '700',
          size: 13,
        },
      },
    },
    y: {
      grid: {
        borderDash: [3],
      },
      ticks: {
        font: {
          weight: '700',
          size: 14,
        },
      },
    },
  },
};

type IssueChartProps = {
  createdIssues: number[];
  completedIssues: number[];
};

function IssuesChart({ createdIssues, completedIssues }: IssueChartProps) {
  const data = {
    labels: generateDates(),
    datasets: [
      {
        label: 'Created issues',
        data: createdIssues,
        backgroundColor: '#845ef7',
      },
      {
        label: 'Completed issues',
        data: completedIssues,
        backgroundColor: '#d0bfff',
      },
    ],
  };

  return (
    <div style={{ height: '350px' }}>
      <Bar data={data} options={options} />
    </div>
  );
}

export default IssuesChart;
