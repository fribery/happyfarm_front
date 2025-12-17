import React from 'react';
import ReactDOM from 'react-dom/client';
import Debug from './debug'; // Импорт вашего основного компонента
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Debug /> {/* Рендерим ваш App.jsx */}
  </React.StrictMode>
);