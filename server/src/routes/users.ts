import express from 'express';

import usersController from 'controllers/users';
import { loginSchema, registerSchema } from 'lib/zod';
import { validate } from 'middleware/validate';

const router = express.Router();

// POST /api/users/register
router.post(
  '/register',
  validate(registerSchema),
  usersController.registerUser
);

// POST /api/users/login
router.post('/login', validate(loginSchema), usersController.loginUser);

export default router;
