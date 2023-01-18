import express from 'express';

import usersController from 'controllers/users';
import {
  loginSchema,
  registerSchema,
  updateUserOrgSchema,
  updateUserProfileSchema,
} from 'lib/zod';
import { validate } from 'middleware/validate';
import { verifyToken } from 'middleware/verifyToken';

const router = express.Router();

// POST /api/users/register
router.post(
  '/register',
  validate(registerSchema),
  usersController.registerUser
);

// POST /api/users/login
router.post('/login', validate(loginSchema), usersController.loginUser);

// GET /api/users/:userId
router.get('/:userId', verifyToken(), usersController.getUserById);

// PATCH /api/users/:userId/org
router.patch(
  '/:userId/org',
  verifyToken(),
  validate(updateUserOrgSchema),
  usersController.updateUserOrg
);

// PATCH /api/users/:userId/profile
router.patch(
  '/:userId/profile',
  verifyToken(),
  validate(updateUserProfileSchema),
  usersController.updateUserProfile
);

export default router;
