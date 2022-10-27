/* eslint-disable import/prefer-default-export */
import { Card } from '@mantine/core';
import React from 'react';

import styles from './Dashboard.module.css';
import IssuesChart from './IssuesChart';
import IssuesProgress from './IssuesProgress';

export function Dashboard() {
  return (
    <div className={styles.container}>
      <div>
        <h2 className={styles['card-header']}>Statistics</h2>
        <div className={styles.statistics}>
          <Card shadow="sm" p="sm" radius="sm" withBorder>
            <div className={styles.chart}>
              <IssuesChart />
            </div>
          </Card>
          <Card
            shadow="sm"
            p="sm"
            radius="sm"
            withBorder
            sx={{ display: 'grid' }}
          >
            <h3 className={styles['card-title']}>Overall Progress</h3>
            <IssuesProgress />
          </Card>
        </div>
      </div>
    </div>
  );
}
