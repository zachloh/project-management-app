import { RingProgress, Text } from '@mantine/core';
import React from 'react';

import { Project } from '../types';

type IssuesProgressProps = {
  projects: Project[];
};

function IssuesProgress({ projects }: IssuesProgressProps) {
  let totalCreatedIssues = 0;
  let totalCompletedIssues = 0;

  projects.forEach((project) => {
    totalCreatedIssues +=
      project.todoIssues.length +
      project.inProgressIssues.length +
      project.inReviewIssues.length +
      project.completedIssues.length;
    totalCompletedIssues += project.completedIssues.length;
  });

  return (
    <div style={{ display: 'grid' }}>
      <RingProgress
        sections={[
          {
            value: 100 - (totalCompletedIssues / totalCreatedIssues) * 100,
            color: 'gray.2',
            tooltip: `Created issues: ${totalCreatedIssues}`,
          },
          {
            value: (totalCompletedIssues / totalCreatedIssues) * 100,
            color: 'violet',
            tooltip: `Completed issues: ${totalCompletedIssues}`,
          },
        ]}
        size={200}
        roundCaps
        thickness={16}
        label={
          // eslint-disable-next-line react/jsx-wrap-multilines
          <Text size={36} align="center" color="violet" weight="700">
            {`${(totalCompletedIssues / totalCreatedIssues) * 100}%`}
          </Text>
        }
        sx={{ placeSelf: 'center' }}
      />
      <Text align="center" color="dark.4" weight="700">
        {`${
          (totalCompletedIssues / totalCreatedIssues) * 100
        }% of ${totalCreatedIssues} issues completed`}
      </Text>
    </div>
  );
}

export default IssuesProgress;
