import { Timeline, Text, Anchor, Button, Stack, Card } from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Pencil } from 'tabler-icons-react';

import { useGetProjectHistory } from 'api/projects/getProjectHistory';
import { ProjectHistory as ProjectHistoryType } from 'types';

type ProjectHistoryProps = {
  projectId: string | undefined;
};

dayjs.extend(relativeTime);

const bulletIcons: Record<ProjectHistoryType['mutation'], React.ReactNode> = {
  create: <Plus size={12} />,
  delete: <Minus size={12} />,
  update: <Pencil size={12} />,
};

function ProjectHistory({ projectId }: ProjectHistoryProps) {
  const {
    data,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    isLoading,
    isError,
  } = useGetProjectHistory(projectId);

  // TODO: Add loader/skeleton
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: Add error component
  if (isError) {
    return <div>Error...</div>;
  }

  // TODO: Check if its empty

  return (
    <Stack align="center" spacing={30} p="xl">
      <Timeline>
        {data.pages.map((page) =>
          page.data.map((history) => (
            <Timeline.Item
              key={history._id}
              bullet={bulletIcons[history.mutation]}
              active
              lineActive
            >
              <Card withBorder bg="gray.0" p="sm">
                <Text>
                  <Text span weight={700}>
                    {history.user}
                  </Text>
                  {` ${history.mutation}d an issue: `}
                  {!history.isDeleted && (
                    <Anchor
                      component={Link}
                      to={
                        projectId
                          ? `/projects/${projectId}?selectedIssue=${history.issueId}`
                          : '/'
                      }
                    >
                      {history.issueTitle}
                    </Anchor>
                  )}
                  {history.isDeleted && (
                    <Text color="gray.7" span>
                      {history.issueTitle}
                    </Text>
                  )}
                  {history.mutation === 'update' && (
                    <>
                      <Text span> - </Text>
                      <Text span italic color="gray.7" transform="capitalize">
                        {history.updatedFields
                          .map((field) => {
                            if (field === 'dueDate') return 'due date';
                            return field;
                          })
                          .join(', ')}
                      </Text>
                    </>
                  )}
                </Text>
                <Text size={14} mt={4}>
                  {dayjs(history.date).fromNow()}
                </Text>
              </Card>
            </Timeline.Item>
          ))
        )}
      </Timeline>
      <Button
        size="md"
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage}
        loading={isFetchingNextPage}
      >
        Load More
      </Button>
    </Stack>
  );
}

export default ProjectHistory;
