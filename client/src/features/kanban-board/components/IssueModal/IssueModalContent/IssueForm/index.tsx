import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { useGetIssue } from 'api/getIssue';

import AssigneeOptions from './AssigneeOptions';
import DescriptionInput from './DescriptionInput';
import DueDateInput from './DueDateInput';
import IssueDates from './IssueDates';
import styles from './IssueForm.module.css';
import PriorityOptions from './PriorityOptions';
import ReporterOptions from './ReporterOptions';
import StatusOptions from './StatusOptions';
import TitleInput from './TitleInput';
import TypeOptions from './TypeOptions';
import { FormValues } from './types';

type IssueFormProps = {
  selectedIssue: string;
  onCloseModal: () => void;
};

function IssueForm({ selectedIssue, onCloseModal }: IssueFormProps) {
  const { data: issue, isLoading } = useGetIssue(selectedIssue);

  const form = useForm<FormValues>({
    initialValues: {
      title: 'Test title',
      description: 'Test description',
      type: 'story',
      status: 'to do',
      priority: 'low',
      assignee: null,
      reporter: '636a106ba2bf04ba0bea7a60',
      dueDate: null,
    },
  });

  // TODO: Add skeleton
  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      className={styles.container}
      onSubmit={form.onSubmit((values) => console.log(values))}
    >
      <div>
        <TitleInput form={form} />
        <DescriptionInput form={form} />
        <div className={styles.options}>
          <TypeOptions form={form} />
          <StatusOptions form={form} />
          <PriorityOptions form={form} />
        </div>
      </div>
      <div>
        <AssigneeOptions form={form} />
        <ReporterOptions form={form} />
        <DueDateInput form={form} />
        <IssueDates />
        <div className={styles.buttons}>
          <Button variant="outline" onClick={onCloseModal}>
            Cancel
          </Button>
          <Button type="submit" variant="filled" disabled={!form.isDirty()}>
            Update
          </Button>
        </div>
      </div>
    </form>
  );
}

export default IssueForm;
