import { DatePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import React from 'react';
import { Calendar } from 'tabler-icons-react';

import { FormValues } from './types';

function DueDateInput({ form }: { form: UseFormReturnType<FormValues> }) {
  const isMobile = useMediaQuery('(max-width: 425px)');

  return (
    <DatePicker
      label="Due date"
      placeholder="None"
      icon={<Calendar size={16} />}
      {...form.getInputProps('dueDate')}
      dropdownType={isMobile ? 'modal' : 'popover'}
      mb={30}
    />
  );
}

export default DueDateInput;
