import './score.html';
import './style.scss';

const scoreText = document.querySelector('.score__text');
const scoreSubmit = document.querySelector('.score__button');
let scorePoint = localStorage.getItem('score');
let pathLink = '';

if (scorePoint < 30) {
  scoreText.innerHTML = `Поздравляем вы завершили игру с со счетом: ${scorePoint} очков из 30 возможных!`;
  scoreSubmit.innerHTML = 'Попробовать еще раз';
  pathLink = './quiz.html';
} else {
  scoreText.innerHTML = `Поздравляем вы завершили игру с максимальным счетом в ${scorePoint} очков!`;
  scoreSubmit.innerHTML = 'Перейти в описание';
  pathLink = './greet.html';
}

scoreSubmit.addEventListener('click', () => {
  document.location.href = pathLink;
});
