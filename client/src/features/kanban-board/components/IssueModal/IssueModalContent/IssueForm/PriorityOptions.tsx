import { Group, Select, Text } from '@mantine/core';
import { UseFormReturnType } from '@mantine/form';
import React, { forwardRef } from 'react';

import {
  LowPriorityIcon,
  MediumPriorityIcon,
  HighPriorityIcon,
} from 'assets/icons';

import { FormValues } from './types';

const data = [
  {
    icon: <LowPriorityIcon />,
    label: 'Low',
    value: 'low',
  },
  {
    icon: <MediumPriorityIcon />,
    label: 'Medium',
    value: 'medium',
  },
  {
    icon: <HighPriorityIcon />,
    label: 'High',
    value: 'high',
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

function PriorityOptions({ form }: { form: UseFormReturnType<FormValues> }) {
  return (
    <Select
      label="Priority"
      withAsterisk
      itemComponent={SelectItem}
      data={data}
      {...form.getInputProps('priority')}
    />
  );
}

export default PriorityOptions;
