import { inject } from '@vercel/analytics';
import React from 'react';
import ReactDOM from 'react-dom/client';

import App from 'App';
import 'index.css';
import reportWebVitals from 'reportWebVitals';
import { sendToVercelAnalytics } from 'vitals';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  // <React.StrictMode>
  <App />
  // </React.StrictMode>
);

inject();
reportWebVitals(sendToVercelAnalytics);
