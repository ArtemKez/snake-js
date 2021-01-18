let direction = 'right';
let score = 0;
let mouse;
let input;
let field_width = 20;
let speed = 500;
let bomb;
let speed_changed = false;
let interval;
generateGameField();

let snake = generateSnake();

addSnakeClasses();
createMouse();
createBomb();
generateInput();
updateMove(speed);

function updateMove(duration) {
    stopMove()
    interval = setInterval(move, duration)
}

function stopMove() {
    if (interval) {
        clearInterval(interval);
        interval = null;
    }
}

function selectElemByCords(x, y) {
    return document.querySelector('[posX = "' + x + '"][posY = "' + y + '"]')
}

function move() {
    let snakeCoordinates = [snake[0].getAttribute('posX'), snake[0].getAttribute('posY')];

    snake[0].classList.remove('head');
    snake[snake.length - 1].classList.remove('snakeBody');
    snake.pop();

    selectElemByCords(+snakeCoordinates[0] - 1, snakeCoordinates[1])

    switch (direction) {
        case 'right':
            snake.unshift(selectElemByCords((snakeCoordinates[0] < field_width) ? +snakeCoordinates[0] + 1 : 1, snakeCoordinates[1]));
            break;
        case 'left':
            snake.unshift(selectElemByCords((snakeCoordinates[0] > 1) ? +snakeCoordinates[0] - 1 : field_width, snakeCoordinates[1]));
            break;
        case 'up':
            snake.unshift(selectElemByCords(snakeCoordinates[0], (snakeCoordinates[1] < field_width) ? +snakeCoordinates[1] + 1 : 1));
            break;
        case 'down':
            snake.unshift(selectElemByCords(snakeCoordinates[0], (snakeCoordinates[1] > 1) ? +snakeCoordinates[1] - 1 : field_width));
            break;
    }

    if (snake[0].getAttribute('posX') === mouse.getAttribute('posX') && snake[0].getAttribute('posY') === mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        let a = snake[snake.length - 1].getAttribute('posX');
        let b = snake[snake.length - 1].getAttribute('posY');
        snake.push(selectElemByCords(a, b));
        createMouse();
        score++;
        input.value = `Ваши очки: ${score}, speed: ${speed}`;
    }

    if (snake[0].classList.contains('bomb')) {
        setTimeout(() => {
            alert(`игра окончена. Ваши очки: ${score}`)
        }, 200)

        stopMove();
        snake[0].style.background = 'url("./snake-js/eat_bomb.png") center no-repeat';
        snake[0].style.borderRadius = '50%';
        snake[0].style.backgroundSize = "cover";
    }

    if (snake[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            alert(`игра окончена. Ваши очки: ${score}`)
        }, 200)

        stopMove();
        snake[0].style.background = 'url("./snake-js/klipartz.com.png") center no-repeat';
        snake[0].style.backgroundSize = "cover";
    }

    addSnakeClasses();

    if (speed > 50 && score !== 0 && score % 5 === 0 && !speed_changed) {
        speed -= 50;
        speed_changed = true
        updateMove(speed)
    } else if (score % 5 !== 0) {
        speed_changed = false
    }
}

window.addEventListener('keydown', function (e) {
    const code = e.code;
    switch (code) {
        case 'ArrowLeft':
        case 'KeyA':
            if (direction !== 'right') {
                direction = 'left';
            }
            break;
        case 'ArrowUp':
        case 'KeyW':
            if (direction !== 'down') {
                direction = 'up';
            }
            break;
        case 'ArrowRight':
        case 'KeyD':
            if (direction !== 'left') {
                direction = 'right';
            }
            break;
        case 'ArrowDown':
        case 'KeyS':
            if (direction !== 'up') {
                direction = 'down';
            }
            break;
        case 'Escape':
            if (!interval) {
                updateMove(speed);
            } else {
                stopMove()
            }
            break;
    }
});

function generateGameField() {
    let field = document.createElement('div');
    document.getElementById('fieldSnake').appendChild(field);
    field.classList.add('field');

    for (let i = 1; i < 401; i++) {
        let excel = document.createElement('div');
        field.appendChild(excel);
        excel.classList.add('excel');
    }

    let excel = document.getElementsByClassName('excel');
    let x = 1,
        y = field_width;

    for (let i = 0; i < 400; i++) {
        if (x > field_width) {
            x = 1;
            y--;
        }
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        x++;
    }
}

function generateSnake() {
    let posX = random(3, field_width);
    let posY = random(1, field_width);

    return [
        selectElemByCords(posX, posY),
        selectElemByCords(posX - 1, posY),
        selectElemByCords(posX - 2, posY)
    ]
}

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createMouse() {
    function generateMouse() {
        let posX = random(1, field_width);
        let posY = random(1, field_width);
        return [posX, posY];
    }

    let mouseCoordinates = generateMouse();

    mouse = selectElemByCords(mouseCoordinates[0], mouseCoordinates[1])
    while (mouse.classList.contains('snakeBody')) {
        let mouseCoordinates = generateMouse();
        mouse = selectElemByCords(mouseCoordinates[0], mouseCoordinates[1]);
    }
    mouse.classList.add('mouse');
}

function createBomb() {
    function generateBomb() {
        let posX = random(1, field_width);
        let posY = random(1, field_width);
        return [posX, posY];
    }

    let bombCoordinates = generateBomb();

    bomb = selectElemByCords(bombCoordinates[0], bombCoordinates[1])
    while (bomb.classList.contains('snakeBody')) {
        let bombCoordinates = generateBomb();
        bomb = selectElemByCords(bombCoordinates[0], bombCoordinates[1]);
    }
    bomb.classList.add('bomb');
}

function addSnakeClasses() {
    snake[0].classList.add('head');
    for (let i = 0; i < snake.length; i++) {
        snake[i].classList.add('snakeBody');
    }
}

function generateInput() {
    input = document.createElement('input');
    document.getElementById('fieldSnake').appendChild(input);

    input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display: block;
`;
    input.value = `Ваши очки: ${score}`;
}
