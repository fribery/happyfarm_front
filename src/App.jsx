import { useEffect, useState } from 'react';
import './App.css';

const API_URL = 'https://happyfarms-production.up.railway.app/api'; // Убедитесь, что это ваш домен!

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('1. 🔄 Компонент App смонтирован');
    
    // Оборачиваем всю логику в try/catch, чтобы поймать любую ошибку
    try {
      const tg = window.Telegram?.WebApp;
      console.log('2. 📱 Telegram object:', tg);

      if (tg) {
        tg.ready();
        console.log('3. ✅ Telegram WebApp ready вызван');
        tg.expand();
        console.log('4. ✅ Telegram WebApp expand вызван');
        // Пока НЕ вызываем fetchUserData, чтобы упростить
        // fetchUserData(tg);
      } else {
        console.warn('5. ⚠️ Telegram WebApp не найден (запуск в браузере)');
      }
    } catch (err) {
      console.error('❌ ОШИБКА в блоке инициализации Telegram:', err);
      setError('Ошибка инициализации: ' + err.message);
    } finally {
      setLoading(false);
      console.log('6. 🏁 Загрузка завершена, loading = false');
    }
  }, []); // Пустой массив зависимостей - запуск один раз при загрузке

  // Простейший интерфейс БЕЗ обращения к userData
  if (loading) {
    console.log('7. 🟡 Рендерим загрузку...');
    return <div className="app-container">Загрузка фермы...</div>;
  }
  if (error) {
    console.log('8. 🔴 Рендерим ошибку:', error);
    return <div className="app-container error">{error}</div>;
  }

  console.log('9. 🟢 Рендерим основной интерфейс');
  return (
    <div className="app-container">
      <h1>🌿 Ваша Ферма (Тестовая версия)</h1>
      <p>✅ Основной компонент загружен успешно.</p>
      <p>🛠️ Работа с Telegram и бэкендом временно отключена для отладки.</p>
    </div>
  );
}

export default App;