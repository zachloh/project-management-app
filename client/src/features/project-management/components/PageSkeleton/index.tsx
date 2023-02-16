import { Skeleton, Table } from '@mantine/core';
import React from 'react';

import styles from './PageSkeleton.module.css';

function PageSkeleton() {
  return (
    <>
      <Skeleton height={16} maw={200} mt={4} />
      <Skeleton height={12} maw={100} mt={35} mb={15} />
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
              {Array.from({ length: 3 }, (_, i) => (
                <th key={i}>
                  <Skeleton height={8} width={80} />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: 2 }, (_, i) => (
              <tr key={i}>
                <td className={styles.action}>
                  <Skeleton height={38} width={95} radius={4} />
                </td>
                <td className={styles.name}>
                  <Skeleton height={8} width={200} />
                </td>
                <td>
                  <Skeleton height={18} width={90} />
                </td>
                <td className={styles.members}>
                  <Skeleton height={32} circle />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
      <Skeleton height={40} width={150} radius={4} mt={22} />
    </>
  );
}

export default PageSkeleton;
