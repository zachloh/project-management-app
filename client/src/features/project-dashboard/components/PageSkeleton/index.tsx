import {
  Box,
  Center,
  Divider,
  Group,
  MediaQuery,
  SimpleGrid,
  Skeleton,
  Table,
} from '@mantine/core';
import React from 'react';

import Card from 'components/Card/Card';

import styles from './PageSkeleton.module.css';

function PageSkeleton() {
  return (
    <>
      <SimpleGrid
        breakpoints={[{ minWidth: 1024, cols: 2 }]}
        mb="lg"
        spacing="lg"
      >
        <Card>
          <Box p={4}>
            <Skeleton height={14} maw={200} mt={4} mb={12} />
            <Group spacing={0} mb={30}>
              <Skeleton height={40} circle />
              <Skeleton height={40} circle ml={-8} />
              <Skeleton height={40} circle ml={-8} />
            </Group>
            <Box mih={155}>
              <Skeleton height={12} maw={300} />
            </Box>
            <Skeleton height={26} width={100} />
            <Divider mt={16} mb={22} />
            <Group noWrap mb={6}>
              <Skeleton height={12} maw={50} />
              <Skeleton height={8} />
              <Skeleton height={12} maw={30} />
            </Group>
          </Box>
        </Card>
        <Card>
          <Skeleton height={12} width={100} mt={8} />
          <Center mih={326}>
            <Skeleton className={styles.chart} />
          </Center>
        </Card>
        <Card>
          <Skeleton height={12} width={100} mt={8} />
          <Center mih={326}>
            <Skeleton className={styles.chart} />
          </Center>
        </Card>
        <Card>
          <Skeleton height={12} width={120} mt={8} mb={14} />
          <Box h={304} px={12} pb={12} pt={5}>
            <Table className={styles.table}>
              <thead>
                <tr>
                  <MediaQuery smallerThan={360} styles={{ display: 'none' }}>
                    <th>
                      <Skeleton height={8} width={50} />
                    </th>
                  </MediaQuery>
                  <th className={styles.title}>
                    <Skeleton height={8} width={50} />
                  </th>
                </tr>
              </thead>
              <tbody>
                {Array.from({ length: 3 }, (_, i) => (
                  <tr key={i}>
                    <MediaQuery smallerThan={360} styles={{ display: 'none' }}>
                      <td>
                        <Skeleton height={8} width={75} />
                      </td>
                    </MediaQuery>
                    <td>
                      <Skeleton height={8} width={75} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Box>
        </Card>
      </SimpleGrid>
      <Card>
        <Skeleton height={12} width={130} mt={8} />
        <Box p={24} pt={31}>
          <Group noWrap align="flex-start" position="center" mb={24}>
            <Skeleton height={20} circle />
            <Skeleton height={75} maw={330} radius={4} />
          </Group>
          <Group noWrap align="flex-start" position="center">
            <Skeleton height={20} circle />
            <Skeleton height={75} maw={330} radius={4} />
          </Group>
        </Box>
      </Card>
    </>
  );
}

export default PageSkeleton;
