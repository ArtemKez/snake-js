let direction = 'right';
let steps = false;
let score = 0;
let mouse;
let input;
let field_width = 20;
let speed = 300;
generateGameField();

let snake = generateSnake();

addSnakeClasses();
createMouse()
generateInput()

let interval = setInterval(move, speed);


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

function clear() {
    if (score > 1) {
        interval = setInterval(move, 100);
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

    if (direction === 'right') {
        if (snakeCoordinates[0] < field_width) {
            snake.unshift(selectElemByCords(+snakeCoordinates[0] + 1, snakeCoordinates[1]));
        } else {
            snake.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction === 'left') {
        if (snakeCoordinates[0] > 1) {
            snake.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snake.unshift(document.querySelector('[posX = "' + field_width + '"][posY = "' + snakeCoordinates[1] + '"]'));

        }
    } else if (direction === 'up') {
        if (snakeCoordinates[1] < field_width) {
            snake.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
        } else {
            snake.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));

        }
    } else if (direction === 'down') {
        if (snakeCoordinates[1] > 1) {
            snake.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1] - 1) + '"]'));
        } else {
            snake.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + field_width + '"]'));
        }
    }

    if (snake[0].getAttribute('posX') === mouse.getAttribute('posX') && snake[0].getAttribute('posY') === mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        let a = snake[snake.length - 1].getAttribute('posX');
        let b = snake[snake.length - 1].getAttribute('posY');
        snake.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
        score++;
        input.value = `Ваши очки: ${score}, spped: ${speed}`;
    }

    if (snake[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            alert(`игра окончена. Ваши очки: ${score}`)
        }, 200)

        stopMove();
        snake[0].style.background = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVaZsvfBwoMklptsBSVKY4S8wCRCUY7alnGQ&usqp=CAU) center no-repeat';
        snake[0].style.backgroundSize = "cover";
    }

    addSnakeClasses();

    steps = true;
    if(speed > 50 && score !== 0 && score % 5 === 0){
        speed -=50;
        updateMove(speed)
    }
}


window.addEventListener('keydown', function (e) {
    const keyKode = e.key;
    if (steps === true) {
        if (keyKode === 'ArrowLeft' && direction !== 'right') {
            direction = 'left';
            steps = false;
        } else if (keyKode === 'ArrowUp' && direction !== 'down') {
            direction = 'up';
            steps = false;
        } else if (keyKode === 'ArrowRight' && direction !== 'left') {
            direction = 'right';
            steps = false;
        } else if (keyKode === 'ArrowDown' && direction !== 'up') {
            direction = 'down';
            steps = false;
        }
    }
});

function generateGameField() {
    let field = document.createElement('div');
    document.body.appendChild(field);
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

    return [document.querySelector('[posX = "' + posX + '"][posY = "' + posY + '"]'),
        document.querySelector('[posX = "' + (posX - 1) + '"][posY = "' + posY + '"]'),
        document.querySelector('[posX = "' + (posX - 2) + '"][posY = "' + posY + '"]')]
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

    mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]')
    while (mouse.classList.contains('snakeBody')) {
        let mouseCoordinates = generateMouse();
        mouse = document.querySelector('[posX = "' + mouseCoordinates[0] + '"][posY = "' + mouseCoordinates[1] + '"]');
    }
    mouse.classList.add('mouse');
}

function addSnakeClasses() {
    snake[0].classList.add('head');
    for (let i = 0; i < snake.length; i++) {
        snake[i].classList.add('snakeBody');
    }
}

function generateInput() {
// ГАВНО!!!!
    input = document.createElement('input');
    document.body.appendChild(input);

    input.style.cssText = `
margin: auto;
margin-top: 40px;
font-size: 30px;
display: block;
`;
    input.value = `Ваши очки: ${score}`;
}
