import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [seconds, setSeconds] = useState(0);

  // Простой таймер, который обновляется каждую секунду
  useEffect(() => {
    const interval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="app-container">
      <h1>🌿 Тест Фермы</h1>
      <p>Если это видно, React работает.</p>
      <p><strong>Таймер:</strong> {seconds} секунд</p>
      <p>Страница загружена: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}


export default App;