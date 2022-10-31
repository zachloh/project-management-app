import { Group, Avatar } from '@mantine/core';
import React from 'react';

function ProjectTitle() {
  return (
    <Group position="apart">
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>Project 1</h3>
      <Avatar radius="xl" size="md" />
    </Group>
  );
}

export default ProjectTitle;
