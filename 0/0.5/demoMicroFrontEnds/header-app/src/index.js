// src/index.js en header-app
import React from 'react';
import { createRoot } from 'react-dom/client';
import Header from './Header';  // Asegúrate de importar Header en lugar de App

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<Header />);
