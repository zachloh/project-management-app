import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from 'components/Layout';
import { Dashboard } from 'features/dashboard';

function AppRoutes() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Layout>
  );
}

export default AppRoutes;
