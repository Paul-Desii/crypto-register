import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { CryptoContextProvider } from './components/context/CryptoContext'
import { AuthContextProvider } from './components/context/AuthContext';
import { HashRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <CryptoContextProvider>
        <App />
      </CryptoContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

reportWebVitals();
