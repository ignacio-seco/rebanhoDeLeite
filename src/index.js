import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom'; // <== IMPORT
import { AuthContextComponente } from './contexts/authContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
    <AuthContextComponente>
      <App />
    </AuthContextComponente>
    </Router>
  </React.StrictMode>
);
