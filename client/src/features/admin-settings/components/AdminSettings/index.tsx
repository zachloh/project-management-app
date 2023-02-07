import React from 'react';

import { useGetOrg } from 'api/organizations/getOrg';
import MainHeading from 'components/MainHeading';
import { useUser } from 'hooks/useUser';

import OrgMembersTable from '../OrgMembersTable';
import OrgTable from '../OrgTable';
import styles from './AdminSettings.module.css';

export function AdminSettings() {
  const { user } = useUser();
  const { data: org, isLoading, isError } = useGetOrg(user.org?._id);

  if (isLoading) {
    // TODO: Add skeleton
    return <div>Loading...</div>;
  }

  if (isError) {
    // TODO: Add error
    return <div>Error...</div>;
  }

  return (
    <>
      <MainHeading title="Admin Settings" />
      <h2 className={styles.title}>Your Organization</h2>
      <OrgTable org={org} />
      <h2 className={styles.title}>Organization Members</h2>
      <OrgMembersTable members={org.members} user={user} orgId={org._id} />
    </>
  );
}
