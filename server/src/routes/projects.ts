import express from 'express';

import projectHistoryController from 'controllers/projectHistory';
import projectsController from 'controllers/projects';

const router = express.Router();

// GET /api/org/:orgId/projects
router.get('/', projectsController.getProjectsByOrgId);

// POST /api/projects
router.post('/', projectsController.createProject);

// GET /api/projects/:projectId
router.get('/:projectId', projectsController.getProjectById);

// GET /api/projects/:projectId/history
router.get('/:projectId/history', projectHistoryController.getProjectHistory);

export default router;
