import React from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import { useGetProject } from 'api/getProject';
import {
  SourceOrDestination,
  useUpdateIssueStatus,
} from 'api/updateIssueStatus';

import IssueModal from './IssueModal';
import styles from './KanbanBoard.module.css';
import KanbanCard from './KanbanCard';

export function KanbanBoard() {
  const { projectId } = useParams();

  const { data: project, isLoading, isError } = useGetProject(projectId);

  const updateIssueStatusMutation = useUpdateIssueStatus(project?._id || '');

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
    <DragDropContext onDragEnd={onDragEnd}>
      <div className={styles.container}>
        <IssueModal />
        <KanbanCard title="TO DO" issues={project.todoIssues} id="todoIssues" />
        <KanbanCard
          title="IN PROGRESS"
          issues={project.inProgressIssues}
          id="inProgressIssues"
        />
        <KanbanCard
          title="IN REVIEW"
          issues={project.inReviewIssues}
          id="inReviewIssues"
        />
        <KanbanCard
          title="DONE"
          issues={project.completedIssues}
          id="completedIssues"
        />
      </div>
    </DragDropContext>
  );
}
