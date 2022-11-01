import { Table, Badge } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

import styles from './MembersTable.module.css';

function MembersTable() {
  return (
    <div className={styles.container}>
      <Table verticalSpacing="sm" fontSize={16} className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Role</th>
            <th>Member Since</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>John Doe</td>
            <td>Lead Developer</td>
            <td>
              <Badge color="violet" size="lg">
                Admin
              </Badge>
            </td>
            <td>{dayjs().format('DD MMM YYYY')}</td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>Senior Software Engineer</td>
            <td>
              <Badge color="violet" size="lg">
                Project Manager
              </Badge>
            </td>
            <td>{dayjs().format('DD MMM YYYY')}</td>
          </tr>
          <tr>
            <td>Joe Bloggs</td>
            <td>Junior Software Engineer</td>
            <td>
              <Badge color="violet" size="lg">
                Member
              </Badge>
            </td>
            <td>{dayjs().format('DD MMM YYYY')}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default MembersTable;
