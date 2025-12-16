import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './TestPage.jsx'
// Добавьте этот блок в начало main.jsx/index.js
import React from 'react';

// Глобальный обработчик ошибок React
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    // Обновляем состояние, чтобы следующий рендер показал запасной UI
    return { hasError: true, error: error };
  }
  
  componentDidCatch(error, errorInfo) {
    // Логируем ошибку в консоль
    console.error('❌ React Error Boundary поймал ошибку:', error);
    console.error('Информация о компоненте:', errorInfo.componentStack);
  }
  
  render() {
    if (this.state.hasError) {
      // Можно отрендерить любой запасной UI
      return (
        <div style={{ padding: '20px', color: 'red' }}>
          <h1>⚠️ В приложении произошла ошибка</h1>
          <p><strong>Сообщение:</strong> {this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>Обновить страницу</button>
        </div>
      );
    }
    return this.props.children;
  }
}

// Было:
// ReactDOM.createRoot(document.getElementById('root')).render(<App />);

// Стало:
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <App /> {/* Или <TestPage />, если всё ещё тестируете */}
    </ErrorBoundary>
  </React.StrictMode>
);


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
