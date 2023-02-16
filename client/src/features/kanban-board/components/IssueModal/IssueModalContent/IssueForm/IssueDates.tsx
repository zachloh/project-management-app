import { Stack, Text } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

type IssueDatesProps = {
  createdAt: string;
  updatedAt: string;
  completedAt: string | undefined;
};

function IssueDates({ createdAt, updatedAt, completedAt }: IssueDatesProps) {
  return (
    <Stack mih={65} spacing={0} justify="center">
      <Text size="sm" color="dark.3" fw={700}>
        {`Created: ${dayjs(createdAt).format('D MMM YYYY')}`}
      </Text>
      <Text size="sm" color="dark.3" fw={700}>
        {`Updated: ${dayjs(updatedAt).format('D MMM YYYY')}`}
      </Text>
      {completedAt && (
        <Text size="sm" color="dark.3" fw={700}>
          {`Completed: ${dayjs(completedAt).format('D MMM YYYY')}`}
        </Text>
      )}
    </Stack>
  );
}

export default IssueDates;
