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

type ReporterOptionsProps = {
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

function ReporterOptions({ form, members }: ReporterOptionsProps) {
  const value = form.values.reporter;

  const data = members.map((member) => ({
    icon: (
      <Avatar radius="xl" size="sm" color="violet.7">
        {getInitials(member.firstName, member.lastName)}
      </Avatar>
    ),
    label: `${member.firstName} ${member.lastName}`,
    value: member._id,
  }));

  return (
    <Select
      label="Reporter"
      withAsterisk
      itemComponent={SelectItem}
      data={data}
      {...form.getInputProps('reporter')}
      icon={data.find((item) => item.value === value)?.icon}
      mb={10}
    />
  );
}

export default ReporterOptions;
