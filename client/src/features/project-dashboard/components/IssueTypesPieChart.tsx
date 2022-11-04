import { ChartEvent } from 'chart.js';
import React from 'react';
import { Pie } from 'react-chartjs-2';

const data = {
  labels: ['Tasks', 'Stories', 'Bugs'],
  datasets: [
    {
      data: [4, 3, 2],
      backgroundColor: ['#74C0FC', '#8CE99A', '#FFA8A8'],
      borderColor: '#999',
      borderWidth: 1,
    },
  ],
};

const options = {
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'left' as const,
      labels: {
        boxWidth: 14,
        boxHeight: 14,
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

function IssueTypesPieChart() {
  return (
    <div style={{ height: '320px' }}>
      <Pie data={data} options={options} />
    </div>
  );
}

export default IssueTypesPieChart;
