import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { CarritoContextProvider } from './context/CarritoContext';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <CarritoContextProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </CarritoContextProvider>
  </React.StrictMode>,
);
