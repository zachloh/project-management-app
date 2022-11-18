import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import Issue, { IIssue } from 'models/issues';
import Project from 'models/projects';

const createIssue = async (
  req: Request<ParamsDictionary, any, IIssue>,
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
    const issueStatus = issueData.status.toLowerCase() as
      | 'to do'
      | 'in progress'
      | 'in review'
      | 'done';

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
  destinationIndex: string;
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
    // const issue = await Issue.findOneAndUpdate(
    //   { _id: issueId },
    //   {
    //     status: mapIssueTypes[destination],
    //   },
    //   {
    //     new: true,
    //   }
    // );

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
  updateIssueStatus,
};
