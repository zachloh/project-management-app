import { SimpleGrid } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { useParams } from 'react-router-dom';

import Card from 'components/Card/Card';
import ProjectCard from 'components/ProjectCard';

import AssignedTable from './AssignedTable';
import IssueStatusPieChart from './IssueStatusPieChart';
import IssueTypesPieChart from './IssueTypesPieChart';
import ProjectHistory from './ProjectHistory';

export function ProjectDashboard() {
  // All devices except mobile
  const matches = useMediaQuery('(min-width: 425px)');

  const { projectId } = useParams();

  return (
    <>
      <SimpleGrid breakpoints={[{ minWidth: 768, cols: 2 }]} mb={16}>
        {/* <ProjectCard large={!!matches} /> */}
        <Card title="Issue Types">
          <IssueTypesPieChart />
        </Card>
        <Card title="Issue Status">
          <IssueStatusPieChart />
        </Card>
        <Card title="Assigned to Me">
          <AssignedTable />
        </Card>
      </SimpleGrid>
      <Card title="Project History">
        <ProjectHistory projectId={projectId} />
      </Card>
    </>
  );
}
