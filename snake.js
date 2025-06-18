const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const box = 20;
let snake = [{ x: 200, y: 200 }];
let food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };
let direction = "RIGHT";
let score = 0;
let level = 1;
let speed = 200;

document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowUp" && direction !== "DOWN") direction = "UP";
    if (event.key === "ArrowDown" && direction !== "UP") direction = "DOWN";
    if (event.key === "ArrowLeft" && direction !== "RIGHT") direction = "LEFT";
    if (event.key === "ArrowRight" && direction !== "LEFT") direction = "RIGHT";
});

function updateGame() {
    let head = { x: snake[0].x, y: snake[0].y };

    if (direction === "UP") head.y -= box;
    if (direction === "DOWN") head.y += box;
    if (direction === "LEFT") head.x -= box;
    if (direction === "RIGHT") head.x += box;

    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = { x: Math.floor(Math.random() * 20) * box, y: Math.floor(Math.random() * 20) * box };

        if (score % 50 === 0) {
            level += 1;
            speed *= 0.9; // Increase difficulty
            clearInterval(gameLoopInterval);
            gameLoopInterval = setInterval(gameLoop, speed);
        }
    } else {
        snake.pop();
    }

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.some(segment => segment.x === head.x && segment.y === head.y)) {
        alert(`Game Over! Final Score: ${score}`);
        resetGame();
    }

    snake.unshift(head);
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = "red";
    ctx.fillRect(food.x, food.y, box, box);
    
    ctx.fillStyle = "green";
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, box, box));

    scoreDisplay.textContent = `Score: ${score} | Level: ${level}`;
}

function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = "RIGHT";
    score = 0;
    level = 1;
    speed = 200;
    clearInterval(gameLoopInterval);
    gameLoopInterval = setInterval(gameLoop, speed);
}

function gameLoop() {
    updateGame();
    drawGame();
}

let gameLoopInterval = setInterval(gameLoop, speed);