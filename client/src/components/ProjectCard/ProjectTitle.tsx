import { Anchor } from '@mantine/core';
import React from 'react';
import { Link } from 'react-router-dom';

type ProjectTitleProps = {
  title: string;
  projectId: string;
};

function ProjectTitle({ title, projectId }: ProjectTitleProps) {
  return (
    <Anchor component={Link} to={`/projects/${projectId}`} color="dark">
      <h3 style={{ fontSize: '1.1rem', fontWeight: '700' }}>{title}</h3>
    </Anchor>
  );
}

export default ProjectTitle;
