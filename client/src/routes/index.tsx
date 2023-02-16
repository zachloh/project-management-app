import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import NotFound from 'components/NotFound';
import { AdminSettings } from 'features/admin-settings';
import { RegisterForm, LoginForm, RequireAuth } from 'features/auth';
import { KanbanBoard } from 'features/kanban-board';
import { OverviewDashboard } from 'features/overview-dashboard';
import { ProjectDashboard } from 'features/project-dashboard';
import { ProjectManagement } from 'features/project-management';
import { Welcome } from 'features/user';

function AppRoutes() {
  return (
    <Routes>
      <Route path="/register" element={<RegisterForm />} />
      <Route path="/login" element={<LoginForm />} />
      <Route path="/welcome" element={<Welcome />} />
      <Route element={<RequireAuth />}>
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="/dashboard" element={<OverviewDashboard />} />
        <Route path="/dashboard/:projectId" element={<ProjectDashboard />} />
        <Route path="/projects/:projectId" element={<KanbanBoard />} />
        <Route path="/project-management" element={<ProjectManagement />} />
        <Route path="/admin-settings" element={<AdminSettings />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
