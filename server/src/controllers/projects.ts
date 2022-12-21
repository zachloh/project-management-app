import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import Organization from 'models/organizations';
import Project from 'models/projects';
import User from 'models/users';
import { PopulatedProject } from 'types/mongoose';
import { getIssuesLast7Days } from 'utils/getIssuesLast7Days';

const getProjectsByOrgId = async (req: Request, res: Response) => {
  const { orgId } = req;

  try {
    if (!orgId) {
      return res.status(400).json({ message: 'Missing organization ID' });
    }
    const organization = await Organization.findOne({ _id: orgId }).populate<{
      projects: PopulatedProject[];
    }>({
      path: 'projects',
      populate: [
        { path: 'members', select: '-password' },
        { path: 'todoIssues', select: 'createdAt' },
        { path: 'inProgressIssues', select: 'createdAt' },
        { path: 'inReviewIssues', select: 'createdAt' },
        { path: 'completedIssues', select: 'createdAt completedAt' },
      ],
    });
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const issuesLast7Days = getIssuesLast7Days(organization.projects);
    return res.json({
      projects: organization.projects,
      createdIssuesLast7Days: issuesLast7Days.createdIssuesLast7Days,
      completedIssuesLast7Days: issuesLast7Days.completedIssuesLast7Days,
    });
  } catch (err) {
    return res.status(400).json(err);
  }
};

type CreateProjectReqBody = {
  name: string;
  orgId: string;
  userId: string;
  description: string;
  category: 'business' | 'marketing' | 'software';
};

const createProject = async (
  req: Request<ParamsDictionary, any, CreateProjectReqBody>,
  res: Response
) => {
  const { name, description, category, orgId, userId } = req.body;

  try {
    const newProject = new Project({
      name,
      members: [userId],
      description,
      category,
    });
    const savedProject = await newProject.save();

    await User.findOneAndUpdate({ _id: userId }, { completedWelcome: true });

    const populatedProject = await savedProject.populate({
      path: 'members',
      select: '-password',
    });

    await Organization.findOneAndUpdate(
      { _id: orgId },
      {
        $push: {
          projects: savedProject._id,
        },
      }
    );

    return res.json(populatedProject);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
    })
      .populate({
        path: 'members',
        select: '-password',
      })
      .populate('todoIssues')
      .populate('inReviewIssues')
      .populate('inProgressIssues')
      .populate('completedIssues');
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    return res.json(project);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default {
  getProjectsByOrgId,
  createProject,
  getProjectById,
};
