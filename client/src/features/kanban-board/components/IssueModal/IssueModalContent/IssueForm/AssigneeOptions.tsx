import { Avatar, Group, Text, Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { forwardRef } from 'react';

import { FormValues } from './types';

// TODO: Get members of a project
const data = [
  {
    icon: (
      <Avatar radius="xl" size="sm">
        JD
      </Avatar>
    ),
    label: 'John Doe',
    value: '636a106ba2bf04ba0bea7a60',
  },
];

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.ReactNode;
  label: string;
}

const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
  ({ icon, label, ...rest }: ItemProps, ref) => (
    <div ref={ref} {...rest}>
      <Group noWrap spacing={12}>
        {icon}
        <Text>{label}</Text>
      </Group>
    </div>
  )
);

function AssigneeOptions({ form }: { form: UseFormReturnType<FormValues> }) {
  const value = form.values.assignee;

  return (
    <Select
      label="Assignee"
      itemComponent={SelectItem}
      data={data}
      {...form.getInputProps('assignee')}
      icon={data.find((item) => item.value === value)?.icon}
      placeholder="Unassigned"
      clearable
      mb={10}
    />
  );
}

export default AssigneeOptions;
