import { Text } from '@mantine/core';
import dayjs from 'dayjs';
import React from 'react';

type IssueDatesProps = {
  createdAt: string;
  updatedAt: string;
  completedAt: string | undefined;
};

function IssueDates({ createdAt, updatedAt, completedAt }: IssueDatesProps) {
  return (
    <>
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
    </>
  );
}

export default IssueDates;
