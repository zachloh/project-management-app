import {
  Box,
  Divider,
  Group,
  SimpleGrid,
  Skeleton,
  Stack,
  Table,
} from '@mantine/core';
import React from 'react';

import Card from 'components/Card/Card';

import styles from './PageSkeleton.module.css';

function PageSkeleton() {
  return (
    <>
      <Skeleton height={12} width={100} mb={10} mt={-4} />
      <div className={styles.statistics}>
        <Card>
          <Stack h={350} justify="space-between">
            <Stack align="center" mt={15}>
              <Skeleton height={10} width={100} mb={10} />
              <Group position="center">
                <Skeleton height={10} width={120} />
                <Skeleton height={10} width={140} />
              </Group>
            </Stack>
            <Group noWrap align="flex-end" position="apart" mb={20} px={30}>
              <Skeleton height={250} radius={0} maw={40} />
              <Skeleton height={160} radius={0} maw={40} />
              <Skeleton height={200} radius={0} maw={40} />
              <Skeleton height={120} radius={0} maw={40} />
              <Skeleton height={180} radius={0} maw={40} />
              <Skeleton height={150} radius={0} maw={40} />
              <Skeleton height={100} radius={0} maw={40} />
            </Group>
          </Stack>
        </Card>
        <Card>
          <Box className={styles['progress-container']}>
            <Skeleton height={12} width={130} mt={8} />
            <Stack align="center">
              <Skeleton className={styles.progress} />
              <Skeleton height={12} maw={200} />
            </Stack>
          </Box>
        </Card>
      </div>
      <Skeleton height={12} width={130} mb={12} mt={26} />
      <SimpleGrid
        spacing="lg"
        breakpoints={[
          { minWidth: 'xs', cols: 2 },
          { minWidth: 'sm', cols: 1 },
          { minWidth: 850, cols: 2 },
          { minWidth: 'lg', cols: 3 },
          { minWidth: 1600, cols: 4 },
          { minWidth: 2000, cols: 5 },
          { minWidth: 2560, cols: 6 },
        ]}
      >
        <Card>
          <Box p={4}>
            <Skeleton height={12} maw={200} mt={2} mb={12} />
            <Group spacing={0} mb={25}>
              <Skeleton height={34} circle />
              <Skeleton height={34} circle ml={-6} />
              <Skeleton height={34} circle ml={-6} />
            </Group>
            <Box mih={93}>
              <Skeleton height={10} maw={150} />
            </Box>
            <Skeleton height={24} width={100} />
            <Divider mt={16} mb={22} />
            <Group noWrap mb={6}>
              <Skeleton height={12} maw={50} />
              <Skeleton height={8} />
              <Skeleton height={12} maw={45} />
            </Group>
          </Box>
        </Card>
        <Card>
          <Box p={4}>
            <Skeleton height={12} maw={200} mt={2} mb={12} />
            <Group spacing={0} mb={25}>
              <Skeleton height={34} circle />
              <Skeleton height={34} circle ml={-6} />
              <Skeleton height={34} circle ml={-6} />
            </Group>
            <Box mih={93}>
              <Skeleton height={10} maw={150} />
            </Box>
            <Skeleton height={24} width={100} />
            <Divider mt={16} mb={22} />
            <Group noWrap mb={6}>
              <Skeleton height={12} maw={50} />
              <Skeleton height={8} />
              <Skeleton height={12} maw={45} />
            </Group>
          </Box>
        </Card>
      </SimpleGrid>
      <Skeleton height={12} maw={200} mb={14} mt={25} />
      <div className={styles['table-container']}>
        <Table className={styles.table} horizontalSpacing={20} withBorder>
          <thead>
            <tr>
              <th>
                <Skeleton height={9} width={50} />
              </th>
              <th>
                <Skeleton height={9} width={75} />
              </th>
              <th>
                <Skeleton height={9} width={50} />
              </th>
              <th>
                <Skeleton height={9} width={100} />
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }, (_, i) => (
              <tr key={i}>
                <td>
                  <Skeleton height={8} width={80} />
                </td>
                <td>
                  <Skeleton height={8} width={160} />
                </td>
                <td className={styles.badge}>
                  <Skeleton height={21} width={100} />
                </td>
                <td>
                  <Skeleton height={8} width={90} />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default PageSkeleton;
