import './index.html';
import './index.scss';
import birdsData from './modules/birds';

const questions = document.querySelectorAll('.questions__item');
const quizSubmit = document.querySelector('.quiz__submit');
const birdWrap = document.querySelector('.bird__wrap');
const birdName = document.querySelector('.bird__name');
const birdSecondName = document.querySelector('.bird__species');
const birdDesc = document.querySelector('.bird__description');
const birdImage = document.querySelector('.bird__image');
const questionImage = document.querySelector('.question__image');
const qusetionAnswer = document.querySelector('.qusetion__answer');
const play = document.querySelector('.play');
const audio = document.querySelector('audio');
const progressBar = document.querySelector('#progress-bar');
const volume = document.querySelector('.volume');
const volumeBar = document.querySelector('#volume-bar');
const gameScore = document.querySelector('.game__score');
const birds = document.querySelector('.quiz__answers');

let randomBird = getRandom(0, 5);
let score = 0;
let gamePoints = 5;
let family = 0;
volumeBar.value = 100;
let isPlay = false;
let saveTrackTime = 0;

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getBirds(family) {
  birds.innerHTML = '';
  for (let i = 0; i < birdsData[family].length; i++) {
    const li = document.createElement('li');
    li.className = 'quiz__answer';
    li.id = birdsData[family][i].id;
    li.innerHTML = birdsData[family][i].name;
    birds.append(li);
  }

  for (let i = 0; i < questions.length; i++) {
    questions[i].classList.remove('active');
    questions[i].classList.add('inactive');
    if (i === family) {
      questions[i].classList.add('active');
    }
  }

  quizSubmit.classList.remove('active');
  questionImage.src = './assets/images/hidden_bird.jpg';
  qusetionAnswer.innerHTML = '******';
  saveTrackTime = 0;
  audio.src = birdsData[family][randomBird].audio;
  audio.pause();
  play.classList.remove('pause');
  isPlay = false;
  gamePoints = 5;
  randomBird = getRandom(0, 5);
}

function getBirdInfo(family, id) {
  birdDesc.innerHTML = birdsData[family][id].description;
  birdName.innerHTML = birdsData[family][id].name;
  birdSecondName.innerHTML = birdsData[family][id].species;
  birdImage.src = birdsData[family][id].image;
}

getBirds(family);

quizSubmit.addEventListener('click', () => {
  if (quizSubmit.classList.contains('active') && family < 5) {
    family += 1;
    getBirds(family);
  } else if (quizSubmit.classList.contains('active') && family === 5) {
    console.log('you win');
  } else {
    return;
  }
});

document.querySelector('.quiz__answers').addEventListener('click', (event) => {
  if (event.target.classList.contains('quiz__answer')) {
    let id = Number(event.target.id);
    if (Number(id) === randomBird) {
      questionImage.src = birdsData[family][id].image;
      qusetionAnswer.innerHTML = birdsData[family][id].name;
      event.target.classList.add('active');
      if (!quizSubmit.classList.contains('active')) {
        score += gamePoints;
        gameScore.innerText = `Score:${score}`;
      }
      quizSubmit.classList.add('active');
    } else {
      event.target.classList.add('inactive');
      if (!quizSubmit.classList.contains('active')) {
        gamePoints -= 1;
      }
    }
    getBirdInfo(family, id);
  }
});

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
