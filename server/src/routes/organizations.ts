import express from 'express';

import organizationsController from 'controllers/organizations';

const router = express.Router();

// GET /api/organizations/:orgId
router.get('/:orgId', organizationsController.getOrganizationById);

export default router;
