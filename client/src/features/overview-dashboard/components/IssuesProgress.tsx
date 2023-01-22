import { RingProgress, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';

import { Project, PopulatedIssue } from 'types';

type IssuesProgressProps = {
  projects: Project<PopulatedIssue>[];
};

function IssuesProgress({ projects }: IssuesProgressProps) {
  const isMobile = useMediaQuery('(max-width: 425px)');

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
    <Stack
      align="center"
      h={isMobile ? 'auto' : 320}
      spacing={0}
      pt={isMobile ? 5 : 15}
    >
      <RingProgress
        sections={[
          {
            value:
              totalCreatedIssues === 0
                ? 100
                : 100 - (totalCompletedIssues / totalCreatedIssues) * 100,
            color: 'gray.2',
            tooltip: `Created issues: ${totalCreatedIssues}`,
          },
          {
            value:
              totalCreatedIssues === 0
                ? 0
                : (totalCompletedIssues / totalCreatedIssues) * 100,
            color: 'violet',
            tooltip: `Completed issues: ${totalCompletedIssues}`,
          },
        ]}
        size={isMobile ? 200 : 250}
        roundCaps={totalCompletedIssues > 0}
        thickness={isMobile ? 16 : 20}
        label={
          <Text
            size={isMobile ? 36 : 44}
            align="center"
            color="violet"
            weight="700"
          >
            {`${
              totalCreatedIssues === 0
                ? 0
                : Math.round((totalCompletedIssues / totalCreatedIssues) * 100)
            }%`}
          </Text>
        }
      />
      <Text
        size={isMobile ? 16 : 18}
        align="center"
        color="dark.4"
        weight="700"
        mt={10}
      >
        {`Completed issues: ${totalCompletedIssues} / ${totalCreatedIssues}`}
      </Text>
    </Stack>
  );
}

export default IssuesProgress;
