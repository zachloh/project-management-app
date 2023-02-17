import { Table, Badge } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

import { useGetOrg } from 'api/organizations/getOrg';
import Card from 'components/Card/Card';
import FailedToLoad from 'components/FailedToLoad';

import styles from './MembersTable.module.css';
import TableSkeleton from './TableSkeleton';

type MembersTableProps = {
  orgId: string | undefined;
};

function MembersTable({ orgId }: MembersTableProps) {
  const { data: org, isLoading, isError } = useGetOrg(orgId);

  if (isLoading) {
    return <TableSkeleton />;
  }

  if (isError) {
    return (
      <Card>
        <FailedToLoad />
      </Card>
    );
  }

  return (
    <div className={styles.container}>
      <Table
        verticalSpacing="md"
        fontSize={16}
        className={styles.table}
        horizontalSpacing={20}
        withBorder
      >
        <thead>
          <tr>
            <th>Name</th>
            <th>Position</th>
            <th>Role</th>
            <th>Member Since</th>
          </tr>
        </thead>
        <tbody>
          {org.members.map((member) => (
            <tr key={member._id}>
              <td>{`${member.firstName} ${member.lastName}`}</td>
              <td>{member.position}</td>
              <td>
                <Badge color="violet.7" size="lg">
                  {member.role}
                </Badge>
              </td>
              <td>{dayjs(member.createdAt).format('DD MMM YYYY')}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default MembersTable;
