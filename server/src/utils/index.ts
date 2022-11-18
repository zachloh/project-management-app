import dayjs from 'dayjs';

import { PopulatedIssue, PopulatedProject } from 'types/mongoose';

const filterCreatedIssues = (issues: PopulatedIssue[]) => {
  const issuesLast7Days: Record<string, number> = {};
  const startDate = dayjs().subtract(6, 'day');
  issues.forEach((issue) => {
    if (dayjs(issue.createdAt).isBefore(startDate, 'day')) return;

    let j = 6;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      if (dayjs(issue.createdAt).isSame(dayjs().subtract(i, 'day'), 'day')) {
        issuesLast7Days[j] = (issuesLast7Days[j] || 0) + 1;
        break;
      }
      j -= 1;
    }
  });

  return issuesLast7Days;
};

const filterCompletedIssues = (issues: PopulatedIssue[]) => {
  const issuesLast7Days: Record<string, number> = {};
  const startDate = dayjs().subtract(6, 'day');
  issues.forEach((issue) => {
    if (
      !issue.completedAt ||
      dayjs(issue.completedAt).isBefore(startDate, 'day')
    ) {
      return;
    }

    let j = 6;
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < 7; i++) {
      if (dayjs(issue.completedAt).isSame(dayjs().subtract(i, 'day'), 'day')) {
        issuesLast7Days[j] = (issuesLast7Days[j] || 0) + 1;
        break;
      }
      j -= 1;
    }
  });

  return issuesLast7Days;
};

const sumObjectsByKey = (...objs: Record<string, number>[]) => {
  const summedData: Record<string, number> = {};
  objs.forEach((obj) => {
    Object.entries(obj).forEach(([prop, num]) => {
      summedData[prop] = (summedData[prop] || 0) + num;
    });
  });
  return summedData;
};

export const getIssuesLast7Days = (projects: PopulatedProject[]) => {
  let createdIssuesLast7DaysObj: Record<string, number> = {};
  let completedIssuesLast7DaysObj: Record<string, number> = {};

  projects.forEach((project) => {
    const filteredTodoIssues = filterCreatedIssues(project.todoIssues);
    const filteredInProgressIssues = filterCreatedIssues(
      project.inProgressIssues
    );
    const filteredInReviewIssues = filterCreatedIssues(project.inReviewIssues);
    const filteredCompletedIssues = filterCreatedIssues(
      project.completedIssues
    );
    createdIssuesLast7DaysObj = sumObjectsByKey(
      createdIssuesLast7DaysObj,
      filteredTodoIssues,
      filteredInProgressIssues,
      filteredInReviewIssues,
      filteredCompletedIssues
    );
    completedIssuesLast7DaysObj = sumObjectsByKey(
      completedIssuesLast7DaysObj,
      filterCompletedIssues(project.completedIssues)
    );
  });

  const createdIssuesLast7Days = [];
  const completedIssuesLast7Days = [];
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 7; i++) {
    createdIssuesLast7Days[i] = createdIssuesLast7DaysObj[i] || 0;
    completedIssuesLast7Days[i] = completedIssuesLast7DaysObj[i] || 0;
  }

  return {
    createdIssuesLast7Days,
    completedIssuesLast7Days,
  };
};
