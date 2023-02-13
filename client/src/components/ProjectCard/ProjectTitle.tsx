import { Anchor, Title } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

type ProjectTitleProps = {
  large?: boolean;
  title: string;
  projectId: string;
};

function ProjectTitle({ large, title, projectId }: ProjectTitleProps) {
  return (
    <Anchor component={Link} to={`/projects/${projectId}`} color="dark" mt={-5}>
      <Title order={large ? 2 : 3} size={large ? 20 : 18}>
        {title}
      </Title>
    </Anchor>
  );
}

export default ProjectTitle;
