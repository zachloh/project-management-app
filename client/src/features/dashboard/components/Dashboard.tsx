/* eslint-disable import/prefer-default-export */
import { Card, RingProgress, Text } from '@mantine/core';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartEvent,
} from 'chart.js';
import dayjs from 'dayjs';
import React from 'react';
import { Bar } from 'react-chartjs-2';

import styles from './Dashboard.module.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const generateDates = () => {
  const today = dayjs();
  const dates = [];

  for (let i = 0; i < 7; i++) {
    dates.push(today.subtract(i, 'day').format('DD/MM'));
  }

  return dates.reverse();
};

const data = {
  labels: generateDates(),
  datasets: [
    {
      label: 'Created issues',
      data: [4, 2, 3, 2, 5, 6, 4],
      backgroundColor: '#845ef7',
    },
    {
      label: 'Completed issues',
      data: [2, 1, 2, 1, 3, 4, 3],
      backgroundColor: '#d0bfff',
    },
  ],
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

export function Dashboard() {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles['card-title']}>Statistics</h2>
        <div className={styles.statistics}>
          <Card shadow="sm" p="sm" radius="sm" withBorder>
            <div className={styles.chart}>
              <Bar data={data} options={options} />
            </div>
          </Card>
          <Card
            shadow="sm"
            p="sm"
            radius="sm"
            withBorder
            sx={{ display: 'grid' }}
          >
            <h3 className={styles['progress-title']}>Overall Progress</h3>
            <RingProgress
              sections={[
                { value: 60, color: 'violet.2', tooltip: 'Created issues: 10' },
                { value: 40, color: 'violet', tooltip: 'Completed issues: 4' },
              ]}
              size={200}
              roundCaps
              thickness={16}
              label={
                // eslint-disable-next-line react/jsx-wrap-multilines
                <Text size={36} align="center" color="violet" weight="700">
                  40%
                </Text>
              }
              sx={{ justifySelf: 'center' }}
            />
            <Text align="center" color="dark.4" weight="700">
              40% of 10 issues completed
            </Text>
          </Card>
        </div>
      </div>
    </div>
  );
}
