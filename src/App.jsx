// ВЕСЬ КОД В ФАЙЛЕ src/App.jsx
console.log('🟢 Файл App.jsx загружен и исполняется!');

function App() {
  console.log('🟢 Компонент App рендерится!');
  return (
    <div style={{ padding: '20px' }}>
      <h1>✅ Тест: React работает!</h1>
      <p>Если это видно, значит React компонент запустился.</p>
      <p>Время: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

export default App;