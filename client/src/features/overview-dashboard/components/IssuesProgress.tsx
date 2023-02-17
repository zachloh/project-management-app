import { MediaQuery, RingProgress, Stack, Text } from '@mantine/core';
import React from 'react';

import { Project, PopulatedIssue } from 'types';

type IssuesProgressProps = {
  projects: Project<PopulatedIssue>[];
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
    <Stack
      align="center"
      spacing={0}
      pt={5}
      sx={{
        '@media (min-width: 426px)': {
          height: 320,
          paddingTop: 15,
        },
      }}
    >
      <MediaQuery largerThan={426} styles={{ display: 'none' }}>
        <RingProgress
          sections={[
            {
              value:
                totalCreatedIssues === 0
                  ? 100
                  : 100 - (totalCompletedIssues / totalCreatedIssues) * 100,
              color: 'gray.1',
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
          size={200}
          roundCaps={totalCompletedIssues > 0}
          thickness={16}
          label={
            <Text size={36} align="center" color="violet" weight="700">
              {`${
                totalCreatedIssues === 0
                  ? 0
                  : Math.round(
                      (totalCompletedIssues / totalCreatedIssues) * 100
                    )
              }%`}
            </Text>
          }
        />
      </MediaQuery>
      <MediaQuery smallerThan={426} styles={{ display: 'none' }}>
        <RingProgress
          sections={[
            {
              value:
                totalCreatedIssues === 0
                  ? 100
                  : 100 - (totalCompletedIssues / totalCreatedIssues) * 100,
              color: 'gray.1',
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
          size={250}
          roundCaps={totalCompletedIssues > 0}
          thickness={20}
          label={
            <Text size={44} align="center" color="violet" weight="700">
              {`${
                totalCreatedIssues === 0
                  ? 0
                  : Math.round(
                      (totalCompletedIssues / totalCreatedIssues) * 100
                    )
              }%`}
            </Text>
          }
        />
      </MediaQuery>
      <Text
        size={16}
        align="center"
        color="dark.4"
        weight="700"
        mt={10}
        sx={{
          '@media (min-width: 426px)': {
            fontSize: 18,
          },
        }}
      >
        {`Completed issues: ${totalCompletedIssues} / ${totalCreatedIssues}`}
      </Text>
    </Stack>
  );
}

export default IssuesProgress;
