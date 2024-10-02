const colors = ["green", "red", "yellow", "blue"];
let sequence = [];
let userInput = [];
let level = 0;

const messageElement = document.getElementById("message");
const startButton = document.getElementById("start-button");

// Начало игры
startButton.addEventListener("click", startGame);

function startGame() {
    level = 0;
    sequence = [];
    userInput = [];
    messageElement.textContent = "Запоминайте последовательность...";
    nextSequence();
}

// Генерация следующей последовательности
function nextSequence() {
    userInput = [];
    level++;
    messageElement.textContent = `Уровень ${level}`;

    // Добавление нового цвета в последовательность
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    sequence.push(randomColor);

    // Показ последовательности
    sequence.forEach((color, index) => {
        setTimeout(() => {
            playColor(color);
        }, index * 1000);
    });
}

// Воспроизведение цвета
function playColor(color) {
    const colorBox = document.getElementById(color);
    colorBox.classList.add("active");
    setTimeout(() => {
        colorBox.classList.remove("active");
    }, 500);
}

// Обработка кликов пользователя
colors.forEach(color => {
    const colorBox = document.getElementById(color);
    colorBox.addEventListener("click", () => {
        userInput.push(color);
        playColor(color);
        checkInput();
    });
});

// Проверка ввода пользователя
function checkInput() {
    const lastIndex = userInput.length - 1;

    if (userInput[lastIndex] !== sequence[lastIndex]) {
        messageElement.textContent = "Неправильно! Попробуйте снова.";
        resetGame();
    } else if (userInput.length === sequence.length) {
        showSuccess();
        setTimeout(nextSequence, 1000);
    }
}

// Визуализация успеха
function showSuccess() {
    messageElement.textContent = "Правильно! Переходите к следующему уровню...";
    
    colors.forEach(color => {
        const colorBox = document.getElementById(color);
        colorBox.classList.add("success");
    });

    setTimeout(() => {
        colors.forEach(color => {
            const colorBox = document.getElementById(color);
            colorBox.classList.remove("success");
        });
    }, 1000);
}

// Перезапуск игры
function resetGame() {
    setTimeout(startGame, 2000);
}

