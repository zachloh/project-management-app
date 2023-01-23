import { SimpleGrid } from '@mantine/core';
import React from 'react';

import { useGetProjects } from 'api/projects/getProjects';
import { useGetUser } from 'api/users/getUser';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import DashboardSkeleton from 'components/DashboardSkeleton';
import DashboardTabs from 'components/DashboardTabs';
import MainHeading from 'components/MainHeading';
import ProjectCard from 'components/ProjectCard';

import IssuesChart from './IssuesChart';
import IssuesProgress from './IssuesProgress';
import MembersTable from './MembersTable';
import styles from './OverviewDashboard.module.css';

export function OverviewDashboard() {
  const { data: user } = useGetUser();
  const {
    data = {
      projects: [],
      createdIssuesLast7Days: [],
      completedIssuesLast7Days: [],
    },
    isLoading,
  } = useGetProjects(user?.org?._id);

  // return <DashboardSkeleton />;

  if (isLoading) {
    // TODO: Edit skeleton
    return <DashboardSkeleton />;
  }

  // TODO: Handle error (add 'unexpected error' component)

  return (
    <>
      <MainHeading title="Dashboard" />
      <DashboardTabs />
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
          <SimpleGrid
            spacing="lg"
            breakpoints={[
              { minWidth: 'xs', cols: 2 },
              { minWidth: 'sm', cols: 1 },
              { minWidth: 850, cols: 2 },
              { minWidth: 'lg', cols: 3 },
              { minWidth: 'xl', cols: 4 },
              { minWidth: 2000, cols: 5 },
              { minWidth: 2560, cols: 6 },
            ]}
          >
            {/* TODO: check if projects array is empty */}
            {data.projects.map((project) => (
              <div key={project._id}>
                <ProjectCard project={project} />
              </div>
            ))}
          </SimpleGrid>
        </div>
        <div>
          <CardHeader>Organization Members</CardHeader>
          <Card>
            <MembersTable orgId={user?.org?._id} />
          </Card>
        </div>
      </div>
    </>
  );
}
