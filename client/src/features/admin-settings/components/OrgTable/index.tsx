import { Button, Table } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import dayjs from 'dayjs';
import React from 'react';
import { Minus, Trash } from 'tabler-icons-react';

import { Organization } from 'types';

import styles from './OrgTable.module.css';

type OrgTableProps = {
  org: Organization;
};

function OrgTable({ org }: OrgTableProps) {
  return (
    <div className={styles.container}>
      <Table
        withBorder
        className={styles.table}
        verticalSpacing="md"
        horizontalSpacing={20}
      >
        <thead>
          <tr>
            <th>NAME</th>
            <th>CREATED AT</th>
            <th>MEMBERS</th>
            <th>PROJECTS</th>
            <th className={styles.delete}>&nbsp;</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{org.name}</td>
            <td>{dayjs(org.createdAt).format('DD MMM YYYY')}</td>
            <td>{org.members.length}</td>
            <td>{org.projects.length}</td>
            <td>
              <Button
                color="red.8"
                size="md"
                leftIcon={<Trash size={18} />}
                miw={210}
                pl={6}
                pr={10}
                className={styles['not-implemented']}
                onClick={() =>
                  showNotification({
                    title: 'Unavailable',
                    message: 'This feature is not available in demo.',
                    icon: <Minus />,
                    color: 'red',
                  })
                }
              >
                Delete Organization
              </Button>
            </td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}

export default OrgTable;
