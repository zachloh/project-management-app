import { Project } from 'types';

export const getIssueTypes = (project: Project) => {
  const { todoIssues, inProgressIssues, inReviewIssues, completedIssues } =
    project;
  const allIssues = todoIssues.concat(
    inProgressIssues,
    inReviewIssues,
    completedIssues
  );

  let tasks = 0;
  let stories = 0;
  let bugs = 0;

  allIssues.forEach((issue) => {
    switch (issue.type) {
      case 'task':
        tasks += 1;
        break;
      case 'story':
        stories += 1;
        break;
      case 'bug':
        bugs += 1;
        break;
      default:
    }
  });

  return { tasks, stories, bugs };
};
