import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './Components/App';
import { CssBaseline } from '@material-ui/core';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CssBaseline />
    <App />
  </React.StrictMode>
);
