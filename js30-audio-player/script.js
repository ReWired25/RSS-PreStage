// ------------- imports ------------- //

import {
    infoSongs, infoSongsLyrics
} from './assets/js/songsInfo.js';

// -------------- musics -------------- //

const kasabian = new Audio('assets/audio/Kasabian - Bumblebee.mp3');
const joywave = new Audio('assets/audio/Joywave - Obsession.mp3');
const pumarosa = new Audio('assets/audio/Pumarosa - Priestess.mp3');
const districts = new Audio('assets/audio/The Districts - Cheap Regrets.mp3');
const whlung = new Audio('assets/audio/W. H. Lung - Inspiration!.mp3');

const songs = [kasabian, joywave, pumarosa, districts, whlung];

// ----------- images, titles ------------ //

const covers = ['assets/img/bumblebeee.jpg', 'assets/img/obsession.jpg', 'assets/img/priestess.jpg', 'assets/img/cheap-regrets.jpg', 'assets/img/inspiration.jpg'];
const backImages = ['assets/img/background/kasabianfullhd.jpg','assets/img/background/joywavefullhd.jpg','assets/img/background/pumarosafullhd.jpg','assets/img/background/districtsfullhd.jpg','assets/img/background/whlungfullhd.jpg'];
const bandNames = ['Kasabian', 'Joywave', 'Pumarosa', 'The Districts', 'W. H. Lung'];
const songNames = ['Bumblebeee', 'Obsession', 'Priestess', 'Cheap Regrets', 'Inspiration!'];

// -------------- functions -------------- // 

function prevSong() {
    isPlay = false;
    songs[songNumber].pause();
    songNumber--;
    if(songNumber < 0) {
        songNumber = 4;
    };
    album.src = covers[songNumber];
    backImage.src = backImages[songNumber];
    bandTitle.textContent = bandNames[songNumber];
    songTitle.textContent = songNames[songNumber];
    infoText.innerHTML = infoSongs[songNumber];
    infoLyrics.innerHTML = infoSongsLyrics[songNumber];

    let fullTime = songs[songNumber].duration;
    let fullMin = Math.trunc(fullTime / 60);
    let fullSec = Math.trunc(fullTime % 60);
    if (fullSec < 10) {
        durationSpan.innerHTML = `${fullMin}:0${fullSec}`;
    } else {
    durationSpan.innerHTML = `${fullMin}:${fullSec}`;
    }

    songs[songNumber].currentTime = 0;
    play(songNumber);
}

function nextSong() {
    isPlay = false;
    songs[songNumber].pause();
    songNumber++;
    if (songNumber > 4) {
        songNumber = 0;
    }
    album.src = covers[songNumber];
    backImage.src = backImages[songNumber];
    bandTitle.textContent = bandNames[songNumber];
    songTitle.textContent = songNames[songNumber];
    infoText.innerHTML = infoSongs[songNumber];
    infoLyrics.innerHTML = infoSongsLyrics[songNumber];

    let fullTime = songs[songNumber].duration;
    let fullMin = Math.trunc(fullTime / 60);
    let fullSec = Math.trunc(fullTime % 60);
    if (fullSec < 10) {
        durationSpan.innerHTML = `${fullMin}:0${fullSec}`;
    } else {
    durationSpan.innerHTML = `${fullMin}:${fullSec}`;
    }

    songs[songNumber].currentTime = 0;
    play(songNumber);
}

function play() {
    if (isPlay === false) {
        songs[songNumber].play();
        playImg.src = 'assets/svg/pause.svg';
        isPlay = true;
        songs[songNumber].ontimeupdate = progressUpdate;
    } else if (isPlay === true) {
        songs[songNumber].pause();
        playImg.src = 'assets/svg/play-button-1.svg';
        isPlay = false;
    };
};

function volumeChange() {
    songs.forEach(item => {
        item.volume = volume.value / 100;
    });
}

function infoSong() {
    infoContainer.classList.toggle('active');
}

function progressUpdate() {
    let fullTime = songs[songNumber].duration;
    let currTime = songs[songNumber].currentTime;
    progress.value = 100 * currTime / fullTime;

    let currMin = Math.trunc(currTime / 60);
    let currSec = Math.trunc(currTime % 60);
    if (currSec < 10) {
        currentSpan.innerHTML = `${currMin}:0${currSec}`;
    } else {
    currentSpan.innerHTML = `${currMin}:${currSec}`;
    }

    // audioProgress.style.width = `${310 * currTime / fullTime}px`;
}

function changePlace() {
    let fullSong  = songs[songNumber].duration;
    progress.value = (event.offsetX / progress.offsetWidth) * fullSong;
    songs[songNumber].currentTime = (event.offsetX / progress.offsetWidth) * fullSong;
}

// -------------- variables, selectors -------------- // 

let isPlay = false;
let songNumber = 0;

const album = document.querySelector('.album-cover');
const playImg = document.querySelector('.play-img');
const bandTitle = document.querySelector('.band-name');
const songTitle = document.querySelector('.song-name');
const playButton = document.querySelector('.play-button');
const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const volume = document.querySelector('.volume-range');
const infoButton = document.querySelector('.info-button');
const infoContainer = document.querySelector('.info-container');
const infoCloseButton = document.querySelector('.info-close');
const progress = document.querySelector('.progress-bar');
const durationSpan = document.querySelector('.duration');
const currentSpan = document.querySelector('.current');
const infoText = document.querySelector('.info-song-text');
const infoLyrics = document.querySelector('.info-song-lyrics');
// const audioProgress = document.querySelector('.audio-progress');
const backImage = document.querySelector('.background-image');

playButton.addEventListener('click', play);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
volume.addEventListener('input', volumeChange);
infoButton.addEventListener('click', infoSong);
progress.addEventListener('click', changePlace);
infoCloseButton.addEventListener('click', infoSong);

// -------------- self-check -------------- // 

console.log(`Выполненная самооценка таска audio-player:
1. Вёрстка +10
    + есть кнопка Play/Pause, кнопки "Вперёд" и "Назад" для пролистывания аудиотреков, прогресс-бар, отображается название и автор трека
    + в футере приложения есть ссылка на гитхаб, год создания приложения, логотип курса со ссылкой на курс
2. Кнопка Play/Pause +10
    + есть кнопка Play/Pause, при клике по которой можно запустить или остановить проигрывание аудиотрека
    + внешний вид и функционал кнопки Play/Pause изменяется в зависимости от того, проигрывается ли в данный момент аудиотрек
3. При кликах по кнопкам "Вперёд" и "Назад" переключается проигрываемый аудиотрек, аудиотреки пролистываются по кругу +10
4. При смене аудиотрека меняются изображения +10
5. Прогресс-бар отображает прогресс проигрывания аудиотрека. При перемещении ползунка меняется текущее время аудиотрека +10
6. Отображается продолжительность аудиотрека и его текущее время +10
7. Высокое качество оформления приложения и/или дополнительный не предусмотренный в задании функционал, улучшающий качество приложения +10
    + Добавлены бэкграунд изображения
    + Добавлено инфо
    + Добавлена возможность изменения звука
    
Общая оценка таска: 70/70`);