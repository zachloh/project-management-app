import { Text } from '@mantine/core';
import React from 'react';

type FormTitlesProps = {
  active: number;
};

function FormTitles({ active }: FormTitlesProps) {
  return (
    <>
      <Text color="dark.4" weight={700} size={32} mb={20}>
        Welcome, John Doe!
      </Text>
      {active === 0 && (
        <Text weight={500} size={20} mb={30}>
          Let&apos;s create your organization.
        </Text>
      )}
      {active === 1 && (
        <Text weight={500} size={20} mb={30}>
          Let&apos;s create your first project.
        </Text>
      )}
    </>
  );
}

export default FormTitles;
