import express from 'express';

import projectsController from 'controllers/projects';

const router = express.Router();

// GET /api/org/:orgId/projects
router.get('/', projectsController.getProjectsByOrgId);

// POST /api/projects
router.post('/', projectsController.createProject);

// GET /api/projects/:projectId
router.get('/:projectId', projectsController.getProjectById);

export default router;
