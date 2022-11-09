import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import Organization from 'models/organizations';
import Project, { IProject } from 'models/projects';

const getProjectsByOrgId = async (req: Request, res: Response) => {
  const { orgId } = req;

  try {
    if (!orgId) {
      return res.status(400).json({ message: 'Missing organization ID' });
    }
    const organization = await Organization.findOne({ _id: orgId }).populate(
      'projects'
    );
    if (!organization) {
      return res.status(404).json({ message: 'Organization not found' });
    }
    return res.json({ projects: organization.projects });
  } catch (err) {
    return res.status(400).json(err);
  }
};

const createProject = async (
  req: Request<
    ParamsDictionary,
    any,
    IProject & { orgId: string; userId: string }
  >,
  res: Response
) => {
  const { name, projectIconURL, description, category, orgId, userId } =
    req.body;

  try {
    const newProject = new Project({
      name,
      members: [userId],
      projectIconURL,
      description,
      category,
    });
    const savedProject = await newProject.save();
    await Organization.findOneAndUpdate(
      { _id: orgId },
      {
        $push: {
          projects: newProject._id,
        },
      }
    );
    return res.json(savedProject);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const getProjectById = async (req: Request, res: Response) => {
  try {
    const project = await Project.findOne({
      _id: req.params.projectId,
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
