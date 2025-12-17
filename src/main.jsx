import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './debug'; // Импорт вашего основного компонента
import './index.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App /> {/* Рендерим ваш App.jsx */}
  </React.StrictMode>
);