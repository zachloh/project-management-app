import { Indicator } from '@mantine/core';
import { DatePicker } from '@mantine/dates';
import { UseFormReturnType } from '@mantine/form';
import { useMediaQuery } from '@mantine/hooks';
import dayjs from 'dayjs';
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
      renderDay={(date) => {
        const day = date.getDate();
        return (
          <Indicator
            size={6}
            color="red"
            offset={8}
            disabled={!dayjs(date).isSame(dayjs(), 'day')}
          >
            <div>{day}</div>
          </Indicator>
        );
      }}
      mb={20}
    />
  );
}

export default DueDateInput;
