import { Card, Badge, Divider } from '@mantine/core';
import React from 'react';

import ProjectDescription from './ProjectDescription';
import ProjectMembers from './ProjectMembers';
import ProjectProgress from './ProjectProgress';
import ProjectTitle from './ProjectTitle';

function ProjectCard() {
  return (
    <Card shadow="sm" p="sm" radius="md" withBorder>
      <ProjectTitle />
      <ProjectMembers />
      <ProjectDescription />
      <Badge color="violet" size="lg">
        Software
      </Badge>
      <Divider my="md" />
      <ProjectProgress />
    </Card>
  );
}

export default ProjectCard;
