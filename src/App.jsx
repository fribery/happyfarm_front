// ВЕСЬ КОД В ФАЙЛЕ src/App.jsx
console.log('🟢 Файл App.jsx загружен и исполняется!');

function App() {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isInTelegram, setIsInTelegram] = useState(false);

  // ==================== ОСНОВНАЯ ФУНКЦИЯ ЗАГРУЗКИ ДАННЫХ ====================
  const fetchUserData = async (tg) => {
    try {
      console.log('🔄 Начинаю загрузку данных пользователя...');

      // 1. Готовим данные для проверки на бэкенде
      // tg.initData — специальная строка от Telegram для проверки подлинности
      const initData = tg.initData;
      // tg.initDataUnsafe.user — непроверенные данные, можно использовать для ID
      const telegramUserId = 22430;

      if (!telegramUserId) {
        throw new Error('Не удалось получить ID пользователя из Telegram');
      }

      // 2. Отправляем запрос к вашему бэкенду на Railway
      const response = await fetch('${API_BASE_URL}/api/user-data', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: telegramUserId,
          initData: initData, // Бэкенд должен проверить эту подпись!
        }),
      });

      console.log('📡 Ответ от бэкенда, статус:', response.status);

      // 3. Обрабатываем ответ
      if (!response.ok) {
        // Если бэкенд ответил ошибкой (404, 500 и т.д.)
        throw new Error('Бэкенд ответил с ошибкой ${response.status}');
      }

      const result = await response.json();
      console.log('📊 Данные от бэкенда:', result);

      // 4. Проверяем структуру ответа (успех/ошибка)
      if (result.success && result.user) {
        // Всё хорошо, сохраняем данные пользователя в состояние
        setUserData(result.user);
        console.log('✅ Данные пользователя успешно загружены');
      } else {
        // Бэкенд вернул ошибку в своём формате
        throw new Error(result.error || 'Неизвестная ошибка от сервера');
      }
    } catch (err) {
      // Ловим и обрабатываем любые ошибки в процессе загрузки
      console.error('❌ Ошибка при загрузке данных:', err);
      setError('Не удалось загрузить данные фермы: ' + err.message);
    }
  };
  // ==========================================================================

  useEffect(() => {
    const initApp = async () => {
      const tg = window.Telegram?.WebApp;

      if (tg) {
        // Мы внутри Telegram Mini Apps
        setIsInTelegram(true);
        console.log('📱 Обнаружен Telegram WebApp SDK');

        // 1. Инициализируем Mini App
        tg.ready();
        tg.expand(); // Растягиваем на весь экран
        console.log('✅ Mini App инициализирован');

        // 2. Загружаем данные пользователя с бэкенда
        await fetchUserData(tg);
      } else {
        // Запуск в обычном браузере (для отладки)
        console.warn('⚠️ Запуск вне Telegram. Режим отладки.');
        // Можете здесь задать тестовые данные, если нужно
        // setUserData({ telegramId: 123, username: 'Тестовый Игрок', coins: 1000 });
      }

      // Снимаем состояние загрузки
      setLoading(false);
    };

    initApp();
  }, []);

  // ==================== ИНТЕРФЕЙС ПОЛЬЗОВАТЕЛЯ ====================
  if (loading) {
    return (
      <div className="app-container">
        <div className="loading">🔄 Загрузка вашей фермы...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="app-container">
        <h1>🌿 Ваша Ферма</h1>
        <div className="error-message">⚠️ {error}</div>
        <p>Попробуйте начать с команды /start в боте или обновить страницу.</p>
      </div>
    );
  }

  // Основной интерфейс игры
  return (
    <div className="app-container">
      <h1>🌿 Ваша Ферма</h1>

      {userData ? (
        // Если данные пользователя загружены
        <>
          <div className="user-info">
            <p>
              👋 Привет, <strong>{userData.username || 'Игрок #${userData.telegramId}'}</strong>!
              {!isInTelegram && <span className="debug-badge"> (режим отладки) </span>}
            </p>
          </div>

          <div className="game-stats">
            <div className="balance-card">
              <h2>Ваш баланс</h2>
              <div className="coins-amount">🪙 {userData.coins || 0} монет</div>
            </div>

            <div className="inventory">
              <h3>🛒 Инвентарь</h3>
              <div className="inventory-grid">
                {/* Здесь можно отображать овощи и животных из userData.farm */}
                <div className="inventory-item">🥕 Морковь: {userData.farm?.vegetables?.get('carrot') || 0}</div>
                <div className="inventory-item">🐄 Корова: {userData.farm?.animals?.get('cow') || 0}</div>
              </div>
            </div>
          </div>

          <div className="action-buttons">
            <button className="btn-harvest" onClick={() => alert('Функция сбора урожая в разработке!')}>
              🥕 Собрать урожай
            </button>
            <button className="btn-shop" onClick={() => alert('Магазин скоро откроется!')}>
              🛒 Открыть магазин
            </button>
            {isInTelegram && (
              <button className="btn-close" onClick={() => window.Telegram.WebApp.close()}>
                ❌ Закрыть приложение
              </button>
            )}
          </div>
        </>
      ) : (
        // Если данные не загрузились (но и ошибки нет)
        <div className="welcome-message">
          <p>Добро пожаловать на ферму! 🌾</p>
          <p>Чтобы начать играть, напишите боту команду <strong>/start</strong> в Telegram.</p>
          <div className="demo-balance">
            <p>Демо-баланс: 🪙 <strong>100</strong> монет</p>
          </div>
        </div>
      )}

      {/* Блок для отладки (виден только в консоли) */}
      <div className="debug-info" style={{ display: 'none' }}>
        <p>User ID: {userData?.telegramId}</p>
        <p>Запуск в Telegram: {isInTelegram ? 'Да' : 'Нет'}</p>
      </div>
    </div>
  );
}

export default App;