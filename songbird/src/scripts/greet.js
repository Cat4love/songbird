import '../greet.html';
import '../styles/style.scss';

const language = document.querySelector('.greetings__select');
const article = document.querySelector('.greetings__article');
const title = document.querySelector('.greeting__title');
const greetButton = document.querySelector('.greetings__start');

let languageFlag;

language.addEventListener('change', () => {
  languageFlag = language.value;
  localStorage.setItem('language112', `${language.value}`);
  changeText();
});

if (localStorage.getItem('language112')) {
  languageFlag = localStorage.getItem('language112');
  language.value = localStorage.getItem('language112');
  changeText();
} else {
  languageFlag = 'RU';
  language.value = 'RU';
  let langOptions = document.querySelectorAll('.greetings__option');
  localStorage.setItem('language112', 'RU');
  for (let option of langOptions) {
    if (option.value === 'RU') {
      option.selected = true;
    }
  }
  changeText();
}

function changeText() {
  if (languageFlag === 'RU') {
    title.innerHTML =
      'Приветствуем в викторине Songbird! Выберите язык:';
    greetButton.innerHTML = 'Начать';
    article.innerHTML = `${'Проверьте свои познания в области орнитологии, соблюдая простые правила:'} 
		<br><br> ${'- В игре будет предложено 6 раундов, в каждом из которых случайным образом замешано 6 птиц.'}  
		<br><br> ${'- Вам предстоит прослушать запись на основном аудио-плеере и выбрать один из предложенных вариантов.'} 
		<br><br>  ${'- Насколько правильным был ваш выбор стоит судить по цветовому и звуковому индикатору.'} 
		<br><br>  ${'- Информация о выбранной птице отобразится в соответствующем блоке.'} 
    <br><br> ${'- Эти сведения так же можно подчеркнуть на странице "Галерея".'} 
		<br><br> ${'- После правильного ответа на вопрос разблокируется кнопка для перехода к следующему раунду.'} 
		<br><br> ${'- По окончанию финального раунда отобразится сумма баллов за текущую игру.'}
		<br><br> ${'- Желаем вам удачи! Для старта нажмите кнопку "Начать".'}`;
  } else {
    title.innerHTML = 'Welcome to Songbird Quiz! Select a language:';
    greetButton.innerHTML = 'Start';
    article.innerHTML = `${'Test your knowledge of ornithology by following these simple rules:'}
    <br><br> ${'- The game will offer 6 rounds, with 6 birds randomly mixed in each round.'}
    <br><br> ${'- You have to listen to the recording on the main audio player and choose one of the options.'}
    <br><br> ${'- How correct was your choice is to be judged by the color and sound indicator.'}
    <br><br> ${'- Information about the selected bird will be displayed in the corresponding block.'}
    <br><br> ${'- This information can also be underlined on the Gallery page.'}
    <br><br> ${'- After answering the question correctly, the button to proceed to the next round is unlocked.'}
    <br><br> ${'- At the end of the final round, the sum of points for the current game will be displayed.'}
    <br><br> ${'- We wish you good luck! To start, press the "Start" button.'}`;
  }
}
