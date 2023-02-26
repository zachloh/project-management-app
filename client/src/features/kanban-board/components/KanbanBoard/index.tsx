import { useDebouncedValue } from '@mantine/hooks';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import { useParams } from 'react-router-dom';

import {
  SourceOrDestination,
  useUpdateIssueStatus,
} from 'api/issues/updateIssueStatus';
import { useGetProject } from 'api/projects/getProject';
import MainHeading from 'components/MainHeading';
import NotFound from 'components/NotFound';
import { useUser } from 'hooks/useUser';
import { Issue, Project } from 'types';

import IssueModal from '../IssueModal';
import IssuesFilter from '../IssuesFilter';
import KanbanCard from '../KanbanCard';
import PageSkeleton from '../PageSkeleton';
import styles from './KanbanBoard.module.css';

export function KanbanBoard() {
  const { projectId } = useParams();

  const { user } = useUser();

  const { data, isLoading, isError, isSuccess } = useGetProject(
    projectId,
    user._id
  );

  const [project, setProject] = useState<Project>(
    data || {
      _id: '',
      name: '',
      members: [],
      description: '',
      category: 'business',
      todoIssues: [],
      inReviewIssues: [],
      inProgressIssues: [],
      completedIssues: [],
    }
  );
  const [isProjectLoaded, setIsProjectLoaded] = useState(false);

  const updateIssueStatusMutation = useUpdateIssueStatus(project?._id || '');

  const [titleFilter, setTitleFilter] = useState('');
  const [debouncedTitleFilter] = useDebouncedValue(titleFilter, 350);
  const [filteredAssignees, setFilteredAssignees] = useState<string[]>([]);

  /*
  Anti-pattern in React Query, but required for dnd to work:
  https://github.com/hello-pangea/dnd/issues/424
  */
  useEffect(() => {
    if (isSuccess) {
      setProject(data);
      setIsProjectLoaded(true);
    }
  }, [data, isSuccess]);

  useLayoutEffect(() => {
    setTitleFilter('');
    setFilteredAssignees([]);
  }, [projectId]);

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

    setProject((prev) => {
      const copiedSourceIssues = [
        ...prev[source.droppableId as SourceOrDestination],
      ];
      const updatedIssue = copiedSourceIssues[source.index];

      if (source.droppableId === destination.droppableId) {
        copiedSourceIssues.splice(source.index, 1);
        copiedSourceIssues.splice(destination.index, 0, updatedIssue);
        return {
          ...prev,
          [source.droppableId]: copiedSourceIssues,
        };
      }

      const copiedDestinationIssues = [
        ...prev[destination.droppableId as SourceOrDestination],
      ];
      copiedSourceIssues.splice(source.index, 1);
      copiedDestinationIssues.splice(destination.index, 0, updatedIssue);
      return {
        ...prev,
        [source.droppableId]: copiedSourceIssues,
        [destination.droppableId]: copiedDestinationIssues,
      };
    });
  };

  if (isLoading) {
    return <PageSkeleton />;
  }

  if (isError) {
    return <NotFound />;
  }

  if (isSuccess && !isProjectLoaded) {
    return <PageSkeleton />;
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
          <IssueModal
            members={project.members}
            orgId={user.org?._id}
            projectId={projectId || ''}
          />
          <KanbanCard
            title="TO DO"
            issues={filterIssues(project.todoIssues)}
            id="todoIssues"
            projectId={projectId}
            userId={user._id}
            members={project.members}
            orgId={user.org?._id}
            isDemoUser={user.isDemo || false}
          />
          <KanbanCard
            title="IN PROGRESS"
            issues={filterIssues(project.inProgressIssues)}
            id="inProgressIssues"
            projectId={projectId}
            userId={user._id}
            members={project.members}
            orgId={user.org?._id}
            isDemoUser={user.isDemo || false}
          />
          <KanbanCard
            title="IN REVIEW"
            issues={filterIssues(project.inReviewIssues)}
            id="inReviewIssues"
            projectId={projectId}
            userId={user._id}
            members={project.members}
            orgId={user.org?._id}
            isDemoUser={user.isDemo || false}
          />
          <KanbanCard
            title="DONE"
            issues={filterIssues(project.completedIssues)}
            id="completedIssues"
            projectId={projectId}
            userId={user._id}
            members={project.members}
            orgId={user.org?._id}
            isDemoUser={user.isDemo || false}
          />
        </div>
      </DragDropContext>
    </>
  );
}
