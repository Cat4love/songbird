import '../quiz.html';
import '../styles/style.scss';
import birdsDataRu from './birdsRu';
import birdsDataEn from './birdsEn';
import winAudio from '../assets/audio/win.mp3';
import loseAudio from '../assets/audio/lose.mp3';

const questionsList = document.querySelector('.questions-list');
const quizSubmit = document.querySelector('.quiz__submit');
const birdWrap = document.querySelector('.bird__wrap');
const birdName = document.querySelector('.bird__name');
const birdSecondName = document.querySelector('.bird__species');
const birdDesc = document.querySelector('.bird__description');
const birdImage = document.querySelector('.bird__image');
const questionImage = document.querySelector('.question__image');
const qusetionAnswer = document.querySelector('.qusetion__answer');
const play = document.querySelector('.play');
const playTwo = document.querySelector('.playTwo');
const audio = document.querySelector('audio');
const audioTwo = document.querySelector('.audio');
const progressBar = document.querySelector('#progress-bar');
const progressBarTwo = document.querySelector('#progress-barTwo');
const volume = document.querySelector('.volume');
const volumeTwo = document.querySelector('.volumeTwo');
const volumeBar = document.querySelector('#volume-bar');
const volumeBarTwo = document.querySelector('#volume-barTwo');
const gameScore = document.querySelector('.game__score');
const birds = document.querySelector('.quiz__answers');
const birdInstruction = document.querySelector('.bird__instruction');
const language = document.querySelector('.header__select');

let languageFlag;
let birdsData;
let randomBird;
let score = 0;
let gamePoints = 5;
let family = 0;
volumeBar.value = 100;
volumeBarTwo.value = 100;
let isPlay = false;
let isPlayTwo = false;
let saveTrackTime = 0;
let saveTrackTimeTwo = 0;

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
    if(option.value === 'RU'){
      option.selected = true;
    }
  }
}

if (languageFlag === 'RU') {
  birdsData = birdsDataRu;
  birdInstruction.innerHTML =
    'Пожалуйста, прослушайте плеер и выберите вариант ответа.';
  gameScore.innerHTML = 'Очки: 0'
} else {
  birdsData = birdsDataEn;
  birdInstruction.innerHTML =
    'Please listen to the player and choose an answer.';
  gameScore.innerHTML = 'Score: 0'
}

