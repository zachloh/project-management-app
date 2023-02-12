import { useDebouncedValue } from '@mantine/hooks';
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import {
  SourceOrDestination,
  useUpdateIssueStatus,
} from 'api/issues/updateIssueStatus';
import { useGetProject } from 'api/projects/getProject';
import MainHeading from 'components/MainHeading';
import { useUser } from 'hooks/useUser';
import { Issue } from 'types';

import IssueModal from '../IssueModal';
import IssuesFilter from '../IssuesFilter';
import KanbanCard from '../KanbanCard';
import styles from './KanbanBoard.module.css';

export function KanbanBoard() {
  const { projectId } = useParams();

  const { user } = useUser();

  const { data: project, isLoading, isError } = useGetProject(projectId);

  const updateIssueStatusMutation = useUpdateIssueStatus(project?._id || '');

  const [titleFilter, setTitleFilter] = useState('');
  const [debouncedTitleFilter] = useDebouncedValue(titleFilter, 350);
  const [filteredAssignees, setFilteredAssignees] = useState<string[]>([]);

  const filterIssues = (issues: Issue[]) => {
    if (titleFilter.length === 0 && filteredAssignees.length === 0) {
      return issues;
    }

    let filteredIssues = [...issues];

    if (filteredAssignees.length > 0) {
      filteredIssues = filteredIssues.filter((issue) => {
        if (!issue.assignee) {
          return false;
        }
        return filteredAssignees.includes(issue.assignee);
      });
    }

    if (debouncedTitleFilter.length > 0) {
      filteredIssues = filteredIssues.filter((issue) =>
        issue.title
          .toLowerCase()
          .includes(debouncedTitleFilter.toLowerCase().trim())
      );
    }

    return filteredIssues;
  };

  const onDragEnd = (result: DropResult) => {
    const { draggableId: issueId, source, destination } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    updateIssueStatusMutation.mutate({
      issueId,
      source: source.droppableId as SourceOrDestination,
      sourceIndex: source.index,
      destination: destination.droppableId as SourceOrDestination,
      destinationIndex: destination.index,
    });
  };

  // TODO: Add skeleton
  if (isLoading) {
    return <div>Loading...</div>;
  }

  // TODO: Add error component
  if (isError) {
    return <div>Error...</div>;
  }

  return (
    <>
      <MainHeading title={project.name} />
      <IssuesFilter
        titleFilter={titleFilter}
        setTitleFilter={setTitleFilter}
        filteredAssignees={filteredAssignees}
        setFilteredAssignees={setFilteredAssignees}
        members={project.members}
      />
      <DragDropContext onDragEnd={onDragEnd}>
        <div className={styles.container}>
          <IssueModal members={project.members} orgId={user.org?._id} />
          <KanbanCard
            title="TO DO"
            issues={filterIssues(project.todoIssues)}
            id="todoIssues"
            projectId={project._id}
            userId={user._id}
            members={project.members}
            orgId={user.org?._id}
          />
          <KanbanCard
            title="IN PROGRESS"
            issues={filterIssues(project.inProgressIssues)}
            id="inProgressIssues"
            projectId={project._id}
            userId={user._id}
            members={project.members}
            orgId={user.org?._id}
          />
          <KanbanCard
            title="IN REVIEW"
            issues={filterIssues(project.inReviewIssues)}
            id="inReviewIssues"
            projectId={project._id}
            userId={user._id}
            members={project.members}
            orgId={user.org?._id}
          />
          <KanbanCard
            title="DONE"
            issues={filterIssues(project.completedIssues)}
            id="completedIssues"
            projectId={project._id}
            userId={user._id}
            members={project.members}
            orgId={user.org?._id}
          />
        </div>
      </DragDropContext>
    </>
  );
}
