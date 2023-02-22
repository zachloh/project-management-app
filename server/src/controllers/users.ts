import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import Issue from 'models/issues';
import Organization from 'models/organizations';
import ProjectHistory from 'models/projectHistory';
import Project from 'models/projects';
import User from 'models/users';
import { generateDemoData } from 'utils/generateDemoData';
import { signToken } from 'utils/signToken';

type RegisterUserReqBody = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

const registerUser = async (
  req: Request<ParamsDictionary, any, RegisterUserReqBody>,
  res: Response
) => {
  try {
    const { firstName, lastName, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      firstName,
      lastName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const token = signToken({ _id: savedUser._id.toString() });
    const userWithoutPassword = await User.findOne({ email })
      .select('-password')
      .populate('org');

    return res.json({ token, user: userWithoutPassword });
  } catch (err) {
    return res.status(400).json(err);
  }
};

type LoginUserReqBody = {
  email: string;
  password: string;
};

const loginUser = async (
  req: Request<ParamsDictionary, any, LoginUserReqBody>,
  res: Response
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }

    const token = signToken({ _id: user._id.toString() });
    const userWithoutPassword = await User.findOne({ email })
      .select('-password')
      .populate('org');

    return res.json({ token, user: userWithoutPassword });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

const getUserById = async (req: Request, res: Response) => {
  try {
    const user = await User.findOne({
      _id: req.params.userId,
    })
      .select('-password')
      .populate('org');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    return res.json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

type UpdateUserOrgReqBody = {
  org: string;
  position: string;
  role: 'admin' | 'project manager' | 'member';
};

const updateUserOrg = async (
  req: Request<ParamsDictionary, any, UpdateUserOrgReqBody>,
  res: Response
) => {
  const { userId } = req.params;
  const { org, position, role } = req.body;

  try {
    const user = await User.findOne({ _id: userId }).select('-password');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newOrg = new Organization({
      name: org,
      members: [userId],
    });
    const savedOrg = await newOrg.save();

    user.org = savedOrg._id;
    user.position = position;
    user.role = role;
    const savedUser = await user.save();
    const populatedUser = await savedUser.populate('org');
    return res.json(populatedUser);
  } catch (err) {
    return res.status(400).json(err);
  }
};

type UpdateUserProfileReqBody = {
  firstName: string;
  lastName: string;
  position: string;
};

const updateUserProfile = async (
  req: Request<ParamsDictionary, any, UpdateUserProfileReqBody>,
  res: Response
) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
    })
      .select('-password')
      .populate('org');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

type UpdateUserRoleReqBody = {
  role: string;
};

const updateUserRole = async (
  req: Request<ParamsDictionary, any, UpdateUserRoleReqBody>,
  res: Response
) => {
  const { userId } = req.params;

  try {
    const user = await User.findOneAndUpdate({ _id: userId }, req.body, {
      new: true,
      runValidators: true,
    })
      .select('-password')
      .populate('org');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    return res.json(user);
  } catch (err) {
    return res.status(400).json(err);
  }
};

const createDemoAccount = async (req: Request, res: Response) => {
  try {
    const { users, organization, projects, issues, projectsHistory } =
      generateDemoData();

    const p1 = User.insertMany(users);
    const p2 = Organization.create(organization);
    const p3 = Project.insertMany(projects);
    const p4 = Issue.insertMany(issues);
    const p5 = ProjectHistory.insertMany(projectsHistory);

    await Promise.all([p1, p2, p3, p4, p5]);

    const userWithoutPassword = await User.findOne({ _id: users[0]._id })
      .select('-password')
      .populate('org');
    if (!userWithoutPassword) {
      return res
        .status(500)
        .json({ message: 'Failed to generate demo account' });
    }

    const token = signToken({ _id: userWithoutPassword._id.toString() });

    return res.json({ token, user: userWithoutPassword });
  } catch (err) {
    return res.status(500).json(err);
  }
};

export default {
  registerUser,
  loginUser,
  getUserById,
  updateUserOrg,
  updateUserProfile,
  updateUserRole,
  createDemoAccount,
};
