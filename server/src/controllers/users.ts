import bcrypt from 'bcryptjs';
import { Request, Response } from 'express';
import { ParamsDictionary } from 'express-serve-static-core';

import User from 'models/users';
import { signToken } from 'utils/signToken';

type RegisterUserReqBody = {
  name: string;
  email: string;
  password: string;
};

const registerUser = async (
  req: Request<ParamsDictionary, any, RegisterUserReqBody>,
  res: Response
) => {
  try {
    const { name, email, password } = req.body;

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(409).json({ message: 'Email already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    const token = signToken({ _id: savedUser._id.toString() });

    return res.json({ token });
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
    return res.json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

export default {
  registerUser,
  loginUser,
};
