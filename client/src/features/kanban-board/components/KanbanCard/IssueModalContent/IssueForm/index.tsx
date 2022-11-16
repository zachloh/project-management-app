import { Select, Textarea, TextInput } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import styles from './IssueForm.module.css';

function IssueForm() {
  const form = useForm({
    initialValues: {
      title: 'Test title',
      description: 'Test description',
    },
  });

  return (
    <form className={styles.container}>
      <div>
        <TextInput
          label="Title"
          styles={{
            label: {
              fontWeight: 700,
            },
          }}
          {...form.getInputProps('title')}
        />
        <Textarea
          label="Description"
          styles={{
            label: {
              fontWeight: 700,
            },
          }}
          {...form.getInputProps('description')}
        />
      </div>
      <div>
        <Select
          label="Type"
          data={[
            { value: 'to do', label: 'TO DO' },
            { value: 'in progress', label: 'IN PROGRESS' },
            { value: 'in review', label: 'IN REVIEW' },
            { value: 'done', label: 'DONE' },
          ]}
        />
      </div>
    </form>
  );
}

export default IssueForm;
