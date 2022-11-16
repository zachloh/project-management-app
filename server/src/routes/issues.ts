import express from 'express';

import issuesController from 'controllers/issues';

const router = express.Router();

// POST /api/issues
router.post('/', issuesController.createIssue);

// GET /api/issues/:issueId
router.get('/:issueId', issuesController.getIssueById);

// DELETE /api/issues/:issueId
router.delete('/:issueId', issuesController.deleteIssue);

export default router;
