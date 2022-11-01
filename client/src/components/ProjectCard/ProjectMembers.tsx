import { Tooltip, Avatar } from '@mantine/core';
import React from 'react';

const projectMembers = ['John Doe', 'Jane Smith', 'Joe Bloggs'];

function ProjectMembers() {
  return (
    <Tooltip.Group>
      <Avatar.Group spacing="sm">
        {projectMembers.map((member) => (
          <Tooltip key={member} label={member} withArrow>
            <Avatar radius="xl" color="indigo" />
          </Tooltip>
        ))}
      </Avatar.Group>
    </Tooltip.Group>
  );
}

export default ProjectMembers;
