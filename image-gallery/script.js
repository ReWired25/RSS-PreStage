// ---------------------- query selectors ---------------------- //

const infoButton = document.querySelector('.info-button');
const infoUnsplash = document.querySelector('.info-unsplash');
const closeInfo = document.querySelector('.close-info');

const evenPhoto = document.querySelectorAll('.images');
const allPhotos = document.querySelector('.photo-container')
const bigPhoto = document.querySelector('.big-photo');

const generalSearch = document.querySelector('.general-search');
const generalButton = document.querySelector('.general-button');

// ---------------------- general fetch API ---------------------- //

fetch('https://api.unsplash.com/photos/random?&count=12&client_id=KePj_Sn9PZ1NgFSekKlRNQPgmu9pdKqxp3hDsFrTPUM').then((response) => {
    response.json().then((result) => {
        loadImage(result);
    })
});

// ---------------------- functions, listeners ---------------------- //

allPhotos.addEventListener('click', () => {
    if (event.target.classList.contains('images') || event.target.classList.contains('big-photo')) {
        bigPhoto.classList.toggle('active');
        bigPhoto.src = event.target.src;
    }
})

function loadImage(images) {
    evenPhoto.forEach( (item, index) => {
        item.src = images[index].urls.raw + `${`&w=1920&h=1080`}`;
    })
}

generalButton.addEventListener('click', async () => {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${generalSearch.value}&per_page=12&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`);
        const result = await response.json();
        loadImage(result['results']);
})

generalSearch.addEventListener('keyup', async (item) => {
    if (item.keyCode === 13) {
        const response = await fetch(`https://api.unsplash.com/search/photos?query=${generalSearch.value}&per_page=12&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`);
        const result = await response.json();
        loadImage(result['results']);
    }
})

infoButton.addEventListener('click', toOpen);
closeInfo.addEventListener('click', toOpen);

function toOpen() {
    infoUnsplash.classList.toggle('open');
}

setTimeout(() => {
    evenPhoto.forEach(item => {
        item.classList.add('load');
    })
}, 300)

// ---------------------- classic fetch functions ---------------------- //

// generalButton.addEventListener('click', () => {
//     fetch(`https://api.unsplash.com/search/photos?query=${generalSearch.value}&per_page=12&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`).then((response) => {
//     response.json().then((result) => {
//         loadImage(result['results']);
//         })
//     });
// })

// generalSearch.addEventListener('keyup', (item) => {
//     if (item.keyCode === 13) {
//         fetch(`https://api.unsplash.com/search/photos?query=${generalSearch.value}&per_page=12&client_id=SouHY7Uul-OxoMl3LL3c0NkxUtjIrKwf3tsGk1JaiVo`).then((response) => {
//             response.json().then((result) => {
//             loadImage(result['results']);
//             })
//         });
//     }
// })

// ---------------------- self-check ---------------------- //

console.log(`Выполненная самопроверка таска image gallery:

1. Вёрстка +10
    + на странице есть ряд фотографий и строка поиска
    + в футере имеются: ссылка на гитхаб, год создания приложения, логотип курса со ссылкой на курс
2. При загрузке приложения на странице отображаются полученные от API изображения +10
3. Если в поле поиска ввести слово и отправить поисковый запрос, на странице отобразятся изображения соответствующей тематики, если такие данные предоставляет API +10
    + поле поиска функционально, работает как с кнопкой, так и с клавишей enter
4. Поиск +30
    + при открытии приложения курсор находится в поле ввода
    + имеется placeholder в поле ввода
    + автозаполнение/выпадающий список запросов отсутствуют
    + поисковой запрос можно отправить клавишей enter
    + после отправки запроса и появлении результата запрос продолжает отображаться в поле ввода
    + в поле ввода есть крестик, который очищает поле
5. Высокое качество приложения и дополнительный функционал, улучшающий приложение +10
    + есть небольшое описание
    + адаптивная вёрстка
    + добавлена возможность увеличения фотографий

Общая оценка за таск: 70/70.

Проект проверялся на двух браузерах, в том числе в режимах инкогнито, при возникновении проблем попробуйте обновить проект с помощью комбинации ctrl+F5, всё должно работать.
Спасибо всем проверяющим!`);