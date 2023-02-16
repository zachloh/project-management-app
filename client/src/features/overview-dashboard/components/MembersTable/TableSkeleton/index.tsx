import { Skeleton, Table } from '@mantine/core';
import React from 'react';

import styles from './TableSkeleton.module.css';

function TableSkeleton() {
  return (
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
  );
}

export default TableSkeleton;
