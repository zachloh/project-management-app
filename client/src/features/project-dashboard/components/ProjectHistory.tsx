/* eslint-disable react/jsx-one-expression-per-line */
import { Container, Timeline, Text } from '@mantine/core';
import React from 'react';
import { Plus, Minus } from 'tabler-icons-react';

function ProjectHistory() {
  return (
    <Container p="xl">
      <Timeline color="violet" active={2} lineWidth={3}>
        <Timeline.Item bullet={<Minus size={12} />}>
          <Text span weight="bold">
            John Doe
          </Text>
          <Text color="gray.7" span>
            {' '}
            deleted an issue:{' '}
          </Text>
          <Text span variant="link" color="violet">
            PROJ-1: Todo 1
          </Text>
          <Text size="sm">2 hours ago</Text>
        </Timeline.Item>
        <Timeline.Item bullet={<Plus size={12} />}>
          <Text span weight="bold">
            John Doe
          </Text>
          <Text color="gray.7" span>
            {' '}
            created an issue:{' '}
          </Text>
          <Text span variant="link" color="violet">
            PROJ-1: Todo 1
          </Text>
          <Text size="sm">2 hours ago</Text>
        </Timeline.Item>
      </Timeline>
    </Container>
  );
}

export default ProjectHistory;
