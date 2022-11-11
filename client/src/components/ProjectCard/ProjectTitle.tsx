import { Group, Anchor, Avatar } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

type ProjectTitleProps = {
  title: string;
};

function ProjectTitle({ title }: ProjectTitleProps) {
  return (
    <Group position="apart">
      {/* TODO: Change path */}
      <Anchor component={Link} to="/" color="dark">
        <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{title}</h3>
      </Anchor>
      <Avatar radius="xl" size="md" />
    </Group>
  );
}

export default ProjectTitle;
