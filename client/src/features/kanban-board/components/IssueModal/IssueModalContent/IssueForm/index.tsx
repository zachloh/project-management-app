import { Button } from '@mantine/core';
import { useForm } from '@mantine/form';
import React from 'react';

import { Issue } from 'types';

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
  issue: Issue;
  onCloseModal: () => void;
};

function IssueForm({ issue, onCloseModal }: IssueFormProps) {
  const form = useForm<FormValues>({
    initialValues: {
      title: issue.title,
      description: issue.description || '',
      type: issue.type,
      status: issue.status,
      priority: issue.priority,
      assignee: issue.assignee || null,
      reporter: issue.reporter,
      dueDate: issue.dueDate ? new Date(issue.dueDate) : null,
    },
    validate: {
      title: (value) =>
        value.trim().length === 0 ? 'Title cannot be empty' : null,
      description: (value) =>
        value && !value.trim()
          ? 'Description cannot contain only blank spaces'
          : null,
    },
  });

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
        <IssueDates
          createdAt={issue.createdAt}
          updatedAt={issue.updatedAt}
          completedAt={issue.completedAt}
        />
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
