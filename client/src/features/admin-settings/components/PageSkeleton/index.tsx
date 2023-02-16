import { Skeleton, Table } from '@mantine/core';
import React from 'react';

import styles from './PageSkeleton.module.css';

function PageSkeleton() {
  return (
    <>
      <Skeleton height={16} maw={200} mt={4} />
      <Skeleton height={12} maw={180} mt={35} mb={15} />
      <div className={styles.container}>
        <Table
          withBorder
          verticalSpacing="md"
          horizontalSpacing={20}
          className={styles.table}
        >
          <thead>
            <tr>
              {Array.from({ length: 4 }, (_, i) => (
                <th key={i}>
                  <Skeleton height={8} width={80} />
                </th>
              ))}
              <th>&nbsp;</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {Array.from({ length: 2 }, (_, i) => (
                <td key={i}>
                  <Skeleton height={8} width={100} />
                </td>
              ))}
              {Array.from({ length: 2 }, (_, i) => (
                <td key={i}>
                  <Skeleton height={8} width={20} />
                </td>
              ))}
              <td className={styles.delete}>
                <Skeleton height={42} width={210} radius={4} />
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
      <Skeleton height={12} maw={220} mt={25} mb={15} />
      <div className={styles.container}>
        <Table
          withBorder
          verticalSpacing="md"
          horizontalSpacing={20}
          className={styles.table}
        >
          <thead>
            <tr>
              <th>&nbsp;</th>
              {Array.from({ length: 4 }, (_, i) => (
                <th key={i}>
                  <Skeleton height={8} width={80} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 3 }, (_, i) => (
              <tr key={i}>
                <td className={styles.action}>
                  <Skeleton height={36} width={95} radius={4} />
                </td>
                <td>
                  <Skeleton height={8} width={90} />
                </td>
                <td>
                  <Skeleton height={8} width={100} />
                </td>
                <td>
                  <Skeleton height={18} width={90} />
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
