/* eslint-disable import/prefer-default-export */
import React from 'react';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';

import styles from './Dashboard.module.css';
import IssuesChart from './IssuesChart';
import IssuesProgress from './IssuesProgress';

export function Dashboard() {
  return (
    <div className={styles.container}>
      <div>
        <CardHeader>Statistics</CardHeader>
        <div className={styles.statistics}>
          <Card>
            <div className={styles.chart}>
              <IssuesChart />
            </div>
          </Card>
          <Card title="Overall Progress" sx={{ display: 'grid' }}>
            <IssuesProgress />
          </Card>
        </div>
      </div>
    </div>
  );
}
