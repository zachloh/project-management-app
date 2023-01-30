import { Avatar, Group, Text, Select } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { forwardRef } from 'react';

import { User } from 'types';
import { getInitials } from 'utils/getInitials';

import { FormValues } from './types';

interface ItemProps extends React.ComponentPropsWithoutRef<'div'> {
  icon: React.ReactNode;
  label: string;
}

type AssigneeOptionsProps = {
  form: UseFormReturnType<FormValues>;
  members: User<string>[];
};

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

function AssigneeOptions({ form, members }: AssigneeOptionsProps) {
  const value = form.values.assignee;

  const data = members.map((member) => ({
    icon: (
      <Avatar radius="xl" size="sm" color="violet">
        {getInitials(member.firstName, member.lastName)}
      </Avatar>
    ),
    label: `${member.firstName} ${member.lastName}`,
    value: member._id,
  }));

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
