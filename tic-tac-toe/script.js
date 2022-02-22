// *************** selectors, variables *************** //

let cells = document.querySelectorAll('.cell');
let scoreX = document.querySelector('.score-x');
let score0 = document.querySelector('.score-0');
let scoreDraw = document.querySelector('.score-draw');

let modalResult = document.querySelector('.modal-result');
let resultButton = document.querySelector('.result-button');
let resultText = document.querySelector('.result-text');
let resultCount = document.querySelector('.result-count');

let scoreboardButton = document.querySelector('.scoreboard-button');
let modalScoreboard = document.querySelector('.modal-scoreboard');
let scoreboardItems = document.querySelectorAll('.scoreboard-item');
let toggleScoreboard = document.querySelector('.toggle-scoreboard');

let selectX = document.querySelector('.select-x');
let select0 = document.querySelector('.select-0');

let footerGit = document.querySelector('.github-logo');
let footerRs = document.querySelector('.rs-link');
let themeButton = document.querySelector('.dark-light');

let count = 0;
let winX = 0;
let win0 = 0;
let drawCount = 0;
let darkOrLight = 0;
let select = 1;
let scoreArr = [];

// *************** local get function *************** //

window.addEventListener('load', () => {
    let localX = localStorage.getItem('winX');
    let local0 = localStorage.getItem('win0');
    let localDraw = localStorage.getItem('drawCount');
    let localTheme = localStorage.getItem('darkOrLight');
    let localScore = localStorage.getItem('scoreArr');

    if (localX) {
        scoreX.innerHTML = `X win: ${localX}`;
        winX = +localX;
    }

    if (local0) {
        score0.innerHTML = `0 win: ${local0}`;
        win0 = +local0;
    }

    if (localDraw) {
        scoreDraw.innerHTML = `Draw: ${localDraw}`;
        drawCount = +localDraw;
    }

    if (localTheme) {
        if (localTheme === '1') {
            changeTheme();
        }
    }

    if (localScore) {
        scoreArr = localScore.split(',');
        scoreAdd();
    }
})

// *************** themes function *************** //

themeButton.addEventListener('click', changeTheme);

function changeTheme() {
    if (darkOrLight === 0) {
        document.documentElement.style.setProperty('--back', '#f0f7f7');
        document.documentElement.style.setProperty('--text', '#481eae');
        document.documentElement.style.setProperty('--borders', '#f79f1a');

        footerGit.src = 'svg/github-icon_light.svg';
        footerRs.classList.toggle('light');
        themeButton.classList.toggle('light');
    }

    if (darkOrLight === 1) {
        document.documentElement.style.setProperty('--back', '#181818');
        document.documentElement.style.setProperty('--text', '#3af750');
        document.documentElement.style.setProperty('--borders', '#cf42cf');

        footerGit.src = 'svg/github-icon-green.svg';
        footerRs.classList.toggle('light');
        themeButton.classList.toggle('light');
    }

    darkOrLight === 0? darkOrLight = 1 : darkOrLight = 0;
    localStorage.setItem('darkOrLight', darkOrLight);
}

// *************** clear field function *************** //

function clearField() {
    cells.forEach(item => {
        item.innerHTML = '';
    })
    count = 0;
}

// *************** equal array function *************** //

function equalArr(arr1, arr2) {
    let finalArg = arr1.map(item => {
        if (!arr2.includes(item)) {
            return false;
        }
        return true;
    })

    return finalArg.includes(false) ? false : true;
}

// *************** winning combinations *************** //

let fullArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// *************** result, select listeners *************** //

resultButton.addEventListener('click', () => {
    modalResult.classList.toggle('active');
})

select0.addEventListener('click', () => {
    select = 0;
    selectX.classList.remove('selected');
    select0.classList.add('selected');
})

selectX.addEventListener('click', () => {
    select = 1;
    select0.classList.remove('selected');
    selectX.classList.add('selected');
})

