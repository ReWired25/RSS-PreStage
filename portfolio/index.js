let burgerMenu = document.querySelector('.burger-menu');
let navMenu = document.querySelector('nav');

burgerMenu.addEventListener('click', toOpen);
navMenu.addEventListener('click', toOpen);

function toOpen() {
    burgerMenu.classList.toggle('open');
    navMenu.classList.toggle('open');
};

console.log(`Выполненная самооценка таска:

1. Вёрстка валидная: +10
2. Вёрстка семантическая: +20
Присутствуют:
<header>, <main>, <footer>
<section> шесть элементов
<h1> единственный на странице
<h2> пять элементов
<nav> в меню хедера
ul>li>a два списка: меню хедера, соцсети футера
<button> десять кнопок (в т.ч. видео)
<input> email и tel присутствуют
<textarea> присутствует
placeholder - три атрибута в инпутах и textarea
3. Вёрстка соответствует макету во всех секциях: +48
4. CSS: +12
Используются флексы
При уменьшении масштаба страницы вёрстка остаётся в центре
Фоновый цвет на всю ширину
Все иконки добавлены в svg формате
Изображения — jpg
Присутствует favicon
5. Интерактивность CSS: +20
Есть прокрутка по якорям
Рабочие ссылки в футере на гитхаб и страницу курса
Интерактивные элементы изменяют фон/шрифт, изменяется вид курсора
Интерактивность плавная и корректная относительно соседних элементов

Общая оценка: 110.`);