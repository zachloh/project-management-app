import { Table, Badge } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

import { useGetOrg } from 'api/organizations/getOrg';

import styles from './MembersTable.module.css';

type MembersTableProps = {
  orgId: string | undefined;
};

function MembersTable({ orgId }: MembersTableProps) {
  const { data: org, isLoading, isError } = useGetOrg(orgId);

  if (isLoading) {
    // TODO: Add skeleton
    return <div>Loading...</div>;
  }

  if (isError) {
    // TODO: Add error
    return <div>Error...</div>;
  }

  return (
    <div className={styles.container}>
      <Table verticalSpacing="md" fontSize={16} className={styles.table}>
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
                <Badge color="violet" size="lg">
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