function firstMove(player1, player2) {
    if (event.target.innerHTML === '') {
        if (count % 2 === 0) {
            event.target.innerHTML = player1;
            count++;
        } else {
            event.target.innerHTML = player2;
            count++;
        }
    }
}

// *************** scoreboard functional *************** //

scoreboardButton.addEventListener('click', () => {
    modalScoreboard.classList.toggle('active');
})

toggleScoreboard.addEventListener('click', () => {
    modalScoreboard.classList.toggle('active');
})

function scoreAdd(arg) {
    if (arg === 'draw' || arg === 'X' || arg === '0') {
        if (arg === 'draw') {
            scoreArr.push(`There was a draw!`);
        } else {
            scoreArr.push(`${arg} won in ${count} moves`);
        }

        if (scoreArr.length > 10) {
            scoreArr.shift();
        }
    }

    for (let key in scoreArr) {
        scoreboardItems[key].innerHTML = `${+key + 1}:&nbsp;&nbsp;&nbsp;${scoreArr[key]}`;
    }

    localStorage.setItem('scoreArr', scoreArr);
}

// *************** general function of game *************** //

field.addEventListener('click', () => {

    if (select === 0) {
        firstMove('0', 'X')
    } else {
        firstMove('X', '0')
    }

// *************** logic for X *************** //

    let arrX = [];
    
    cells.forEach((item, index) => {
        if (item.innerHTML === 'X') {
            arrX.push(index);
        };
    })

    for (let key of fullArr) {
        if (equalArr(key, arrX)) {
            scoreAdd('X')
            modalResult.classList.toggle('active');
            resultText.innerHTML = 'Wow, X won!';
            resultCount.innerHTML = `${count} moves!`;
            clearField();
            winX++;
            localStorage.setItem('winX', winX);
            scoreX.innerHTML = `X win: ${winX}`;
        }
    }

// *************** logic for 0 *************** //

    let arr0 = [];

    cells.forEach((item, index) => {
        if (item.innerHTML === '0') {
            arr0.push(index);
        };
    })

    for (let key of fullArr) {
        if (equalArr(key, arr0)) {
            scoreAdd('0');
            modalResult.classList.toggle('active');
            resultText.innerHTML = 'Wow, 0 won!';
            resultCount.innerHTML = `${count} moves!`;
            clearField();
            win0++;
            localStorage.setItem('win0', win0);
            score0.innerHTML = `0 win: ${win0}`;
        }
    }

// *************** logic for draw *************** //

    function draw() {
        for (let key of cells) {
            if (key.innerHTML === '') {
                return false;
            }
        }

        return true;
    }

    if (draw()) {
        scoreAdd('draw');
        modalResult.classList.toggle('active');
        resultText.innerHTML = `Well, it's a draw!`;
        resultCount.innerHTML = `Try again!`;
        clearField();
        drawCount++;
        localStorage.setItem('drawCount', drawCount);
        scoreDraw.innerHTML = `Draw: ${drawCount}`;
        for (let key of cells) {
            key.innerHTML = '';
        }
    }
})

// *************** self-check *************** //

console.log(`Выполненная самопроверка таска tic-tac-toe:

1. Вёрстка +10
    + реализован интерфейс игры
    + в футере приложения есть ссылка на гитхаб, год создания приложения и ссылка на курс
2. При кликах по игровому полю по очереди отображаются крестики и нолики. Первая фигура всегда крестик +10
3. Игра завершается, когда три фигуры выстроились в ряд по вертикали, горизонтали или диагонали +10
4. По окончанию игры выводится её результат - выигравшая фигура и количество ходов +10
    + количество ходов записывается в scoreboard
5. Результаты сохраняются в local storage. Есть таблица рекордов, в которой отображаются результаты предыдущих 10 игр +10
6. Анимации или звуки, или настройки игры +10
    + из настроек: фигура, которая пойдёт первой, смена темы, есть анимация кнопки в модалке + ховеры
7. Высокое качество оформления приложения, дополнительный функционал, улучшающий качество приложения +10
    + свой дизайн, смена темы

Общая оценка за таск: 70/70`);