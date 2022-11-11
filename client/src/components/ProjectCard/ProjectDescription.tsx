import { Box, Text } from '@mantine/core';
import React from 'react';

type ProjectDescriptionProps = {
  large?: boolean;
  description: string;
};

function ProjectDescription({ large, description }: ProjectDescriptionProps) {
  return (
    <Box sx={{ height: large ? '200px' : '100px', marginTop: '0.5rem' }}>
      <Text lineClamp={large ? 6 : 3} color="dark.3" pt={large ? 12 : 0}>
        {description}
      </Text>
    </Box>
  );
}

export default ProjectDescription;
