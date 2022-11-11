import { Skeleton } from '@mantine/core';
import React from 'react';

import Card from 'components/Card/Card';

import styles from './DashboardSkeleton.module.css';

function DashboardSkeleton() {
  // TODO: Edit skeleton

  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        <Card>
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
          <Skeleton height={8} radius="xl" />
        </Card>
        <Card>
          <Skeleton height={10} radius="xl" width="30%" />
          <Skeleton height={50} circle mb="xl" />
          <Skeleton height={8} radius="xl" />
        </Card>
      </div>
    </div>
  );
}

export default DashboardSkeleton;
