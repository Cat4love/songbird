import './gallery.html';
import './style.scss';
import birdsDataRu from './modules/birdsRu';
import birdsDataEn from './modules/birdsEn';

const play = document.querySelector('.play');
const audio = document.querySelector('audio');
const song = document.querySelector('.player__song');
const progressBar = document.querySelector('#progress-bar');
const volume = document.querySelector('.volume');
const volumeBar = document.querySelector('#volume-bar');
const gallery = document.querySelector('.gallery__birds');
const language = document.querySelector('.header__select');

let birdsData;
volumeBar.value = 100;
let isPlay = false;
let saveTrackTime = 0;
let birdSound;
let languageFlag;

language.addEventListener('change', () => {
  languageFlag = language.value;
  localStorage.setItem('language', `${language.value}`);
  location.reload();
});

if (localStorage.getItem('language')) {
  languageFlag = localStorage.getItem('language');
  language.value = localStorage.getItem('language');
} else {
  languageFlag = 'RU';
  language.value = 'RU';
  let langOptions = document.querySelectorAll('.header__option');
  localStorage.setItem('language', 'RU');
  for (let option of langOptions) {
    if (option.value === 'RU') {
      option.selected = true;
    }
  }
}

if (languageFlag === 'RU') {
  birdsData = birdsDataRu;
} else {
  birdsData = birdsDataEn;
}

function getBirds() {
  for (let i = 0; i < 6; i++) {
    for (let j = 0; j < 6; j++) {
      const div = document.createElement('div');
      div.className = 'gallery__bird';
      const img = document.createElement('img');
      img.className = 'gallery__image';
      img.src = birdsData[i][j].image;
      const infoBox = document.createElement('div');
      infoBox.className = 'gallery__box';
      const info = document.createElement('div');
      info.className = 'gallery__info';
      const name = document.createElement('p');
      name.className = 'gallery__name';
      name.innerHTML = birdsData[i][j].name;
      const species = document.createElement('p');
      species.className = 'gallery__species';
      species.innerHTML = birdsData[i][j].species;
      const desc = document.createElement('p');
      desc.className = 'gallery__desc';
      desc.innerHTML = birdsData[i][j].description;
      const button = document.createElement('button');
      button.id = `${i}${j}`;
      button.className = 'gallery__button';
      div.append(img);
      info.append(name);
      info.append(species);
      infoBox.append(info);
      infoBox.append(button);
      div.append(infoBox);
      div.append(desc);
      gallery.append(div);
    }
  }
}

getBirds();

const playButtons = document.querySelectorAll('.gallery__button');

for (let button of playButtons) {
  button.addEventListener('click', (event) => {
    let id = event.target.id;
    let family = id[0];
    let bird = id[1];
    birdSound = birdsData[family][bird].audio;
    song.innerHTML = birdsData[family][bird].name;
    audio.src = birdSound;
    saveTrackTime = 0;
    play.classList.remove('pause');
    isPlay = false;
    playAudio();
  });
}

function playAudio() {
  if (!isPlay) {
    audio.currentTime = saveTrackTime;
    audio.play();
    play.classList.add('pause');
    isPlay = true;
  } else {
    audio.pause();
    play.classList.remove('pause');
    isPlay = false;
  }
}

function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  document.querySelector('.currentTime').innerHTML = formatTime(
    Math.floor(audio.currentTime)
  );
  if (formatTime(Math.floor(audio.duration)) === 'NaN:NaN') {
    document.querySelector('.durationTime').innerHTML = '0:00';
  } else {
    document.querySelector('.durationTime').innerHTML = formatTime(
      Math.floor(audio.duration)
    );
  }
}

function formatTime(seconds) {
  let min = Math.floor(seconds / 60);
  let sec = Math.floor(seconds - min * 60);
  if (sec < 10) {
    sec = `0${sec}`;
  }
  return `${min}:${sec}`;
}

setInterval(updateProgressValue, 1000);

function changeProgressBar() {
  audio.currentTime = progressBar.value;
  saveTrackTime = progressBar.value;
}

progressBar.addEventListener('input', () => {
  changeProgressBar();
});

function mute() {
  volume.classList.toggle('volumeOff');
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeBar.value = 0;
    changeVolume();
  } else {
    volumeBar.value = 100;
    changeVolume();
  }
}

function changeVolume() {
  audio.volume = volumeBar.value / 100;
  if (audio.volume === 0) {
    volume.classList.add('volumeOff');
  }
  if (audio.volume > 0) {
    volume.classList.remove('volumeOff');
  }
}

function getTrackTime() {
  saveTrackTime = audio.currentTime;
}

play.addEventListener('click', playAudio);

play.addEventListener('click', getTrackTime);

audio.addEventListener('ended', () => {
	isPlay = false;
  saveTrackTime = 0;
  playAudio();
});

volume.addEventListener('click', mute);
volumeBar.addEventListener('input', () => {
  changeVolume();
});

