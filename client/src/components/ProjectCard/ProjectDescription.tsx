import { Box, Text } from '@mantine/core';
import React from 'react';

type ProjectDescriptionProps = {
  large?: boolean;
  description: string;
};

function ProjectDescription({ large, description }: ProjectDescriptionProps) {
  return (
    <Box mt={8} mb={30} mih={large ? 140 : 70}>
      <Text lineClamp={large ? 6 : 3} color="dark.3" pt={large ? 10 : 0}>
        {description}
      </Text>
    </Box>
  );
}

export default ProjectDescription;
