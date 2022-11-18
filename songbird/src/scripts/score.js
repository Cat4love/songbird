import '../score.html';
import '../styles/style.scss';
import fanfareAudio from '../assets/audio/fanfare.mp3';

const scoreText = document.querySelector('.score__text');
const scoreSubmit = document.querySelector('.score__button');
let scorePoint = localStorage.getItem('score');
let pathLink = '';
let languageFlag = localStorage.getItem('language');

if (scorePoint < 30) {
  if (languageFlag === 'RU') {
    scoreText.innerHTML = `Поздравляем вы завершили игру с со счетом: ${scorePoint} очков из 30 возможных!`;
    scoreSubmit.innerHTML = 'Попробовать еще раз';
  } else {
    scoreText.innerHTML = `Congratulations, you completed the game with: ${scorePoint} points out of 30!`;
    scoreSubmit.innerHTML = 'Try Again';
  }
  pathLink = './quiz.html';
} else {
  if (languageFlag === 'RU') {
    scoreText.innerHTML = `Поздравляем вы завершили игру с максимальным счетом в ${scorePoint} очков!`;
    scoreSubmit.innerHTML = 'Перейти в описание';
  } else {
    scoreText.innerHTML = `Congratulations, you have completed the game with a maximum score of ${scorePoint} points!`;
    scoreSubmit.innerHTML = 'Go to description';
  }
  pathLink = './greet.html';
}

scoreSubmit.addEventListener('click', () => {
  document.location.href = pathLink;
});

(function getSoundFanfare() {
  const myAudio = new Audio(fanfareAudio);
  myAudio.autoplay = true;
})();
