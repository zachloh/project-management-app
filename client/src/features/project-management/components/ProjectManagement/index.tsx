import { Button } from '@mantine/core';
import React, { useState } from 'react';

import { useGetProjects } from 'api/projects/getProjects';
import MainHeading from 'components/MainHeading';
import NotFound from 'components/NotFound';
import { useUser } from 'hooks/useUser';

import CreateProjectModal from '../CreateProjectModal';
import PageSkeleton from '../PageSkeleton';
import ProjectsTable from '../ProjectsTable';
import styles from './ProjectManagement.module.css';

export function ProjectManagement() {
  const { user } = useUser();
  const { data, isLoading, isError } = useGetProjects(user.org?._id);

  const [opened, setOpened] = useState(false);

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      <MainHeading title="Project Management" />
      <h2 className={styles.title}>All Projects</h2>
      <ProjectsTable projects={data.projects} orgId={user.org?._id} />
      <Button size="md" mt={20} onClick={() => setOpened(true)}>
        Create Project
      </Button>
      <CreateProjectModal
        opened={opened}
        onClose={() => setOpened(false)}
        user={user}
      />
    </>
  );
}
