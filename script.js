// Перетаскивание окна
const windowElement = document.getElementById('window');
const titleBar = document.getElementById('titleBar');

let isDragging = false;
let offsetX, offsetY;

titleBar.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - windowElement.getBoundingClientRect().left;
    offsetY = e.clientY - windowElement.getBoundingClientRect().top;
    windowElement.style.cursor = 'grabbing';
});

document.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    
    const x = e.clientX - offsetX;
    const y = e.clientY - offsetY;
    
    windowElement.style.left = `${x}px`;
    windowElement.style.top = `${y}px`;
});

document.addEventListener('mouseup', () => {
    isDragging = false;
    windowElement.style.cursor = 'move';
});

// Часы
function updateClock() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    document.getElementById('clock').textContent = `${hours}:${minutes}`;
}
setInterval(updateClock, 1000);
updateClock();

// Медленный прогресс-бар + сбои
const progressBar = document.getElementById('progressBar');
const statusText = document.getElementById('statusText');
let progress = 1;
let isCrashed = false;

const messages = [
    "Загрузка файлов...",
    "Проверка системных требований...",
    "Распаковка архивов...",
    "Инициализация драйверов...",
    "Подключение к модему...",
    "Почти готово...",
    "Осталось немного...",
    "Ищем CD-ROM...",
    "Загрузка DLL...",
    "Пожалуйста, подождите..."
];

function simulateLoading() {
    if (isCrashed) return;
    
    // Медленное увеличение прогресса (1% за 5 секунд)
    progress += 0.02;
    if (progress > 100) progress = 1;
    
    progressBar.style.width = `${progress}%`;
    
    // Рандомное сообщение
    if (Math.random() < 0.1) {
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        statusText.textContent = `${randomMessage} (${Math.floor(progress)}%)`;
    }
    
    // Случайный сбой (5% шанс)
    if (Math.random() < 0.005 && progress < 90) {
        crashSystem();
    }
    
    setTimeout(simulateLoading, 100);
}

// Синий экран смерти (BSOD)
function crashSystem() {
    isCrashed = true;
    
    const bsod = document.createElement('div');
    bsod.className = 'bsod';
    bsod.innerHTML = `
        <div class="bsod-content">
            <p>A fatal exception 0E has occurred at 0028:C0011E36 in VXD VMM(01) + 00010E36.</p>
            <p>The current application will be terminated.</p>
            <p>* Press any key to terminate the current application.</p>
            <p>* Press CTRL+ALT+DEL again to restart your computer.</p>
            <p>You will lose any unsaved information in all applications.</p>
            <br>
            <p>Press any key to continue _</p>
        </div>
    `;
    
    document.body.appendChild(bsod);
    
    // Через 3 секунды "восстановление"
    setTimeout(() => {
        bsod.remove();
        isCrashed = false;
        progress = Math.max(1, progress - 10); // Откат прогресса
        simulateLoading();
    }, 3000);
}

// Звук при клике
windowElement.addEventListener('click', () => {
    const sound = document.getElementById('sound');
    sound.currentTime = 0;
    sound.play();
});

// Запуск симуляции
simulateLoading();