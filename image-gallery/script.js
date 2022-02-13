const infoButton = document.querySelector('.info-button');
const infoUnsplash = document.querySelector('.info-unsplash');
const closeInfo = document.querySelector('.close-info');
const allPhotos = document.querySelector('.photo-container')
const bigPhoto = document.querySelector('.big-photo');

infoButton.addEventListener('click', toOpen);
closeInfo.addEventListener('click', toOpen);

function toOpen() {
    infoUnsplash.classList.toggle('open');
}

allPhotos.addEventListener('click', () => {
    if (event.target.classList.contains('images') || event.target.classList.contains('big-photo')) {
        bigPhoto.classList.toggle('active');
        bigPhoto.src = event.target.src;
    }
})