function getRandom(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getQuestions() {
  let birdsEn = [
    'Warm-up',
    'Sparrows',
    'Forest birds',
    'Songbirds',
    'Predator birds',
    'Sea birds',
  ];
  let birdsRu = [
    'Разминка',
    'Воробьиные',
    'Лесные птицы',
    'Певчие птицы',
    'Хищные птицы',
    'Морские птицы',
  ];
  for (let i = 0; i < 6; i++) {
    const li = document.createElement('li');
    li.className = 'questions__item';
    if (languageFlag === 'RU') {
      li.innerHTML = birdsRu[i];
    } else {
      li.innerHTML = birdsEn[i];
    }
    questionsList.append(li);
  }
}

function getBirds(family) {
  birds.innerHTML = '';
  for (let i = 0; i < birdsData[family].length; i++) {
    const li = document.createElement('li');
    li.className = 'quiz__answer';
    li.id = birdsData[family][i].id;
    li.innerHTML = birdsData[family][i].name;
    const span = document.createElement('span');
    span.className = 'quiz__indicator';
    li.append(span);
    birds.append(li);
  }
  chooseActiveFamily();
  gamePoints = 5;
  randomBird = getRandom(0, 5);
  questionImage.src = '../assets/images/bird.svg';
  qusetionAnswer.innerHTML = '******';
  saveTrackTime = 0;
  saveTrackTimeTwo = 0;
  audio.pause();
  audioTwo.pause();
  play.classList.remove('pause');
  playTwo.classList.remove('pause');
  isPlay = false;
  isPlayTwo = false;
  audio.src = birdsData[family][randomBird].audio;
  quizSubmit.classList.remove('active');
  quizSubmit.classList.add('inactive');
  birdInstruction.classList.remove('hide');
  birdWrap.classList.add('hide');
  birdInstruction.classList.add('view');
  birdWrap.classList.remove('view');
  if (family === 5) {
    if (languageFlag === 'RU') {
      quizSubmit.innerHTML = 'Завершить игру';
    } else {
      quizSubmit.innerHTML = 'Finish the game';
    }
  } else {
    if (languageFlag === 'RU') {
      quizSubmit.innerHTML = 'Следующий вопрос';
    } else {
      quizSubmit.innerHTML = 'Next question';
    }
  }
}

getQuestions();
getBirds(family);
setTimeout(getStartBirdInfo(family, 0));

function chooseActiveFamily() {
  const questions = document.querySelectorAll('.questions__item');
  for (let i = 0; i < questions.length; i++) {
    questions[i].classList.remove('active');
    questions[i].classList.add('inactive');
    if (i === family) {
      questions[i].classList.add('active');
      questions[i].classList.remove('inactive');
    }
  }
}

function getBirdInfo(family, id) {
  birdDesc.innerHTML = birdsData[family][id].description;
  birdName.innerHTML = birdsData[family][id].name;
  birdSecondName.innerHTML = birdsData[family][id].species;
  birdImage.src = birdsData[family][id].image;
  audioTwo.pause();
  saveTrackTimeTwo = 0;
  playTwo.classList.remove('pause');
  isPlayTwo = false;
  audioTwo.src = birdsData[family][id].audio;
  birdInstruction.classList.add('hide');
  birdWrap.classList.remove('hide');
  birdInstruction.classList.remove('view');
  birdWrap.classList.add('view');
}

function getStartBirdInfo(family, id) {
  birdDesc.innerHTML = birdsData[family][id].description;
  birdName.innerHTML = birdsData[family][id].name;
  birdSecondName.innerHTML = birdsData[family][id].species;
  birdImage.src = birdsData[family][id].image;
  audioTwo.src = birdsData[family][id].audio;
}

document.querySelector('.quiz__answers').addEventListener('click', (event) => {
  if (event.target.classList.contains('quiz__answer')) {
    let id = Number(event.target.id);
    if (id === randomBird) {
      questionImage.src = birdsData[family][id].image;
      qusetionAnswer.innerHTML = birdsData[family][id].name;
      if (!quizSubmit.classList.contains('active')) {
        event.target.children[0].innerHTML = '&#10003';
        event.target.children[0].style.color = 'green';
        score += gamePoints;
        if (languageFlag === 'RU') {
          gameScore.innerText = `Очки: ${score}`;
        } else {
          gameScore.innerText = `Score: ${score}`;
        }
        getSoundwin();
        getTrackTime();
        audio.pause();
        play.classList.remove('pause');
        isPlay = false;
      }
      quizSubmit.classList.add('active');
      quizSubmit.classList.remove('inactive');
    } else {
      if (
        !quizSubmit.classList.contains('active') &&
        event.target.children[0].style[0] !== 'color'
      ) {
        gamePoints -= 1;
        event.target.children[0].innerHTML = '&#215';
        event.target.children[0].style.color = 'red';
        getSoundLoss();
      }
    }
    getBirdInfo(family, id);
  }
});

quizSubmit.addEventListener('click', () => {
  if (quizSubmit.classList.contains('active') && family < 5) {
    family += 1;
    getBirds(family);
  } else if (quizSubmit.classList.contains('active') && family === 5) {
    localStorage.setItem('score', `${score}`);
    document.location.href = './score.html';
  } else {
    return;
  }
});

function getTrackTime() {
  saveTrackTime = audio.currentTime;
  saveTrackTimeTwo = audioTwo.currentTime;
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

function playAudioTwo() {
  if (!isPlayTwo) {
    audioTwo.currentTime = saveTrackTimeTwo;
    audioTwo.play();
    playTwo.classList.add('pause');
    isPlayTwo = true;
  } else {
    audioTwo.pause();
    playTwo.classList.remove('pause');
    isPlayTwo = false;
  }
}

function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  progressBarTwo.max = audioTwo.duration;
  progressBarTwo.value = audioTwo.currentTime;
  document.querySelector('.currentTime').innerHTML = formatTime(
    Math.floor(audio.currentTime)
  );
  document.querySelector('.currentTimeTwo').innerHTML = formatTime(
    Math.floor(audioTwo.currentTime)
  );
  if (formatTime(Math.floor(audio.duration)) === 'NaN:NaN') {
    document.querySelector('.durationTime').innerHTML = '0:00';
  } else {
    document.querySelector('.durationTime').innerHTML = formatTime(
      Math.floor(audio.duration)
    );
  }
  if (formatTime(Math.floor(audioTwo.duration)) === 'NaN:NaN') {
    document.querySelector('.durationTimeTwo').innerHTML = '0:00';
  } else {
    document.querySelector('.durationTimeTwo').innerHTML = formatTime(
      Math.floor(audioTwo.duration)
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
  audioTwo.currentTime = progressBarTwo.value;
  saveTrackTimeTwo = progressBarTwo.value;
}

progressBar.addEventListener('input', () => {
  changeProgressBar();
});
progressBarTwo.addEventListener('input', () => {
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

function muteTwo() {
  volumeTwo.classList.toggle('volumeOff');
  audioTwo.muted = !audioTwo.muted;
  if (audioTwo.muted) {
    volumeBarTwo.value = 0;
    changeVolumeTwo();
  } else {
    volumeBarTwo.value = 100;
    changeVolumeTwo();
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

function changeVolumeTwo() {
  audioTwo.volume = volumeBarTwo.value / 100;
  if (audioTwo.volume === 0) {
    volumeTwo.classList.add('volumeOff');
  }
  if (audioTwo.volume > 0) {
    volumeTwo.classList.remove('volumeOff');
  }
}

play.addEventListener('click', playAudio);
playTwo.addEventListener('click', playAudioTwo);

play.addEventListener('click', getTrackTime);
playTwo.addEventListener('click', getTrackTime);

audio.addEventListener('ended', () => {
  isPlay = false;
  saveTrackTime = 0;
  playAudio();
});

audioTwo.addEventListener('ended', () => {
  isPlayTwo = false;
  saveTrackTimeTwo = 0;
  playAudioTwo();
});

volume.addEventListener('click', mute);
volumeBar.addEventListener('input', () => {
  changeVolume();
});
volumeTwo.addEventListener('click', muteTwo);
volumeBarTwo.addEventListener('input', () => {
  changeVolumeTwo();
});

function getSoundwin() {
  const myAudio = new Audio(winAudio);
  myAudio.autoplay = true;
}

function getSoundLoss() {
  const myAudio = new Audio(loseAudio);
  myAudio.autoplay = true;
}
