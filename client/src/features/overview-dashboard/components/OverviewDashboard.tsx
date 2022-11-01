/* eslint-disable import/prefer-default-export */
import { Grid } from '@mantine/core';
import React from 'react';

import Card from 'components/Card/Card';
import CardHeader from 'components/Card/CardHeader';

import IssuesChart from './IssuesChart';
import IssuesProgress from './IssuesProgress';
import MembersTable from './MembersTable';
import styles from './OverviewDashboard.module.css';
import ProjectCard from './ProjectCard';

const projects = [1, 2, 3];

export function OverviewDashboard() {
  return (
    <div className={styles.container}>
      <div>
        <CardHeader>Statistics</CardHeader>
        <div className={styles.statistics}>
          <Card>
            <IssuesChart />
          </Card>
          <Card title="Overall Progress">
            <IssuesProgress />
          </Card>
        </div>
      </div>
      <div>
        <CardHeader>Your Projects</CardHeader>
        <Grid gutter="sm">
          {projects.map((project) => (
            <Grid.Col key={project} xs={12} sm={6} md={4} lg={3}>
              <ProjectCard />
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
