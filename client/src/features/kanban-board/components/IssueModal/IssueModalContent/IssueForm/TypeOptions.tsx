import { Group, Select, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { forwardRef } from 'react';

import { BugIcon, StoryIcon, TaskIcon } from 'assets/icons';

import { FormValues } from './types';

const data = [
  {
    icon: <TaskIcon />,
    label: 'Task',
    value: 'task',
  },
  {
    icon: <StoryIcon />,
    label: 'Story',
    value: 'story',
  },
  {
    icon: <BugIcon />,
    label: 'Bug',
    value: 'bug',
  },
];

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.ReactNode;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ icon, label, ...rest }: ItemProps, ref) => (
    <div ref={ref} {...rest}>
      <Group noWrap spacing={4}>
        {icon}
        <Text>{label}</Text>
      </Group>
    </div>
  )
);

function TypeOptions({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <Select
      label="Type"
      withAsterisk
      itemComponent={SelectItem}
      data={data}
      {...form.getInputProps('type')}
    />
  );
}

export default TypeOptions;
