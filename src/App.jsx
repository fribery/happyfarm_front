import { useEffect, useState } from 'react';
import './App.css';

// ВАЖНО: Замените на ваш реальный Railway-домен!
const API_URL = 'https://happyfarms-production.up.railway.app/api';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      // Здесь будет функция fetchUserData для загрузки данных с бэкенда
    }
    setLoading(false);
  }, []);

  if (loading) return <div>Загрузка...</div>;

  return (
    <div className="app-container">
      <h1>🌿 Ваша Ферма</h1>
      {/* Сюда добавите отображение монет, кнопки и т.д. */}
      <p>Интерфейс игры будет здесь</p>
    </div>
  );
}

export default App;