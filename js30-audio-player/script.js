// -------------- musics -------------- //

const kasabian = new Audio('assets/audio/Kasabian - Bumblebee.mp3');
const joywave = new Audio('assets/audio/Joywave - Obsession.mp3');
const pumarosa = new Audio('assets/audio/Pumarosa - Priestess.mp3');
const districts = new Audio('assets/audio/The Districts - Cheap Regrets.mp3');
const whlung = new Audio('assets/audio/W. H. Lung - Inspiration!.mp3');

const songs = [kasabian, joywave, pumarosa, districts, whlung];

// -------------- images, titles -------------- //

const covers = ['assets/img/bumblebeee.jpg', 'assets/img/obsession.jpg', 'assets/img/priestess.jpg', 'assets/img/cheap-regrets.jpg', 'assets/img/inspiration.jpg'];
const bandNames = ['Kasabian', 'Joywave', 'Pumarosa', 'The Districts', 'W. H. Lung'];
const songNames = ['Bumblebee', 'Obsession', 'Priestess', 'Cheap Regrets', 'Inspiration!'];

// -------------- functions -------------- // 

function prevSong() {
    isPlay = false;
    songs[songNumber].pause();
    songNumber--;
    if(songNumber < 0) {
        songNumber = 4;
    };
    album.src = covers[songNumber];
    bandTitle.textContent = bandNames[songNumber];
    songTitle.textContent = songNames[songNumber];
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
    bandTitle.textContent = bandNames[songNumber];
    songTitle.textContent = songNames[songNumber];
    play(songNumber);
}

function play() {
    if (isPlay === false) {
        songs[songNumber].currentTime = 0;
        songs[songNumber].play();
        playImg.src = 'assets/svg/pause.svg';
        isPlay = true;
    } else if (isPlay === true) {
        songs[songNumber].pause();
        playImg.src = 'assets/svg/play-button-1.svg';
        isPlay = false;
    };
};

function volumeChange() {
    songs[songNumber].volume = volume.value / 100;
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

playButton.addEventListener('click', play);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
volume.addEventListener('input', volumeChange);