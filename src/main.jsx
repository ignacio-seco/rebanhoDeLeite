import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router } from 'react-router-dom'; // <== IMPORT
import { AuthContextComponente } from './contexts/authContext';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
    <AuthContextComponente>
      <App />
    </AuthContextComponente>
    </Router>
  </React.StrictMode>,
)
