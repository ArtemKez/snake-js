let direction = 'right';
let steps = false;
let score = 0;
let mouse;
let input;

generateGameField();
let snakeHead = generateSnakeHead();

let snakeBody = [document.querySelector('[posX = "' + snakeHead[0] + '"][posY = "' + snakeHead[1] + '"]'),
    document.querySelector('[posX = "' + (snakeHead[0] - 1) + '"][posY = "' + snakeHead[1] + '"]'),
    document.querySelector('[posX = "' + (snakeHead[0] - 2) + '"][posY = "' + snakeHead[1] + '"]')];

addSnakeClasses();
createMouse()
generateInput()


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

function move() {
    let snakeCoordinates = [snakeBody[0].getAttribute('posX'), snakeBody[0].getAttribute('posY')];

    snakeBody[0].classList.remove('head');
    snakeBody[snakeBody.length - 1].classList.remove('snakeBody');
    snakeBody.pop();

    if (direction === 'right') {
        if (snakeCoordinates[0] < 20) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] + 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "1"][posY = "' + snakeCoordinates[1] + '"]'));
        }
    } else if (direction === 'left') {
        if (snakeCoordinates[0] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + (+snakeCoordinates[0] - 1) + '"][posY = "' + snakeCoordinates[1] + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "20"][posY = "' + snakeCoordinates[1] + '"]'));

        }
    } else if (direction === 'up') {
        if (snakeCoordinates[1] < 20) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (+snakeCoordinates[1] + 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "1"]'));

        }
    } else if (direction === 'down') {
        if (snakeCoordinates[1] > 1) {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "' + (snakeCoordinates[1] - 1) + '"]'));
        } else {
            snakeBody.unshift(document.querySelector('[posX = "' + snakeCoordinates[0] + '"][posY = "20"]'));
        }
    }

    if (snakeBody[0].getAttribute('posX') === mouse.getAttribute('posX') && snakeBody[0].getAttribute('posY') === mouse.getAttribute('posY')) {
        mouse.classList.remove('mouse');
        let a = snakeBody[snakeBody.length - 1].getAttribute('posX');
        let b = snakeBody[snakeBody.length - 1].getAttribute('posY');
        snakeBody.push(document.querySelector('[posX = "' + a + '"][posY = "' + b + '"]'));
        createMouse();
        score++;
        input.value = `Ваши очки: ${score}`;
    }

    if (snakeBody[0].classList.contains('snakeBody')) {
        setTimeout(() => {
            alert(`игра окончена. Ваши очки: ${score}`)
        }, 200)

        clearInterval(interval);
        snakeBody[0].style.background = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSVaZsvfBwoMklptsBSVKY4S8wCRCUY7alnGQ&usqp=CAU) center no-repeat';
        snakeBody[0].style.backgroundSize = "cover";
    }

    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
    }

    steps = true;
}

let interval = setInterval(move, 300);

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
        y = 20;

    for (let i = 0; i < 400; i++) {
        if (x > 20) {
            x = 1;
            y--;
        }
        excel[i].setAttribute('posX', x);
        excel[i].setAttribute('posY', y);
        x++;
    }
}

function generateSnakeHead() {
    let posX = random(3, 20);
    let posY = random(1, 20);
    return [posX, posY];
}

function random(min, max) {
    return Math.round(Math.random() * (max - min) + min);
}

function createMouse() {
    function generateMouse() {
        let posX = random(1, 20);
        let posY = random(1, 20);
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
    snakeBody[0].classList.add('head');
    for (let i = 0; i < snakeBody.length; i++) {
        snakeBody[i].classList.add('snakeBody');
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
