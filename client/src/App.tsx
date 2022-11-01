import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import AppRoutes from 'routes';
import 'config/chart-js';

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  );
}

export default App;
