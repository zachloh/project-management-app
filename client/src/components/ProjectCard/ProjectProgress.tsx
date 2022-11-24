import { Progress, Grid, Tooltip } from '@mantine/core';
import React from 'react';
import { ClipboardCheck } from 'tabler-icons-react';

import { Project, PopulatedIssue } from 'types';

type ProjectProgressProps = {
  project: Project<PopulatedIssue>;
};

function ProjectProgress({ project }: ProjectProgressProps) {
  const createdIssues =
    project.todoIssues.length +
    project.inProgressIssues.length +
    project.inReviewIssues.length +
    project.completedIssues.length;
  const completedIssues = project.completedIssues.length;

  return (
    <Grid align="center">
      <Grid.Col span="content" pr={0}>
        <Tooltip withArrow label="Completed issues">
          <div>
            <ClipboardCheck />
          </div>
        </Tooltip>
      </Grid.Col>
      <Grid.Col span="content" pl={2}>
        {`${completedIssues}/${createdIssues}`}
      </Grid.Col>
      <Grid.Col span="auto">
        <Progress
          aria-label="Project progress"
          size="md"
          sections={[
            {
              value:
                createdIssues === 0
                  ? 0
                  : Math.round((completedIssues / createdIssues) * 100),
              color: 'indigo.5',
            },
          ]}
        />
      </Grid.Col>
      <Grid.Col span="content" sx={{ color: '#5c7cfa' }}>
        {`${
          createdIssues === 0
            ? 0
            : Math.round((completedIssues / createdIssues) * 100)
        }%`}
      </Grid.Col>
    </Grid>
  );
}

export default ProjectProgress;
