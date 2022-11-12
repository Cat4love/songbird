import './quiz.html';
import './style.scss';
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
const birdInfo = document.querySelector('.bird__info');
const birdPlayer = document.querySelector('.bird__player');
const birdInstruction = document.querySelector('.bird__instruction');


let randomBird = '';
let score = 0;
let gamePoints = 5;
let family = 0;
volumeBar.value = 100;
volumeBarTwo.value = 100;
let isPlay = false;
let isPlayTwo = false;
let saveTrackTime = 0;
let saveTrackTimeTwo = 0;
let chooseBird = '';






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
  audio.pause();
  play.classList.remove('pause');
  isPlay = false;
  gamePoints = 5;
  randomBird = getRandom(0, 5);
  audio.src = birdsData[family][randomBird].audio;
  console.log(birdsData[family][randomBird])
  birdInstruction.classList.add('view');
  birdInstruction.classList.remove('hide');
  birdPlayer.classList.add('hide');
  birdPlayer.classList.remove('view');
  
}

function getBirdInfo(family, id) {
  birdDesc.innerHTML = birdsData[family][id].description;
  birdName.innerHTML = birdsData[family][id].name;
  birdSecondName.innerHTML = birdsData[family][id].species;
  birdImage.src = birdsData[family][id].image;
  chooseBird = birdsData[family][id].audio;
  audioTwo.src = chooseBird;
  birdInstruction.classList.add('hide');
  birdInstruction.classList.remove('view');
  birdPlayer.classList.add('view');
  birdPlayer.classList.remove('hide');
}

getBirds(family);

quizSubmit.addEventListener('click', () => {
  if (quizSubmit.classList.contains('active') && family < 5) {
    family += 1;
    getBirds(family);
    audio.pause();
    audioTwo.pause();
  } else if (quizSubmit.classList.contains('active') && family === 5) {
    localStorage.setItem('score', `${score}`);
    // document.location.href = './greet.html'
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
    audioTwo.pause();
    saveTrackTimeTwo = 0;
    playTwo.classList.remove('pause');
    isPlayTwo = false;
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
  if (!isPlayTwo && chooseBird !== '') {
    // audioTwo.src = chooseBird;
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
  audioTwo.currentTime = progressBarTwo.value;
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
  saveTrackTime = 0;
  playAudio();
});

audioTwo.addEventListener('ended', () => {
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
