import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tg = window.Telegram?.WebApp;
    if (tg) {
      tg.ready();
      tg.expand();
      console.log('Telegram Mini App инициализирован');
    }
    setLoading(false);
  }, []);

  if (loading) return <div className="app-container">Загрузка фермы...</div>;

  return (
    <div className="app-container">
      <h1>🌿 Ваша Ферма</h1>
      {userData ? (
        <>
          <p>👋 Привет, <strong>{userData.username || 'фермер'}!</strong></p>
          <div className="balance">
            <h2>Ваш баланс: <span className="coins">🪙 100</span></h2>
          </div>
          <div className="actions">
            <button onClick={() => alert('Урожай собран! +10 монет')}>🥕 Собрать урожай</button>
            <button onClick={() => alert('Магазин скоро откроется!')}>🛒 Открыть магазин</button>
          </div>
        </>
      ) : (
        <>
          <p>Данные не найдены. Начните с команды /start в боте.</p>
          <div className="balance">
            <h2>Демо-баланс: <span className="coins">🪙 100</span></h2>
          </div>
        </>
      )}
      <p className="debug-info">Это интерфейс вашей игры. Открыто в {window.Telegram?.WebApp ? 'Telegram' : 'браузере'}.</p>
    </div>
  );
}

export default App;