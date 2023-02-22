import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import mongoose, { Types } from 'mongoose';

import Issue, { IIssue } from 'models/issues';
import Organization from 'models/organizations';
import ProjectHistory, { History } from 'models/projectHistory';
import Project, { IProject } from 'models/projects';

type CreateIssueReqBody = {
  project: string;
  title: string;
  type: 'task' | 'story' | 'bug';
  priority: 'low' | 'medium' | 'high';
  status: 'to do' | 'in progress' | 'in review' | 'done';
  reporter: string;
  isDemo?: boolean;
};

const createIssue = async (
  req: Request<ParamsDictionary, any, CreateIssueReqBody>,
  res: Response
) => {
  const issueData = req.body;

  const mapIssueTypes = {
    'to do': 'todoIssues',
    'in progress': 'inProgressIssues',
    'in review': 'inReviewIssues',
    done: 'completedIssues',
  } as const;

  try {
    const issueStatus = issueData.status;

    const newIssue = new Issue({
      ...issueData,
      completedAt: issueStatus === 'done' ? new Date() : undefined,
      expireAt: issueData.isDemo
        ? new Date(Date.now() + 1000 * 60 * 60 * 12.5)
        : undefined,
    });
    const savedIssue = await newIssue.save();

    await Project.findOneAndUpdate(
      {
        _id: issueData.project,
      },
      {
        $push: {
          [mapIssueTypes[issueStatus]]: savedIssue._id,
        },
      }
    );

    const projectHistory = await ProjectHistory.findOne({
      projectId: issueData.project,
    });
    const history: History = {
      issueId: savedIssue._id,
      issueTitle: savedIssue.title,
      user: savedIssue.reporter,
      mutation: 'create',
      date: new Date(),
      isDeleted: false,
    };
    if (projectHistory) {
      projectHistory.history = [history, ...projectHistory.history];
      await projectHistory.save();
    }

    return res.json(savedIssue);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getIssueById = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.query;
    if (!projectId || typeof projectId !== 'string') {
      return res.status(400).json({ message: 'Missing projectId' });
    }

    const issue = await Issue.findOne({
      _id: req.params.issueId,
      project: projectId,
    });
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }
    return res.json(issue);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteIssue = async (req: Request, res: Response) => {
  try {
    const { userId } = req.query;
    if (!userId || typeof userId !== 'string') {
      return res.status(400).json({ message: 'Missing userId' });
    }

    const issue = await Issue.findByIdAndDelete(req.params.issueId);
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    await Project.findOneAndUpdate(
      { _id: issue.project },
      {
        $pull: {
          todoIssues: issue._id,
          inProgressIssues: issue._id,
          inReviewIssues: issue._id,
          completedIssues: issue._id,
        },
      }
    );

    const projectHistory = await ProjectHistory.findOne({
      projectId: issue.project,
    });
    const history: History = {
      issueId: issue._id,
      issueTitle: issue.title,
      user: new mongoose.Types.ObjectId(userId),
      mutation: 'delete',
      date: new Date(),
      isDeleted: true,
    };
    if (projectHistory) {
      projectHistory.history = [history, ...projectHistory.history].map(
        (item) => {
          if (item.issueId.equals(issue._id)) {
            return {
              ...item,
              isDeleted: true,
            };
          }
          return item;
        }
      );
      await projectHistory.save();
    }

    return res.json(issue);
  } catch (err) {
    return res.status(400).json(err);
  }
};

type UpdateIssueReqBody = {
  type: 'task' | 'story' | 'bug';
  priority: 'low' | 'medium' | 'high';
  status: 'to do' | 'in progress' | 'in review' | 'done';
  title: string;
  description: string | undefined;
  reporter: string;
  assignee: string | undefined;
  dueDate: string | undefined;
  updatedFields: string[];
  userId: string;
};

const updateIssue = async (
  req: Request<ParamsDictionary, any, UpdateIssueReqBody>,
  res: Response
) => {
  const { issueId } = req.params;
  const {
    type,
    priority,
    status,
    title,
    description,
    reporter,
    assignee,
    dueDate,
    updatedFields,
    userId,
  } = req.body;

  try {
    const issue = await Issue.findOne({
      _id: issueId,
    });
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    const mapIssueTypes = {
      'to do': 'todoIssues',
      'in progress': 'inProgressIssues',
      'in review': 'inReviewIssues',
      done: 'completedIssues',
    } as const;
    const source = issue.status;
    const destination = status;

    issue.type = type;
    issue.priority = priority;
    issue.status = status;
    issue.title = title;
    issue.description = description;
    issue.reporter = new mongoose.Types.ObjectId(reporter);
    issue.assignee = assignee
      ? new mongoose.Types.ObjectId(assignee)
      : undefined;
    issue.dueDate = dueDate ? new Date(dueDate) : undefined;
    if (destination === 'done' && source !== 'done') {
      issue.completedAt = new Date();
    }
    if (destination !== 'done' && source === 'done') {
      issue.completedAt = undefined;
    }
    await issue.save();

    if (source !== destination) {
      await Project.findOneAndUpdate(
        {
          _id: issue.project,
        },
        {
          $pull: {
            [mapIssueTypes[source]]: issue._id,
          },
          $push: {
            [mapIssueTypes[destination]]: issue._id,
          },
        }
      );
    }

    const projectHistory = await ProjectHistory.findOne({
      projectId: issue.project,
    });
    const history: History = {
      issueId: issue._id,
      issueTitle: issue.title,
      user: new mongoose.Types.ObjectId(userId),
      mutation: 'update',
      updatedFields,
      date: new Date(),
      isDeleted: false,
    };
    if (projectHistory) {
      projectHistory.history = [history, ...projectHistory.history];
      await projectHistory.save();
    }

    return res.json(issue);
  } catch (err) {
    return res.status(400).json(err);
  }
};

type UpdateIssueStatusReqBody = {
  source:
    | 'todoIssues'
    | 'inProgressIssues'
    | 'inReviewIssues'
    | 'completedIssues';
  destination:
    | 'todoIssues'
    | 'inProgressIssues'
    | 'inReviewIssues'
    | 'completedIssues';
  destinationIndex: number;
  userId: string;
};

const updateIssueStatus = async (
  req: Request<ParamsDictionary, any, UpdateIssueStatusReqBody>,
  res: Response
) => {
  const { source, destination, destinationIndex, userId } = req.body;
  const { issueId } = req.params;

  const mapIssueTypes = {
    todoIssues: 'to do',
    inProgressIssues: 'in progress',
    inReviewIssues: 'in review',
    completedIssues: 'done',
  } as const;

  try {
    const issue = await Issue.findOne({ _id: issueId });
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

    issue.status = mapIssueTypes[destination];
    if (destination === 'completedIssues' && source !== 'completedIssues') {
      issue.completedAt = new Date();
    }
    if (destination !== 'completedIssues' && source === 'completedIssues') {
      issue.completedAt = undefined;
    }
    await issue.save();

    await Project.findOneAndUpdate(
      {
        _id: issue.project,
      },
      {
        $pull: {
          [source]: issue._id,
        },
      }
    );
    await Project.findOneAndUpdate(
      {
        _id: issue.project,
      },
      {
        $push: {
          [destination]: {
            $each: [issue._id],
            $position: Number(destinationIndex),
          },
        },
      }
    );

    const projectHistory = await ProjectHistory.findOne({
      projectId: issue.project,
    });
    const history: History = {
      issueId: issue._id,
      issueTitle: issue.title,
      user: new mongoose.Types.ObjectId(userId),
      mutation: 'update',
      updatedFields: ['status'],
      date: new Date(),
      isDeleted: false,
    };
    if (projectHistory) {
      projectHistory.history = [history, ...projectHistory.history];
      await projectHistory.save();
    }

    return res.json(issue);
  } catch (err) {
    return res.status(400).json(err);
  }
};

type PopulatedIssue = {
  _id: Types.ObjectId;
  type: IIssue['type'];
  title: IIssue['title'];
  project: Types.ObjectId;
};

type PopulatedProject = {
  _id: Types.ObjectId;
  name: IProject['name'];
  members: IProject['members'];
  description: IProject['description'];
  category: IProject['category'];
  todoIssues: PopulatedIssue[];
  inReviewIssues: PopulatedIssue[];
  inProgressIssues: PopulatedIssue[];
  completedIssues: PopulatedIssue[];
};

const getAllIssues = async (req: Request, res: Response) => {
  const { orgId, userId } = req.query;

  if (!orgId || typeof orgId !== 'string') {
    return res.status(400).json({ message: 'Missing orgId' });
  }

  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ message: 'Missing userId' });
  }

  try {
    const organization = await Organization.findOne({ _id: orgId }).populate<{
      projects: PopulatedProject[];
    }>({
      path: 'projects',
      populate: [
        { path: 'todoIssues', select: 'type title project' },
        { path: 'inProgressIssues', select: 'type title project' },
        { path: 'inReviewIssues', select: 'type title project' },
        { path: 'completedIssues', select: 'type title project' },
      ],
    });

    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const filteredProjects = organization.projects.filter((project) =>
      project.members.includes(new mongoose.Types.ObjectId(userId))
    );

    let allIssues: PopulatedIssue[] = [];
    filteredProjects.forEach((project) => {
      allIssues = allIssues.concat(
        project.todoIssues,
        project.inProgressIssues,
        project.inReviewIssues,
        project.completedIssues
      );
    });

    return res.json(allIssues);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default {
  createIssue,
  getIssueById,
  deleteIssue,
  updateIssue,
  updateIssueStatus,
  getAllIssues,
};
