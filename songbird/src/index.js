import './index.html';
import './index.scss';
import birdsData from './modules/birds';

function getBirds(family) {
  const birds = document.querySelector('.quiz__list');
  for (let bird of birdsData[family]) {
    const ul = document.createElement('ul');
    ul.className = 'quiz__item';
    ul.id = bird.id;
    ul.innerHTML = bird.name;
    birds.append(ul);
  }
}

function getBirdInfo(family, id) {
  const img = document.createElement('img');
  const birdWrap = document.querySelector('.bird__wrap');
  const birdName = document.querySelector('.bird__name');
  const birdSecondName = document.querySelector('.bird__species');
  const birdDesc = document.querySelector('.bird__description');
  img.src = birdsData[family][id].image;
  img.className = 'bird__image';
  birdWrap.lastChild.remove();
  birdWrap.append(img);
  birdDesc.innerHTML = birdsData[family][id].description;
  birdName.innerHTML = birdsData[family][id].name;
  birdSecondName.innerHTML = birdsData[family][id].species;
}

function getWinBird(family, id) {
  console.log(Number(id), randomBird)
  const hiddenBirdImage = document.querySelector('.hidden-bird__image');
  const hiddenBirdName = document.querySelector('.hidden-bird__name');
  if (Number(id) === randomBird) {
    hiddenBirdImage.src = birdsData[family][id].image;
    hiddenBirdName.innerHTML = birdsData[family][id].name;
  }
}

let family = 0;
let birds = [];
getBirds(family);

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

let randomBird = getRandom(0, 5);
console.log(randomBird)
document.querySelector('.quiz__list').addEventListener('click', (event) => {
  getBirdInfo(family, event.target.id);
  getWinBird(family, event.target.id);
});

const play = document.querySelector('.play');
const audio = document.querySelector('audio');
const progressBar = document.querySelector('#progress-bar');
const volume = document.querySelector('.volume');
const volumeBar = document.querySelector('#volume-bar');
volumeBar.value = 100;

let isPlay = false;
let saveTrackTime = 0;

function getTrackTime() {
  saveTrackTime = audio.currentTime;
}

function playAudio() {
  if (!isPlay) {
    audio.src = birdsData[family][randomBird].audio;
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

play.addEventListener('click', playAudio);
play.addEventListener('click', getTrackTime);
audio.addEventListener('ended', () => {
  saveTrackTime = 0;
  playAudio();
});

volume.addEventListener('click', mute);
volumeBar.addEventListener('input', () => {
  changeVolume();
});
