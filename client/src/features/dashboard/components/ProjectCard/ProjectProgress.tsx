import { Progress, Grid } from '@mantine/core';
import React from 'react';
import { ClipboardCheck } from 'tabler-icons-react';

function ProjectProgress() {
  return (
    <Grid align="center">
      <Grid.Col span="content" pr={0}>
        <ClipboardCheck />
      </Grid.Col>
      <Grid.Col span="content" pl={2}>
        2/10
      </Grid.Col>
      <Grid.Col span="auto">
        <Progress
          aria-label="Project progress"
          size="md"
          sections={[
            {
              value: 20,
              color: 'indigo.5',
              tooltip: 'Completed issues: 20%',
            },
          ]}
        />
      </Grid.Col>
      <Grid.Col span="content" sx={{ color: '#5c7cfa' }}>
        20%
      </Grid.Col>
    </Grid>
  );
}

export default ProjectProgress;
