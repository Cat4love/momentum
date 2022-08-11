const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const greetingCont = document.querySelector('.greeting-container');
const name = document.querySelector('.name');
const namePlaceholder = document.querySelector('.name::placeholder');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weather = document.querySelector('.weather');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const wind = document.querySelector('.wind');
const humidity = document.querySelector('.humidity');
const city = document.querySelector('.city');
const weatherError = document.querySelector('.weather-error');
const changeQuote = document.querySelector('.change-quote');
const quoteCont = document.querySelector('.quote-container');
const quote = document.querySelector('.quote');
const author = document.querySelector('.author');
const player = document.querySelector('.player');
const audio = document.querySelector('audio');
const play = document.querySelector('.play');
const playPrev = document.querySelector('.play-prev');
const playNext = document.querySelector('.play-next');
const trackList = document.querySelector('.play-list');
const settings = document.querySelector('.settings');
const all = document.querySelector('.all');
const settingsWindow = document.querySelector('.settings-window');
const sourceTag = document.querySelector('.source-tag');

let language = 'en';

function setLocalStorage() {
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('language', language);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language');
    const selectLanguage = document.getElementById('select-language');
    selectLanguage.value = language;
    changeLanguage();
  }
}
window.addEventListener('load', getLocalStorage);

//translate
function changeLanguage() {
  language = selectLanguage.value;
  if (city.value === 'Minsk' && language === 'ru') {
    city.value = 'Минск';
  }
  if (city.value === 'Минск' && language === 'en') {
    city.value = 'Minsk';
  }
  getWeather();
  showTime();
  getQuotes();
}

const selectLanguage = document.getElementById('select-language');
selectLanguage.addEventListener('change', () => {
  changeLanguage();
});
//translate

//time
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
    greeting.textContent = [
      'Доброй ночи',
      'Доброе утро',
      'Добрый день',
      'Добрый вечер',
    ][Math.floor(hours / 6)];
    name.placeholder = 'Введите имя';
  }
}

//greeting

//slider
function getRandomNum(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
let randomNum = getRandomNum(1, 20);

const backgroundSource = document.getElementById('background-source');
backgroundSource.addEventListener('change', setBg);
sourceTag.addEventListener('change', setBg)

function setBg() {
  const timeOfDay = getTimeOfDay();
  const img = new Image();
  if (backgroundSource.value === 'source-github') {
    const bgNum = String(randomNum).padStart(2, '0');
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
    img.addEventListener('load', () => {
      document.body.style.backgroundImage = `url(${img.src})`;
    });
  }
  if (backgroundSource.value === 'source-unsplash') {
    async function getLinkToImageUnsplash() {
      if (sourceTag.value === '') {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${timeOfDay}&client_id=S3zVgQSi3880eCM_HZC1Wz0m48tVcamW_ou-xi8GSao`;
        const res = await fetch(url);
        const data = await res.json();
        img.src = data.urls.regular;
        img.addEventListener('load', () => {
          document.body.style.backgroundImage = `url(${img.src})`;
        });
      } else {
        const url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${sourceTag.value}&client_id=S3zVgQSi3880eCM_HZC1Wz0m48tVcamW_ou-xi8GSao`;
        const res = await fetch(url);
        const data = await res.json();
        img.src = data.urls.regular;
        img.addEventListener('load', () => {
          document.body.style.backgroundImage = `url(${img.src})`;
        });
      }
    }
    getLinkToImageUnsplash()
  }
  if (backgroundSource.value === 'source-flickr') {
    async function getLinkToImageFlickr() {
      if (sourceTag.value === '') {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=605acdc8a3fc03897a77f27e493a8120&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
        const res = await fetch(url);
        const data = await res.json();
        const bgNum = String(getRandomNum(1, 100)).padStart(2, '0');
        console.log(bgNum);
        img.src = data.photos.photo[Number(bgNum)].url_l;
        img.addEventListener('load', () => {
          document.body.style.backgroundImage = `url(${img.src})`;
        });
      } else {
        const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=605acdc8a3fc03897a77f27e493a8120&tags=${sourceTag.value}&extras=url_l&format=json&nojsoncallback=1`;
        const res = await fetch(url);
        const data = await res.json();
        const bgNum = String(getRandomNum(1, 100)).padStart(2, '0');
        console.log(bgNum);
        img.src = data.photos.photo[Number(bgNum)].url_l;
        img.addEventListener('load', () => {
          document.body.style.backgroundImage = `url(${img.src})`;
        });
      }
    }
    getLinkToImageFlickr();
  }
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
  console.log(res.status);
  if (data.cod === '404' || data.cod === '400') {
    weatherError.textContent = `Error!`;
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
    if (city.value === 'Minsk' && language === 'ru') {
      city.value = 'Минск';
    }
    if (city.value === 'Минск' && language === 'en') {
      city.value = 'Minsk';
    }
    getWeather();
  } else {
    if (language === 'en') {
      city.value = 'Minsk';
      getWeather();
    }
    if (language === 'ru') {
      city.value = 'Минск';
      getWeather();
    }
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
});

all.addEventListener('click', (event) => {
  if (event.target.classList.contains('all')) {
    all.classList.add('hidden');
    settingsWindow.classList.remove('settings-window__on');
  }
});
//setings

//show elements
function hideTime() {
  if (timeShow.value === 'off') {
    time.classList.add('hidden');
  }
  if (timeShow.value === 'on') {
    time.classList.remove('hidden');
  }
}
const timeShow = document.getElementById('show-time');
timeShow.addEventListener('change', hideTime);

function hideDate() {
  if (dateShow.value === 'off') {
    data.classList.add('hidden');
  }
  if (dateShow.value === 'on') {
    data.classList.remove('hidden');
  }
}
const dateShow = document.getElementById('show-date');
dateShow.addEventListener('change', hideDate);

function hideGreeting() {
  if (greetingShow.value === 'off') {
    greetingCont.classList.add('hidden');
  }
  if (greetingShow.value === 'on') {
    greetingCont.classList.remove('hidden');
  }
}
const greetingShow = document.getElementById('show-greeting');
greetingShow.addEventListener('change', hideGreeting);

function hideQuote() {
  if (showQuote.value === 'off') {
    quoteCont.classList.add('hidden');
  }
  if (showQuote.value === 'on') {
    quoteCont.classList.remove('hidden');
  }
}
const showQuote = document.getElementById('show-quote');
showQuote.addEventListener('change', hideQuote);

function hideWather() {
  if (weatherShow.value === 'off') {
    weather.classList.add('hidden');
  }
  if (weatherShow.value === 'on') {
    weather.classList.remove('hidden');
  }
}

const weatherShow = document.getElementById('show-weather');
weatherShow.addEventListener('change', hideWather);

function hideAudio() {
  if (audioShow.value === 'off') {
    player.classList.add('hidden');
  }
  if (audioShow.value === 'on') {
    player.classList.remove('hidden');
  }
}

const audioShow = document.getElementById('show-audio');
audioShow.addEventListener('change', hideAudio);

//show elements
