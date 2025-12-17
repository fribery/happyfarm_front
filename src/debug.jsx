import { useEffect, useState } from 'react';
function Debug() {
    const [log, setLog] = useState('Начало...\n');
    useEffect(() => {
        let newLog = log;
        const tg = window.Telegram?.WebApp;
        newLog += `1. Telegram доступен? ${!!tg}\n`;
        if (tg) {
            tg.ready();
            newLog += `2. Telegram.ready() вызван\n`;
            const userId = tg.initDataUnsafe?.user?.id;
            newLog += `3. User ID из Telegram: ${userId}\n`;
            // Простейший запрос к вашему API
            fetch('https://happyfarms-production.up.railway.app', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ userId: userId })
            })
            .then(r => newLog += `4. Ответ API: ${r.status}\n`)
            .catch(e => newLog += `4. Ошибка API: ${e}\n`)
            .finally(() => setLog(newLog));
        } else {
            newLog += '2. НЕ в Telegram. Остановка.\n';
            setLog(newLog);
        }
    }, []);
    return <div style={{whiteSpace: 'pre-line', padding: '20px'}}>{log}</div>;
}
export default Debug;