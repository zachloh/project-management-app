import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import Issue, { IIssue } from 'models/issues';
import Project from 'models/projects';

const createIssue = async (
  req: Request<ParamsDictionary, any, IIssue>,
  res: Response
) => {
  const issueData = req.body;

  try {
    const newIssue = new Issue(issueData);
    const savedIssue = await newIssue.save();

    if (issueData.status.toLowerCase() === 'to do') {
      await Project.findOneAndUpdate(
        {
          _id: issueData.project,
        },
        {
          $push: {
            todoIssues: newIssue._id,
          },
        }
      );
    } else if (issueData.status.toLowerCase() === 'in progress') {
      await Project.findOneAndUpdate(
        {
          _id: issueData.project,
        },
        {
          $push: {
            inProgressIssues: newIssue._id,
          },
        }
      );
    } else if (issueData.status.toLowerCase() === 'in review') {
      await Project.findOneAndUpdate(
        {
          _id: issueData.project,
        },
        {
          $push: {
            inReviewIssues: newIssue._id,
          },
        }
      );
    } else if (issueData.status.toLowerCase() === 'done') {
      await Project.findOneAndUpdate(
        {
          _id: issueData.project,
        },
        {
          $push: {
            completedIssues: newIssue._id,
          },
        }
      );
    }

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
    const issue = await Issue.findOneAndUpdate(
      { _id: issueId },
      {
        status: mapIssueTypes[destination],
      },
      {
        new: true,
      }
    );
    if (!issue) {
      return res.status(404).json({ message: 'Issue not found' });
    }

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
