import { SimpleGrid, Stack, Text } from '@mantine/core';
import React from 'react';
import { FolderOff } from 'tabler-icons-react';

import { useGetProjects } from 'api/projects/getProjects';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import DashboardTabs from 'components/DashboardTabs';
import MainHeading from 'components/MainHeading';
import NotFound from 'components/NotFound';
import ProjectCard from 'components/ProjectCard';
import { useUser } from 'hooks/useUser';

import IssuesChart from '../IssuesChart';
import IssuesProgress from '../IssuesProgress';
import MembersTable from '../MembersTable';
import PageSkeleton from '../PageSkeleton';
import styles from './OverviewDashboard.module.css';

export function OverviewDashboard() {
  const { user } = useUser();
  const {
    data = {
      projects: [],
      createdIssuesLast7Days: [],
      completedIssuesLast7Days: [],
    },
    isLoading,
    isError,
    isSuccess,
  } = useGetProjects(user.org?._id, user._id);

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      <MainHeading title="Dashboard" />
      <DashboardTabs />
      {isLoading && <PageSkeleton />}
      {isSuccess && (
        <div className={styles.container}>
          <div>
            <CardHeader>Statistics</CardHeader>
            <div className={styles.statistics}>
              <Card>
                <IssuesChart
                  createdIssues={data.createdIssuesLast7Days}
                  completedIssues={data.completedIssuesLast7Days}
                />
              </Card>
              <Card title="Overall Progress">
                <IssuesProgress projects={data.projects} />
              </Card>
            </div>
          </div>
          <div>
            <CardHeader>Your Projects</CardHeader>
            {data.projects.length === 0 && (
              <Stack align="center" py={30} spacing={10}>
                <FolderOff color="#5C5F66" size={32} />
                <Text align="center" weight={600} color="dark.3">
                  No projects created
                </Text>
              </Stack>
            )}
            {data.projects.length > 0 && (
              <SimpleGrid
                spacing="lg"
                breakpoints={[
                  { minWidth: 'xs', cols: 2 },
                  { minWidth: 'sm', cols: 1 },
                  { minWidth: 850, cols: 2 },
                  { minWidth: 'lg', cols: 3 },
                  { minWidth: 1600, cols: 4 },
                  { minWidth: 2000, cols: 5 },
                  { minWidth: 2560, cols: 6 },
                ]}
              >
                {data.projects.map((project) => (
                  <div key={project._id}>
                    <ProjectCard project={project} />
                  </div>
                ))}
              </SimpleGrid>
            )}
          </div>
          <div>
            <CardHeader>Organization Members</CardHeader>
            <MembersTable orgId={user.org?._id} />
          </div>
        </div>
      )}
    </>
  );
}
