// *************** selectors, variables *************** //

let cells = document.querySelectorAll('.cell');
let scoreX = document.querySelector('.score-x');
let score0 = document.querySelector('.score-0');
let scoreDraw = document.querySelector('.score-draw');

let modalResult = document.querySelector('.modal-result');
let resultButton = document.querySelector('.result-button');
let resultText = document.querySelector('.result-text');

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
    if (select === 0) {
        count = 1;
    } else {
        count = 0;
    }
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
    count = 1;
    selectX.classList.remove('selected');
    select0.classList.add('selected');
})

selectX.addEventListener('click', () => {
    select = 1;
    count = 0;
    select0.classList.remove('selected');
    selectX.classList.add('selected');
})

// *************** scoreboard functional *************** //

scoreboardButton.addEventListener('click', () => {
    modalScoreboard.classList.toggle('active');
})

toggleScoreboard.addEventListener('click', () => {
    modalScoreboard.classList.toggle('active');
})

function scoreAdd(arg) {
    if (arg) {
        if (arg === 'draw') {
            scoreArr.push(`There was a draw!`);
        }

        scoreArr.push(`${arg} won in ${count} moves`)

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

    if (event.target.innerHTML === '') {
        if (count % 2 === 0) {
            event.target.innerHTML = 'X';
            count++;
        } else {
            event.target.innerHTML = '0';
            count++;
        }
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
            resultText.innerHTML = 'Wow, X won!'
            clearField();
            winX++;
            localStorage.setItem('winX', winX);
            scoreX.innerHTML = `X win: ${winX}`
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
            scoreAdd('0')
            modalResult.classList.toggle('active');
            resultText.innerHTML = 'Wow, 0 won!'
            clearField();
            win0++;
            localStorage.setItem('win0', win0);
            score0.innerHTML = `0 win: ${win0}`
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
        scoreAdd('draw')
        modalResult.classList.toggle('active');
        resultText.innerHTML = `Well, it's a draw!`;
        clearField();
        drawCount++;
        localStorage.setItem('drawCount', drawCount);
        scoreDraw.innerHTML = `Draw: ${drawCount}`;
        for (let key of cells) {
            key.innerHTML = '';
        }
    }
})

//