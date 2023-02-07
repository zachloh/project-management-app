import { Badge, Table } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

import { User } from 'types';

import ActionsBtn from './ActionsBtn';
import styles from './OrgMembersTable.module.css';

type OrgMembersTableProps = {
  members: User<string>[];
  user: User;
  orgId: string;
};

function OrgMembersTable({ members, user, orgId }: OrgMembersTableProps) {
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
            <th className={styles.action}>&nbsp;</th>
            <th>NAME</th>
            <th>POSITION</th>
            <th>ROLE</th>
            <th>MEMBER SINCE</th>
          </tr>
        </thead>
        <tbody>
          {members.map((member) => (
            <tr key={member._id}>
              <td>
                {member._id !== user._id && (
                  <ActionsBtn member={member} orgId={orgId} />
                )}
              </td>
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

export default OrgMembersTable;
