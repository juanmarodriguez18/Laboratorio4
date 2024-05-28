import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CarritoContextProvider } from './context/CarritoContext';
import { AuthProvider } from './controlAcceso/AuthContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AuthProvider>
      <CarritoContextProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </CarritoContextProvider>
    </AuthProvider>
  </React.StrictMode>,
);
