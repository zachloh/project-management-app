import { ChartEvent } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['TO DO', 'IN PROGRESS', 'IN REVIEW', 'DONE'],
  datasets: [
    {
      data: [4, 1, 3, 2],
      backgroundColor: ['#FCC419', '#74C0FC', '#8CE99A', '#FFA8A8'],
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top' as const,
      labels: {
        boxWidth: 18,
        boxHeight: 18,
        font: {
          weight: '700',
          size: 16,
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
  },
};

function IssueStatusPieChart() {
  return (
    <div style={{ height: '320px' }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default IssueStatusPieChart;
