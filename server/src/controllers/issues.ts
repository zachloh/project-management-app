import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';
import mongoose from 'mongoose';

import Issue from 'models/issues';
import Project from 'models/projects';

type CreateIssueReqBody = {
  project: string;
  title: string;
  type: 'task' | 'story' | 'bug';
  priority: 'low' | 'medium' | 'high';
  status: 'to do' | 'in progress' | 'in review' | 'done';
  reporter: string;
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
    });
    const savedIssue = await newIssue.save();

    await Project.findOneAndUpdate(
      {
        _id: issueData.project,
      },
      {
        $push: {
          [mapIssueTypes[issueStatus]]: newIssue._id,
        },
      }
    );

    return res.json(savedIssue);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getIssueById = async (req: Request, res: Response) => {
  try {
    const issue = await Issue.findOne({
      _id: req.params.issueId,
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
};

const updateIssueStatus = async (
  req: Request<ParamsDictionary, any, UpdateIssueStatusReqBody>,
  res: Response
) => {
  const { source, destination, destinationIndex } = req.body;
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

    return res.json(issue);
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
};
