import { useDebouncedValue } from '@mantine/hooks';
import React, { useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import {
  SourceOrDestination,
  useUpdateIssueStatus,
} from 'api/issues/updateIssueStatus';
import { useGetProject } from 'api/projects/getProject';
import { useGetUser } from 'api/users/getUser';
import MainHeading from 'components/MainHeading';
import { Issue } from 'types';

import IssueModal from '../IssueModal';
import IssuesFilter from '../IssuesFilter';
import KanbanCard from '../KanbanCard';
import styles from './KanbanBoard.module.css';

export function KanbanBoard() {
  const { projectId } = useParams();

  const {
    data: user,
    isLoading: isLoadingUser,
    isError: isUserError,
  } = useGetUser();

  const {
    data: project,
    isLoading: isLoadingProject,
    isError: isProjectError,
  } = useGetProject(projectId);

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
        issue.title.toLowerCase().includes(debouncedTitleFilter.toLowerCase())
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
  if (isLoadingUser || isLoadingProject) {
    return <div>Loading...</div>;
  }

  // TODO: Add error component
  if (isUserError || isProjectError || !user) {
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
          <IssueModal members={project.members} />
          <KanbanCard
            title="TO DO"
            issues={filterIssues(project.todoIssues)}
            id="todoIssues"
            projectId={project._id}
            userId={user._id}
            members={project.members}
          />
          <KanbanCard
            title="IN PROGRESS"
            issues={filterIssues(project.inProgressIssues)}
            id="inProgressIssues"
            projectId={project._id}
            userId={user._id}
            members={project.members}
          />
          <KanbanCard
            title="IN REVIEW"
            issues={filterIssues(project.inReviewIssues)}
            id="inReviewIssues"
            projectId={project._id}
            userId={user._id}
            members={project.members}
          />
          <KanbanCard
            title="DONE"
            issues={filterIssues(project.completedIssues)}
            id="completedIssues"
            projectId={project._id}
            userId={user._id}
            members={project.members}
          />
        </div>
      </DragDropContext>
    </>
  );
}
