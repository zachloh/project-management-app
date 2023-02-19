import { Button, Stack, Text } from '@mantine/core';
import React, { useState } from 'react';
import { FolderOff } from 'tabler-icons-react';

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
  const { data, isLoading, isError } = useGetProjects(user.org?._id, user._id);

  const [opened, setOpened] = useState(false);

  if (user.role === 'member') {
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
      <MainHeading title="Project Management" />
      <h2 className={styles.title}>All Projects</h2>
      {data.projects.length > 0 && (
        <ProjectsTable projects={data.projects} orgId={user.org?._id} />
      )}
      {data.projects.length === 0 && (
        <Stack align="center" py={30} spacing={10}>
          <FolderOff color="#5C5F66" size={32} />
          <Text align="center" weight={600} color="dark.3">
            No projects created
          </Text>
        </Stack>
      )}
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
