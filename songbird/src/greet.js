import './greet.html';
import './style.scss';

const language = document.querySelector('.header__select');
const article = document.querySelector('.greetings__article');
const greetButton = document.querySelector('.greetings__start');

let languageFlag;

language.addEventListener('change', () => {
  languageFlag = language.value;
  localStorage.setItem('language', `${language.value}`);
  location.reload();
});

if (localStorage.getItem('language')) {
  languageFlag = localStorage.getItem('language');
  language.value = localStorage.getItem('language');
  changeText();
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

function changeText() {
  if (languageFlag === 'RU') {
		greetButton.innerHTML = 'Начать'
    article.innerHTML = `${'Приветствуем в викторине Songbird!'} 
		<br><br>  ${'Вам предстоит проверить свои знания в области орнитологии и угадать какой из птиц, собранных в коллекцию для вас, принадлежит звонкий голос в таинственном проигрывателе.'} 
		<br><br> ${'Правила игры просты:'}  
		<br><br> ${'- Всего будет 6 блоков-вопросов, в каждом из которых случайным образом замешано 6 птиц.'} 
		<br><br> ${'- Вам предстоит прослушать запись на основном аудио-плеере и выбрать один из предложенных вариантов.'} 
		<br><br>  ${'- После произведдного вами выбора, появится индикатор сообщающий о его правильности. А так же звуковая индикация.'} 
		<br><br>  ${'- Так же есть возможность узнать вашего фаворита ближе, в информационном блоке викторины.'} 
		<br><br> ${'- После правильного ответа на вопрос разблокируется кнопка для перехода к другому вопросу.'} 
		<br><br>  ${'- Просматривать остальных птиц, после правильного выбора - возможно без штрафных баллов.'} 
		<br><br> ${'- В конце игры вам будет предоставлена итоговая сумма баллов за игру.'} 
		<br><br> ${'- Так же есть возможность ознакомиться с информацией обо всех пернатых, учавствующих в викторине - на странице "Галерея".'} 
		<br><br> ${'- Желаем вам удачи, для начала викторины перейдите на страницу "Игра" или нажмите кнопку "Начать".'}`;
  } else {
		greetButton.innerHTML = 'Start'
    article.innerHTML = `${'Welcome to the Songbird quiz!'}
		<br><br> ${'You have to test your knowledge of ornithology and guess which of the birds collected for you belongs to the ringing voice in the mysterious player.'}
		<br><br> ${'The rules of the game are simple:'} 
		<br><br> ${'- There will be 6 question blocks in total, with 6 birds randomly involved in each block.'}
		<br><br> ${'- You have to listen to the recording on the main audio player and choose one of the options.'}
		<br><br> ${'- After you have made your selection, an indicator will appear indicating that it is correct. As well as sound indication.'}
		<br><br> ${'- There is also an opportunity to get to know your favorite closer, in the information block of the quiz.'}
		<br><br> ${'- After answering a question correctly, the button to move to another question is unlocked.'}
		<br><br> ${'- View other birds after correct selection - possibly without penalty points.'}
		<br><br> ${'- At the end of the game you will be given a total score for the game.'}
		<br><br> ${'- It is also possible to get acquainted with information about all the birds participating in the quiz - on the "Gallery" page.'}
		<br><br> ${'- We wish you good luck, to start the quiz go to the "Game" page or click the "Start" button.'}`;
  }
}
