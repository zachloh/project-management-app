import { Loader as MantineLoader } from '@mantine/core';
import React from 'react';

function Loader() {
  return (
    <MantineLoader
      size="xl"
      variant="dots"
      sx={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
      }}
    />
  );
}

export default Loader;
