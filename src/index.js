// src/index.js

import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/main.scss'; // Importa el archivo principal de estilos
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);