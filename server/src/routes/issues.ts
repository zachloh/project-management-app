import express from 'express';

import issuesController from 'controllers/issues';

const router = express.Router();

// GET /api/issues
router.get('/', issuesController.getAllIssues);

// POST /api/issues
router.post('/', issuesController.createIssue);

// GET /api/issues/:issueId
router.get('/:issueId', issuesController.getIssueById);

// DELETE /api/issues/:issueId
router.delete('/:issueId', issuesController.deleteIssue);

// PATCH /api/issues/:issueId
router.patch('/:issueId', issuesController.updateIssue);

// PATCH /api/issues/:issueId/status
router.patch('/:issueId/status', issuesController.updateIssueStatus);

export default router;
