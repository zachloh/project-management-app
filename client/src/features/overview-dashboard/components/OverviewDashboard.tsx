import { Grid } from '@mantine/core';
import React from 'react';

import { useProjects } from 'api/getProjects';
import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';
import DashboardSkeleton from 'components/DashboardSkeleton';
import ProjectCard from 'components/ProjectCard';

import IssuesChart from './IssuesChart';
import IssuesProgress from './IssuesProgress';
import MembersTable from './MembersTable';
import styles from './OverviewDashboard.module.css';

// const projects = [1, 2, 3];

export function OverviewDashboard() {
  const {
    data = {
      projects: [],
      createdIssuesLast7Days: [],
      completedIssuesLast7Days: [],
    },
    isLoading,
  } = useProjects('636a10bb1fb9e7a0550389f2');

  // return <DashboardSkeleton />;

  if (isLoading) {
    return <DashboardSkeleton />;
  }

  return (
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
        <Grid gutter="sm">
          {/* TODO: check if projects array is empty */}
          {data.projects.map((project) => (
            <Grid.Col key={project._id} xs={12} sm={6} md={4} lg={3}>
              <ProjectCard project={project} />
            </Grid.Col>
          ))}
        </Grid>
      </div>
      <div>
        <CardHeader>Organization Members</CardHeader>
        <Card>
          <MembersTable />
        </Card>
      </div>
    </div>
  );
}
