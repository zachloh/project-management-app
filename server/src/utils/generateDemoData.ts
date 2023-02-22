import mongoose, { Types } from 'mongoose';

import env from 'config/env';
import { IIssue } from 'models/issues';
import { IOrganization } from 'models/organizations';
import { IProjectHistory } from 'models/projectHistory';
import { IProject } from 'models/projects';
import { IUser } from 'models/users';

export const generateDemoData = () => {
  const userId1 = new mongoose.Types.ObjectId();
  const userId2 = new mongoose.Types.ObjectId();
  const userId3 = new mongoose.Types.ObjectId();

  const orgId = new mongoose.Types.ObjectId();

  const projectId1 = new mongoose.Types.ObjectId();
  const projectId2 = new mongoose.Types.ObjectId();

  const issueId1 = new mongoose.Types.ObjectId();
  const issueId2 = new mongoose.Types.ObjectId();
  const issueId3 = new mongoose.Types.ObjectId();
  const issueId4 = new mongoose.Types.ObjectId();
  const issueId5 = new mongoose.Types.ObjectId();
  const issueId6 = new mongoose.Types.ObjectId();
  const issueId7 = new mongoose.Types.ObjectId();
  const issueId8 = new mongoose.Types.ObjectId();
  const issueId9 = new mongoose.Types.ObjectId();

  const users: (IUser & { _id: Types.ObjectId })[] = [
    {
      _id: userId1,
      firstName: 'John',
      lastName: 'Doe',
      email: `${userId1.toString()}@gmail.com`,
      password: env.demoData.password,
      role: 'admin',
      position: 'Staff Engineer',
      org: orgId,
      completedWelcome: true,
      isDemo: true,
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 6)),
    },
    {
      _id: userId2,
      firstName: 'Alice',
      lastName: 'Turner',
      email: `${userId2.toString()}@gmail.com`,
      password: env.demoData.password,
      role: 'project manager',
      position: 'Tech Lead',
      org: orgId,
      completedWelcome: true,
      isDemo: true,
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 6)),
    },
    {
      _id: userId3,
      firstName: 'Michael',
      lastName: 'Smith',
      email: `${userId3.toString()}@gmail.com`,
      password: env.demoData.password,
      role: 'member',
      position: 'Software Engineer',
      org: orgId,
      completedWelcome: true,
      isDemo: true,
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 6)),
    },
  ];

  const organization: IOrganization & { _id: Types.ObjectId } = {
    _id: orgId,
    name: 'Globex Corp',
    members: [userId1, userId2, userId3],
    projects: [projectId1, projectId2],
    expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
  };

  const projects: (IProject & { _id: Types.ObjectId })[] = [
    {
      _id: projectId1,
      name: 'Explore ProjectHub',
      members: [userId1, userId2, userId3],
      description: 'The issues describe the various features of ProjectHub.',
      category: 'marketing',
      todoIssues: [issueId1],
      inProgressIssues: [issueId2],
      inReviewIssues: [issueId3],
      completedIssues: [issueId4],
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      _id: projectId2,
      name: 'ProjectHub Playground',
      members: [userId1, userId2, userId3],
      description: 'A demo project for you to further explore the app.',
      category: 'software',
      todoIssues: [issueId5, issueId9],
      inProgressIssues: [issueId6],
      inReviewIssues: [issueId7],
      completedIssues: [issueId8],
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
  ];

  const issues: (IIssue & { _id: Types.ObjectId })[] = [
    {
      _id: issueId1,
      project: projectId1,
      type: 'task',
      priority: 'low',
      status: 'to do',
      title: 'Click on an issue to view more.',
      reporter: userId1,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      _id: issueId2,
      project: projectId1,
      type: 'story',
      priority: 'medium',
      status: 'in progress',
      title: 'Try dragging issues to different columns to change their status.',
      reporter: userId1,
      assignee: userId2,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 5)),
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      _id: issueId3,
      project: projectId1,
      type: 'bug',
      priority: 'high',
      status: 'in review',
      title: 'Each issue displays its type, priority and assignee.',
      reporter: userId2,
      assignee: userId3,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      _id: issueId4,
      project: projectId1,
      type: 'task',
      priority: 'high',
      status: 'done',
      title: 'Delete an issue: Click on the issue -> click the delete icon.',
      reporter: userId3,
      assignee: userId1,
      completedAt: new Date(),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      _id: issueId5,
      project: projectId2,
      type: 'bug',
      priority: 'medium',
      status: 'to do',
      title: 'Try creating an issue by clicking the button below.',
      reporter: userId3,
      assignee: userId1,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      _id: issueId6,
      project: projectId2,
      type: 'task',
      priority: 'high',
      status: 'in progress',
      title: 'Try hovering over the icons.',
      reporter: userId1,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 3)),
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      _id: issueId7,
      project: projectId2,
      type: 'story',
      priority: 'low',
      status: 'in review',
      title: 'Try filtering issues by title or assignee.',
      reporter: userId2,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      _id: issueId8,
      project: projectId2,
      type: 'bug',
      priority: 'high',
      status: 'done',
      title:
        'Try searching for any issue using the search bar at the top right corner of the page.',
      reporter: userId3,
      assignee: userId2,
      completedAt: new Date(),
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      _id: issueId9,
      project: projectId2,
      type: 'story',
      priority: 'low',
      status: 'to do',
      title: 'Try updating an issue.',
      reporter: userId1,
      assignee: userId1,
      createdAt: new Date(new Date().setDate(new Date().getDate() - 1)),
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
  ];

  const projectsHistory: IProjectHistory[] = [
    {
      projectId: projectId1,
      history: [
        {
          issueId: issueId4,
          issueTitle: issues[3].title,
          user: userId1,
          mutation: 'update',
          updatedFields: ['status', 'assignee'],
          date: new Date(Date.now() - 1000 * 60 * 5),
          isDeleted: false,
        },
        {
          issueId: issueId3,
          issueTitle: issues[2].title,
          user: userId3,
          mutation: 'update',
          updatedFields: ['status', 'assignee'],
          date: new Date(Date.now() - 1000 * 60 * 30),
          isDeleted: false,
        },
        {
          issueId: issueId2,
          issueTitle: issues[1].title,
          user: userId2,
          mutation: 'update',
          updatedFields: ['status', 'assignee'],
          date: new Date(Date.now() - 1000 * 60 * 60),
          isDeleted: false,
        },
        {
          issueId: issueId4,
          issueTitle: issues[3].title,
          user: userId3,
          mutation: 'create',
          updatedFields: [],
          date: new Date(new Date().setDate(new Date().getDate() - 3)),
          isDeleted: false,
        },
        {
          issueId: issueId3,
          issueTitle: issues[2].title,
          user: userId2,
          mutation: 'create',
          updatedFields: [],
          date: new Date(new Date().setDate(new Date().getDate() - 3)),
          isDeleted: false,
        },
        {
          issueId: issueId2,
          issueTitle: issues[1].title,
          user: userId1,
          mutation: 'create',
          updatedFields: [],
          date: new Date(new Date().setDate(new Date().getDate() - 5)),
          isDeleted: false,
        },
        {
          issueId: issueId1,
          issueTitle: issues[0].title,
          user: userId1,
          mutation: 'create',
          updatedFields: [],
          date: new Date(new Date().setDate(new Date().getDate() - 5)),
          isDeleted: false,
        },
      ],
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
    {
      projectId: projectId2,
      history: [
        {
          issueId: issueId9,
          issueTitle: issues[8].title,
          user: userId1,
          mutation: 'update',
          updatedFields: ['priority', 'assignee'],
          date: new Date(Date.now() - 1000 * 60 * 5),
          isDeleted: false,
        },
        {
          issueId: issueId8,
          issueTitle: issues[7].title,
          user: userId2,
          mutation: 'update',
          updatedFields: ['status', 'assignee'],
          date: new Date(Date.now() - 1000 * 60 * 15),
          isDeleted: false,
        },
        {
          issueId: issueId7,
          issueTitle: issues[6].title,
          user: userId2,
          mutation: 'update',
          updatedFields: ['status'],
          date: new Date(Date.now() - 1000 * 60 * 25),
          isDeleted: false,
        },
        {
          issueId: issueId6,
          issueTitle: issues[5].title,
          user: userId1,
          mutation: 'update',
          updatedFields: ['status'],
          date: new Date(Date.now() - 1000 * 60 * 30),
          isDeleted: false,
        },
        {
          issueId: issueId5,
          issueTitle: issues[4].title,
          user: userId3,
          mutation: 'update',
          updatedFields: ['assignee'],
          date: new Date(Date.now() - 1000 * 60 * 40),
          isDeleted: false,
        },
        {
          issueId: issueId9,
          issueTitle: issues[8].title,
          user: userId1,
          mutation: 'create',
          updatedFields: [],
          date: new Date(new Date().setDate(new Date().getDate() - 1)),
          isDeleted: false,
        },
        {
          issueId: issueId8,
          issueTitle: issues[7].title,
          user: userId3,
          mutation: 'create',
          updatedFields: [],
          date: new Date(new Date().setDate(new Date().getDate() - 1)),
          isDeleted: false,
        },
        {
          issueId: issueId7,
          issueTitle: issues[6].title,
          user: userId2,
          mutation: 'create',
          updatedFields: [],
          date: new Date(new Date().setDate(new Date().getDate() - 1)),
          isDeleted: false,
        },
        {
          issueId: issueId6,
          issueTitle: issues[5].title,
          user: userId1,
          mutation: 'create',
          updatedFields: [],
          date: new Date(new Date().setDate(new Date().getDate() - 3)),
          isDeleted: false,
        },
        {
          issueId: issueId5,
          issueTitle: issues[4].title,
          user: userId3,
          mutation: 'create',
          updatedFields: [],
          date: new Date(new Date().setDate(new Date().getDate() - 3)),
          isDeleted: false,
        },
      ],
      expireAt: new Date(Date.now() + 1000 * 60 * 60 * 12.5),
    },
  ];

  return {
    users,
    organization,
    projects,
    issues,
    projectsHistory,
  };
};
