import React from 'react';

import { useGetOrg } from 'api/organizations/getOrg';
import MainHeading from 'components/MainHeading';
import NotFound from 'components/NotFound';
import { useUser } from 'hooks/useUser';

import OrgMembersTable from '../OrgMembersTable';
import OrgTable from '../OrgTable';
import PageSkeleton from '../PageSkeleton';
import styles from './AdminSettings.module.css';

export function AdminSettings() {
  const { user } = useUser();
  const { data: org, isLoading, isError } = useGetOrg(user.org?._id);

  if (user.role === 'member' || user.role === 'project manager') {
    return <NotFound />;
  }

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError) {
    return <NotFound />;
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
