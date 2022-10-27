/* eslint-disable import/prefer-default-export */
import { Card, RingProgress, Text } from '@mantine/core';
import React from 'react';

import styles from './Dashboard.module.css';
import IssuesChart from './IssuesChart';

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
