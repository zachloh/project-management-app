import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import Issue from 'models/issues';
import Organization from 'models/organizations';
import ProjectHistory from 'models/projectHistory';
import Project from 'models/projects';
import User from 'models/users';
import { PopulatedProject } from 'types/mongoose';
import { getIssuesLast7Days } from 'utils/getIssuesLast7Days';

const getProjectsByOrgId = async (req: Request, res: Response) => {
  const { orgId } = req;

  const { userId } = req.query;
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ message: 'Missing userId' });
  }

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
        { path: 'todoIssues' },
        { path: 'inProgressIssues' },
        { path: 'inReviewIssues' },
        { path: 'completedIssues' },
      ],
    });
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }

    const filteredProjects = organization.projects.filter((project) =>
      project.members.some((member) => member._id.toString() === userId)
    );

    const issuesLast7Days = getIssuesLast7Days(filteredProjects);
    return res.json({
      projects: filteredProjects,
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
  isDemo?: boolean;
};

const createProject = async (
  req: Request<ParamsDictionary, any, CreateProjectReqBody>,
  res: Response
) => {
  const { name, description, category, orgId, userId, isDemo } = req.body;

  try {
    const newProject = new Project({
      name,
      members: [userId],
      description,
      category,
      expireAt: isDemo
        ? new Date(Date.now() + 1000 * 60 * 60 * 12.5)
        : undefined,
    });
    const savedProject = await newProject.save();

    const newProjectHistory = new ProjectHistory({
      projectId: savedProject._id,
      history: [],
      expireAt: isDemo
        ? new Date(Date.now() + 1000 * 60 * 60 * 12.5)
        : undefined,
    });
    await newProjectHistory.save();

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
  const { userId } = req.query;
  if (!userId || typeof userId !== 'string') {
    return res.status(400).json({ message: 'Missing userId' });
  }

  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
      members: userId,
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

type UpdateProjectReqBody = {
  name: string;
  description: string;
  category: 'business' | 'marketing' | 'software';
};

const updateProject = async (
  req: Request<ParamsDictionary, any, UpdateProjectReqBody>,
  res: Response
) => {
  const { projectId } = req.params;

  try {
    const updatedProject = await Project.findOneAndUpdate(
      { _id: projectId },
      req.body,
      { new: true, runValidators: true }
    )
      .populate({
        path: 'members',
        select: '-password',
      })
      .populate('todoIssues')
      .populate('inReviewIssues')
      .populate('inProgressIssues')
      .populate('completedIssues');

    if (!updatedProject) {
      return res.status(404).json({ message: 'Project not found' });
    }

    return res.json(updatedProject);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { orgId } = req.query;

  if (!orgId || typeof orgId !== 'string') {
    return res.status(400).json({ message: 'Missing orgId' });
  }

  try {
    const project = await Project.findByIdAndDelete(projectId);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }

    const p1 = Issue.deleteMany({ project: projectId });
    const p2 = Organization.updateOne(
      { _id: orgId },
      { $pull: { projects: projectId } }
    );
    const p3 = ProjectHistory.findOneAndDelete({ projectId });
    await Promise.all([p1, p2, p3]);

    return res.json(project);
  } catch (err) {
    return res.status(400).json(err);
  }
};

export default {
  getProjectsByOrgId,
  createProject,
  getProjectById,
  updateProject,
  deleteProject,
};
