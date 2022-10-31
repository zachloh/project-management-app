import { Box, Text } from '@mantine/core';
import React from 'react';

function ProjectDescription() {
  return (
    <Box sx={{ height: '100px', marginTop: '0.5rem' }}>
      <Text lineClamp={3} color="dark.3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit.
      </Text>
    </Box>
  );
}

export default ProjectDescription;
