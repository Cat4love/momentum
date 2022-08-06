//time
const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const namePlaceholder = document.querySelector('.name::placeholder');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const changeQuote = document.querySelector('.change-quote');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const audio = document.querySelector('audio');
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const trackList = document.querySelector('.play-list');
const settings = document.querySelector('.settings');
const all = document.querySelector('.all');
const settingsWindow = document.querySelector('.settings-window');

let language = 'ru';

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
  showDate();
  showGreeting();
}

showTime();

function showDate() {
  const date = new Date();
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const currentDate = date.toLocaleDateString(`${language}`, options);
  data.textContent = currentDate;
}
//time

//greeting
function getTimeOfDay() {
  const date = new Date();
  const hours = date.getHours();
  return ['night', 'morning', 'afternoon', 'evening'][Math.floor(hours / 6)];
}

function showGreeting() {
  if (language === 'en') {
    greeting.textContent = `Good ${getTimeOfDay()}`;
    name.placeholder = 'Enter name';
  }
  if (language === 'ru') {
    const date = new Date();
    const hours = date.getHours();
    greeting.textContent = ['Доброй ночи', 'Доброе утро', 'Добрый день', 'Добрый вечер'][Math.floor(hours / 6)];
    name.placeholder = 'Введите имя';
  }
}

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
  } else {
    city.value = 'efasfa';
  }
}
window.addEventListener('load', getLocalStorage);
//greeting

//slider
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomNum = getRandomNum(1, 20);

function setBg() {
  const timeOfDay = getTimeOfDay();
  const bgNum = String(randomNum).padStart(2, '0');
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
  img.addEventListener('load', () => {
    document.body.style.backgroundImage = `url(${img.src})`;
  });
}

setBg();

function getSlideNext() {
  if (randomNum + 1 === 21) {
    randomNum = 1;
  } else {
    randomNum += 1;
  }
  setBg();
}
slideNext.addEventListener('click', getSlideNext);

function getSlidePrev() {
  if (randomNum - 1 === 0) {
    randomNum = 20;
  } else {
    randomNum -= 1;
  }
  setBg();
}
slidePrev.addEventListener('click', getSlidePrev);
//slider

//weather
async function getWeather() {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=5e6a18dd46aeb701230f1dac90b8123c&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  if (data.cod === '404') {
    weatherError.textContent = `Error! city not found for '${city.value}'!`;
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  } else {
    weatherError.textContent = '';
    weatherIcon.className = 'weather-icon owf';
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    if (language === 'en') {
      wind.textContent = `Wind speed: ${Math.round(data.wind.speed)}m/s`;
      humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%.`;
    }
    if (language === 'ru') {
      wind.textContent = `Скорость ветра: ${Math.round(data.wind.speed)}m/s`;
      humidity.textContent = `Влажность: ${Math.round(data.main.humidity)}%.`;
    }
  }
}

function setLocalStorageWeather() {
  localStorage.setItem('city', city.value);
}
window.addEventListener('beforeunload', setLocalStorageWeather);

function getLocalStorageWeather() {
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    getWeather();
  } else {
    city.value = 'Minsk';
    getWeather();
  }
}
window.addEventListener('load', getLocalStorageWeather);

city.addEventListener('change', getWeather);
//weather

//quote
async function getQuotes() {
  const quotes = `assets/data-${language}.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  const randomQuote = getRandomNum(0, 19);
  quote.textContent = `"${data[randomQuote].text}"`;
  author.textContent = data[randomQuote].author;
}
getQuotes();

changeQuote.addEventListener('click', getQuotes);
//quote

//audio
import playList from './playList.js';

for (let i = 0; i < playList.length; i++) {
  const li = document.createElement('li');
  li.classList.add('play-item');
  li.textContent = `${playList[i].title}`;
  trackList.append(li);
}

let isPlay = false;
let playNum = 0;

function playAudio() {
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = 0;
    audio.play();
    isPlay = true;
    document
      .querySelectorAll('.play-list > li')
      [playNum].classList.add('item-active');
    track.innerHTML = playList[playNum].title;
  } else {
    audio.pause();
    isPlay = false;
  }
}
function nextTrack() {
  document
    .querySelectorAll('.play-list > li')
    [playNum].classList.remove('item-active');
  if (playNum + 1 === playList.length) {
    playNum = 0;
  } else {
    playNum += 1;
  }
  isPlay = false;
  playAudio();
  toggleBtn();
}
function prevTrack() {
  document
    .querySelectorAll('.play-list > li')
    [playNum].classList.remove('item-active');
  if (playNum - 1 === -1) {
    playNum = playList.length - 1;
  } else {
    playNum -= 1;
  }
  isPlay = false;
  playAudio();
  toggleBtn();
}

function toggleBtn() {
  if (!isPlay) {
    play.classList.remove('pause');
  } else {
    play.classList.add('pause');
  }
}

play.addEventListener('click', playAudio);
play.addEventListener('click', toggleBtn);
playNext.addEventListener('click', nextTrack);
playPrev.addEventListener('click', prevTrack);

audio.addEventListener('ended', nextTrack);

//audio
//settings
settings.addEventListener('click', () => {
  all.classList.toggle('hidden');
  settingsWindow.classList.toggle('settings-window__on');
})

all.addEventListener('click', (event) => {
  if (event.target.classList.contains('all')) {
    all.classList.add('hidden');
    settingsWindow.classList.remove('settings-window__on');
  }
})
//setings

