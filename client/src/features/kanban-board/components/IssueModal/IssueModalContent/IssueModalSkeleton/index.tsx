import { Box, Group, Skeleton, Stack } from '@mantine/core';
import React from 'react';

import styles from './IssueModalSkeleton.module.css';

function IssueModalSkeleton() {
  return (
    <>
      <Group position="apart" mb={22} noWrap>
        <Skeleton height={12} width={110} />
        <Group spacing={18} pr={4} noWrap>
          <Skeleton height={20} circle />
          <Skeleton height={20} circle />
        </Group>
      </Group>
      <div className={styles.container}>
        <div>
          <Skeleton height={8} width={30} mb={10} />
          <Skeleton height={36} radius={4} className={styles.input} />
          <Skeleton height={8} width={60} mb={10} />
          <Skeleton height={108} radius={4} className={styles.input} />
          <div className={styles.options}>
            <Box w="100%">
              <Skeleton height={8} width={30} mb={10} />
              <Skeleton height={36} radius={4} />
            </Box>
            <Box w="100%">
              <Skeleton height={8} width={45} mb={10} />
              <Skeleton height={36} radius={4} />
            </Box>
            <Box w="100%">
              <Skeleton height={8} width={55} mb={10} />
              <Skeleton height={36} radius={4} />
            </Box>
          </div>
        </div>
        <div>
          <Skeleton height={8} width={60} mb={10} />
          <Skeleton height={36} radius={4} className={styles.input} />
          <Skeleton height={8} width={60} mb={10} />
          <Skeleton height={36} radius={4} className={styles.input} />
          <Skeleton height={8} width={60} mb={10} />
          <Skeleton height={36} radius={4} className={styles.input} />
          <Stack mih={65} spacing={0} justify="center">
            <Skeleton height={8} width={100} mb={10} />
            <Skeleton height={8} width={120} />
          </Stack>
        </div>
        <div className={styles.buttons}>
          <Skeleton height={36} width={80} radius={4} />
          <Skeleton height={36} width={80} radius={4} />
        </div>
      </div>
    </>
  );
}

export default IssueModalSkeleton;
