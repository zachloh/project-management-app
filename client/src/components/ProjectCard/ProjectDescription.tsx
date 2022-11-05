import { Box, Text } from '@mantine/core';
import React from 'react';

type ProjectDescriptionProps = {
  large?: boolean;
};

function ProjectDescription({ large }: ProjectDescriptionProps) {
  return (
    <Box sx={{ height: large ? '200px' : '100px', marginTop: '0.5rem' }}>
      <Text lineClamp={large ? 6 : 3} color="dark.3" pt={large ? 12 : 0}>
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
    </Box>
  );
}

export default ProjectDescription;
