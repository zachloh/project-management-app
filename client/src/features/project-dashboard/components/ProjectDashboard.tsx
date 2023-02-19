import { SimpleGrid } from '@mantine/core';
import React from 'react';
import { useParams } from 'react-router-dom';

import { useGetProject } from 'api/projects/getProject';
import Card from 'components/Card/Card';
import DashboardTabs from 'components/DashboardTabs';
import MainHeading from 'components/MainHeading';
import NotFound from 'components/NotFound';
import ProjectCard from 'components/ProjectCard';
import { useUser } from 'hooks/useUser';

import AssignedTable from './AssignedTable';
import IssueStatusDoughnut from './IssueStatusDoughnut';
import IssueTypesPieChart from './IssueTypesPieChart';
import PageSkeleton from './PageSkeleton';
import ProjectHistory from './ProjectHistory';

export function ProjectDashboard() {
  const { projectId } = useParams();

  const { user } = useUser();

  const {
    data: project,
    isLoading,
    isError,
    isSuccess,
  } = useGetProject(projectId, user._id);

  if (isError) {
    return <NotFound />;
  }

  return (
    <>
      <MainHeading title="Dashboard" />
      <DashboardTabs />
      {isLoading && <PageSkeleton />}
      {isSuccess && (
        <>
          <SimpleGrid
            breakpoints={[{ minWidth: 1024, cols: 2 }]}
            mb="lg"
            spacing="lg"
          >
            <ProjectCard large project={project} />
            <Card title="Issue Status">
              <IssueStatusDoughnut project={project} />
            </Card>
            <Card title="Issue Types">
              <IssueTypesPieChart project={project} />
            </Card>
            <Card title="Assigned to Me">
              <AssignedTable project={project} />
            </Card>
          </SimpleGrid>
          <Card title="Project History">
            <ProjectHistory projectId={projectId} />
          </Card>
        </>
      )}
    </>
  );
}
