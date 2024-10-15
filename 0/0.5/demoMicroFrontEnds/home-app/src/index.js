// src/index.js en home-app
import React from 'react';
import { createRoot } from 'react-dom/client';
import Content from './Content';

// Cargar el Header remoto desde header-app
const Header = React.lazy(() => import('appHeader@http://localhost:3000/remoteEntry.js/Header'));

const App = () => (
  <React.Suspense fallback={<div>Loading Header...</div>}>
    <Header />
    <Content />
  </React.Suspense>
);

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);
