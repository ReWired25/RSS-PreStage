// ***** General functions and imports ***** //

import i18Obj from './assets/js/translate.js';

function active(item, container) {
    let stillActive = container.querySelector('.active');
    if (stillActive !== null) {
        stillActive.classList.remove('active');
    };
    item.classList.add('active');
};

function translate(lang) {
    let langObj = document.querySelectorAll('[data-lang]');
    let translateObj = i18Obj[lang];

    langObj.forEach(item => {
        if (translateObj.hasOwnProperty(item.dataset.lang)) {
            item.textContent = translateObj[item.dataset.lang];
            if (item.placeholder) {
                item.placeholder = translateObj[item.dataset.lang];
                item.textContent = '';
            }
        };
    });
};

// ***** local storage functional ***** //

function getLocal() {
    if (localStorage.getItem('language')) {
        let theme = localStorage.getItem('theme');
        let lang = localStorage.getItem('language');
        let activeLang = document.querySelectorAll('.language-button');

        if (theme === 'light') changeTheme();
        translate(lang);
        activeLang[0].textContent === lang ? activeLang[0].classList.add('active') :
        activeLang[1].classList.add('active');
    };
};

window.addEventListener('load', getLocal);

// ***** Burger menu functional ***** //

let burgerMenu = document.querySelector('.burger-menu');
let navMenu = document.querySelector('nav');
let overlay = document.querySelector('.overlay');

burgerMenu.addEventListener('click', toOpen);
navMenu.addEventListener('click', toOpen);
overlay.addEventListener('click', toOpen);

function toOpen() {
    burgerMenu.classList.toggle('open');
    navMenu.classList.toggle('open');
    overlay.classList.toggle('open');
};

// ***** Photos preload function ***** //

function preloadPhotos() {
    let images = new Image();
    let folders = ['autumn','winter','spring','summer'];
    for (let item of folders) {
        for (let i = 0; i <= 5; i++) {
            images.src = `assets/img/${item}/${item}-${i}.jpg`
        };
    };
};

preloadPhotos();

// ***** Portfolio functional ***** //

let portfolioButtons = document.querySelector('.portfolio-buttons');
let portfolioImage = document.querySelectorAll('.portfolio-photo');


portfolioButtons.addEventListener('click', () => {
    if (event.target.classList.contains('transparent-button')) {
        active(event.target, portfolioButtons);
        let data = event.target.dataset.photos;
        portfolioImage.forEach((item, index) => {
        item.src = `assets/img/${data}/${data}-${index}.jpg`;
        })
    };
});

// ***** Translate functional ***** //

let langButtons = document.querySelector('.language-check');

langButtons.addEventListener('click', () => {
    if (event.target.classList.contains('language-button')) {
        active(event.target, langButtons);
        translate(event.target.textContent);
        let language = event.target.textContent;
        localStorage.setItem('language', language);
    };
});

// ***** Themes functional ***** //

let moonSun = document.querySelector('.moon-and-sun');

function changeTheme() {
    moonSun.classList.toggle('light');
    let themeItems = ['body','.logo','.burger-line','.nav-links','nav','.language-check','.language-button','#hero','h1','.hero-text','.gold-button','.transparent-button','.section-head','h3','.skill-text','h4','.cost','.price-text','#contacts','.contacts-input','.contacts-head','.footer-git','.footer-git-link','.footer-rs','.footer-link'];
    for (let item of themeItems) {
        let elem = document.querySelectorAll(item);
        for (let elemItem of elem) {
            elemItem.classList.toggle('light');
        };
    };
    if (moonSun.classList.contains('light')) {
        localStorage.setItem('theme', 'light')
    } else {
        localStorage.setItem('theme', 'dark');
    }
    // moonSun.classList.contains('light') ? localStorage.setItem('theme', 'light') :
    // localStorage.setItem('theme', 'dark');
}

moonSun.addEventListener('click', changeTheme);

// ***** self-check ***** //


















































// console.log(`Выполненная самооценка таска Portfolio Part 2:

// 1. Вёрстка соответствует макету на ширине экрана 768px +48
//     + header
//     + hero
//     + skills
//     + portfolio
//     + video
//     + price
//     + contacts
//     + footer
// 2. Отсутствует горизонтальная полоса прокрутки на разрешениях до 320px включительно, весь контент сохраняется +15
//     + при ширине от 1440px до 768px
//     + при ширине от 768px до 480px
//     + при ширине от 480px до 320px
// 3. На ширине экрана 768px появляется адаптивное меню +22
//     + реализована бургер-иконка
//     + при нажатии на бургер плавно появляется адаптивное меню, бургер становится крестиком
//     + высота адаптивного меню равна высоте экрана, при ширине экрана 768-620px — соответствует макету, при ширине экрана меньше меню занимает всю ширину экрана
//     + при нажатии на крестик адаптивное меню плавно скрывается, крестик становится бургером
//     + бургер-иконка создана с помощью CSS
//     + ссылки в адаптивном меню обеспечивают плавную прокрутку по якорям
//     + при клике по ссылке адаптивное меню плавно скрывается, крестик становится бургер-иконкой

// Общая оценка за задание: 85 баллов.

// PS: Есть некоторые проблемы у макета в панели выбора языков и в области skills, при вёрстке выбор был сделан в пользу исправления (как описано в "особенностях проверки вёрстки" в задании.
// Вёрстка и интерактивность проверялись на нескольких браузерах, если что-то отрабаывает некорректно, попробуйте обновить страницу с помощью Ctrl + F5, спасибо!`);