import { Divider, Group, MediaQuery, Skeleton } from '@mantine/core';
import React from 'react';

import styles from './PageSkeleton.module.css';

function PageSkeleton() {
  return (
    <>
      <Skeleton height={16} maw={200} mt={4} />
      <Group mt={20} mb={30}>
        <MediaQuery smallerThan={426} styles={{ width: '100%' }}>
          <Skeleton height={36} width={300} radius={4} />
        </MediaQuery>
        <Group>
          <Group spacing={0}>
            <Skeleton height={38} circle />
            <Skeleton height={38} circle ml={-5} />
            <Skeleton height={38} circle ml={-5} />
          </Group>
          <MediaQuery smallerThan={320} styles={{ display: 'none' }}>
            <Divider orientation="vertical" ml={6} />
          </MediaQuery>
          <Skeleton height={10} width={100.05} />
        </Group>
      </Group>
      <div className={styles.container}>
        <Skeleton height={401} radius={8} />
        <Skeleton height={401} radius={8} />
        <Skeleton height={401} radius={8} />
        <Skeleton height={401} radius={8} />
      </div>
    </>
  );
}

export default PageSkeleton;
