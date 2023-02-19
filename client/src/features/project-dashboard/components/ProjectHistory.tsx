import {
  Timeline,
  Text,
  Anchor,
  Button,
  Stack,
  Card,
  Skeleton,
  Box,
  Group,
} from '@mantine/core';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import React from 'react';
import { Link } from 'react-router-dom';
import { Plus, Minus, Pencil, History } from 'tabler-icons-react';

import { useGetProjectHistory } from 'api/projects/getProjectHistory';
import FailedToLoad from 'components/FailedToLoad';
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

  if (isLoading) {
    return (
      <Box p={24}>
        <Group noWrap align="flex-start" position="center" mb={24}>
          <Skeleton height={20} circle />
          <Skeleton height={75} maw={330} radius={4} />
        </Group>
        <Group noWrap align="flex-start" position="center">
          <Skeleton height={20} circle />
          <Skeleton height={75} maw={330} radius={4} />
        </Group>
      </Box>
    );
  }

  if (isError) {
    return <FailedToLoad />;
  }

  if (data.pages[0].data.length === 0) {
    return (
      <Stack align="center" spacing={10} py={40}>
        <History color="#5C5F66" size={24} />
        <Text align="center" weight={600} color="dark.3" px={10}>
          This project has no history
        </Text>
      </Stack>
    );
  }

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
