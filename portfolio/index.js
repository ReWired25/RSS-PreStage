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
    moonSun.classList.contains('light') ? localStorage.setItem('theme', 'light') :
    localStorage.setItem('theme', 'dark');
}

moonSun.addEventListener('click', changeTheme);

// ***** self-check ***** //

console.log(`Выполненная самооценка таска Portfolio Part 3:

1. Смена изображений в секции portfolio +25
    + при кликах по кнопкам autumn, winter, spring, summer происходит смена изображений на соответствующие указанному сезону
    + активная кнопка выделяется стилем
2. Перевод страницы на два языка +25
    + при клике по надписи ru в хедере страница переводится на русский язык
    + при клике по надписи en — на английский язык
    + активная подсветка надписей соответствует текущему языку
3. Переключение светлой и тёмной темы +25
    + на страницу добавлен переключатель при клике по которому:
        * тёмная тема приложения сменяется светлой
        * светлая тема приложения сменяется тёмной
        * интерактивные элементы изменяют внешний вид при взаимодействии на обеих темах, при этом остаются видимыми на странице
4. Дополнительный функционал: локальное хранилище +5
    + выбранный язык и тема оформления сохраняются при перезагрузке страницы
5. Дополнительный функционал: реализация сложных эффектов интерактивности кнопок +5
    + две реализации: с кнопками портфолио и с остальными кнопками на странице

Общая оценка задания: 85/85

Вёрстка и интерактивность проверялись на нескольких браузерах, если что-то отрабаывает некорректно, попробуйте обновить страницу с помощью Ctrl + F5, спасибо!`);