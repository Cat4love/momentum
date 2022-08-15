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
const track = document.querySelector('.track');
const settings = document.querySelector('.settings');
const all = document.querySelector('.all');
const settingsWindow = document.querySelector('.settings-window');
const sourceTag = document.querySelector('.source-tag');
const timeSpan = document.querySelector('.time-span');
const dateSpan = document.querySelector('.date-span');
const greetingSpan = document.querySelector('.greeting-span');
const quoteSpan = document.querySelector('.quote-span');
const weatherSpan = document.querySelector('.weather-span');
const audioSpan = document.querySelector('.audio-span ');
const languageSpan = document.querySelector('.settings-language');
const sourceSpan = document.querySelector('.settings-source');
const backgroundSource = document.getElementById('background-source');
const timeShow = document.getElementById('show-time');
const dateShow = document.getElementById('show-date');
const greetingShow = document.getElementById('show-greeting');
const showQuote = document.getElementById('show-quote');
const weatherShow = document.getElementById('show-weather');
const audioShow = document.getElementById('show-audio');
const todo = document.querySelector('.todo');
const todoWindow = document.querySelector('.todo-window');


//localStorage
let language = 'en';


function setLocalStorage() {
  const elementsArray = [
    timeShow.value,
    dateShow.value,
    greetingShow.value,
    showQuote.value,
    weatherShow.value,
    audioShow.value,
  ];
  localStorage.setItem('name', name.value);
  localStorage.setItem('city', city.value);
  localStorage.setItem('language', language);
  localStorage.setItem('source', backgroundSource.value);
  localStorage.setItem('sourceTag', sourceTag.value);
  localStorage.setItem('elements', elementsArray);
}
window.addEventListener('beforeunload', setLocalStorage);

function getLocalStorage() {
  if (localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
  if (localStorage.getItem('city')) {
    city.value = localStorage.getItem('city');
    if (city.value === 'Minsk' && language === 'ru') {
      city.value = 'Минск';
    }
    if (city.value === 'Минск' && language === 'en') {
      city.value = 'Minsk';
    }
  } else {
    if (language === 'en') {
      city.value = 'Minsk';
    }
    if (language === 'ru') {
      city.value = 'Минск';
    }
  }
  if (localStorage.getItem('language')) {
    language = localStorage.getItem('language');
    const selectLanguage = document.getElementById('select-language');
    selectLanguage.value = language;
    changeLanguage();
  }
  if (localStorage.getItem('sourceTag')) {
    sourceTag.value = localStorage.getItem('sourceTag');
  }
  if (localStorage.getItem('source')) {
    backgroundSource.value = localStorage.getItem('source');
    setBg();
  } else {
    backgroundSource.value = 'source-github';
    setBg();
  }
  if (localStorage.getItem('elements')) {
    const elementsArray = [
      timeShow,
      dateShow,
      greetingShow,
      showQuote,
      weatherShow,
      audioShow,
    ];
    elementsArray.forEach((element, index) => {
      element.value = localStorage.getItem('elements').split(',')[index];
    })
  }
    hideTime();
    hideDate();
    hideGreeting();
    hideQuote();
    hideWather();
    hideAudio();
    updateProgressValue();
}
window.addEventListener('load', getLocalStorage);
//localStorage

//translate
function changeLanguage() {
  language = selectLanguage.value;
  if (city.value === 'Minsk' && language === 'ru') {
    city.value = 'Минск';
  }
  if (city.value === 'Минск' && language === 'en') {
    city.value = 'Minsk';
  }
  showTime();
  getQuotes();
  changeSettings();
  getWeather();
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

backgroundSource.addEventListener('change', setBg);
sourceTag.addEventListener('change', setBg);

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
      try {
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
        } catch(e) {
        console.log(e);
        backgroundSource.value = 'source-github';
        setBg()
      }
    }
    getLinkToImageUnsplash();
  }
  if (backgroundSource.value === 'source-flickr') {
    async function getLinkToImageFlickr() {
      try {
        if (sourceTag.value === '') {
          const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=605acdc8a3fc03897a77f27e493a8120&tags=${timeOfDay}&extras=url_l&format=json&nojsoncallback=1`;
          const res = await fetch(url);
          const data = await res.json();
          const bgNum = String(getRandomNum(1, 100)).padStart(2, '0');
          img.src = data.photos.photo[Number(bgNum)].url_l;
          img.addEventListener('load', () => {
            document.body.style.backgroundImage = `url(${img.src})`;
          });
        } else {
          const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=605acdc8a3fc03897a77f27e493a8120&tags=${sourceTag.value}&extras=url_l&format=json&nojsoncallback=1`;
          const res = await fetch(url);
          const data = await res.json();
          const bgNum = String(getRandomNum(1, 100)).padStart(2, '0');
          img.src = data.photos.photo[Number(bgNum)].url_l;
          img.addEventListener('load', () => {
            document.body.style.backgroundImage = `url(${img.src})`;
          });
        } 
      } catch(e) {
        console.log(e);
        backgroundSource.value = 'source-github';
        setBg()
      }
    }
    getLinkToImageFlickr();
  }
}

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
  try {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=5e6a18dd46aeb701230f1dac90b8123c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
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
  } catch(e) {
    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${language}&appid=5e6a18dd46aeb701230f1dac90b8123c&units=metric`;
    const res = await fetch(url);
    const data = await res.json();
    if(data.cod === '404') {
      weatherError.textContent = `Error! City not found for "${city.value}".`}
    if(data.cod === '400') {
      weatherError.textContent = `Error! Please enter city.`};
    weatherIcon.className = 'weather-icon owf';
    temperature.textContent = '';
    weatherDescription.textContent = '';
    wind.textContent = '';
    humidity.textContent = '';
  }
}
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
  li.id = `track${i}`;
  li.textContent = `${playList[i].title}`;
  trackList.append(li);
}

let isPlay = false;
let playNum = 0;
let saveTrackTime = 0;

function getTrackTime() {
  saveTrackTime = audio.currentTime;
}

function playAudio() {
  document.querySelectorAll('.play-list > li').forEach(element => element.classList.remove('item-active'));
  if (!isPlay) {
    audio.src = playList[playNum].src;
    audio.currentTime = saveTrackTime;
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
  saveTrackTime = 0;
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
  saveTrackTime = 0;
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


document.querySelectorAll('.play-list > li').forEach(element => element.addEventListener('click', () => {
  const trackNumber = Number(element.id[5]);
  if (!isPlay) {
    playNum = trackNumber;
    document.querySelectorAll('.play-list > li').forEach(element => element.classList.remove('item-active'));
    playAudio();
    toggleBtn();
  } else if (isPlay && playNum === trackNumber){
    document.querySelectorAll('.play-list > li').forEach(element => element.classList.remove('item-active'));
    playAudio();
    toggleBtn();
  } else if (isPlay && playNum !== trackNumber){
    document.querySelectorAll('.play-list > li').forEach(element => element.classList.remove('item-active'));
    playNum = trackNumber;
    playAudio();
    playAudio();
    toggleBtn();
  }
}))

play.addEventListener('click', playAudio);
play.addEventListener('click', getTrackTime);
play.addEventListener('click', toggleBtn);
playNext.addEventListener('click', nextTrack);
playPrev.addEventListener('click', prevTrack);
audio.addEventListener('ended', nextTrack);

//audio plus
const progressBar = document.querySelector('#progress-bar'); 
const currentTime = document.querySelector('.currentTime'); 
const durationTime = document.querySelector('.durationTime');

function updateProgressValue() {
  progressBar.max = audio.duration;
  progressBar.value = audio.currentTime;
  document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(audio.currentTime)));
  if (formatTime(Math.floor(audio.duration)) === "NaN:NaN") {
    document.querySelector('.durationTime').innerHTML = "0:00";
  } else {
    document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(audio.duration)));
  }
};

function formatTime(seconds) {
  let min = Math.floor((seconds / 60));
  let sec = Math.floor(seconds - (min * 60));
  if (sec < 10){ 
      sec  = `0${sec}`;
  };
  return `${min}:${sec}`;
};

setInterval(updateProgressValue, 500);

function changeProgressBar() {
  audio.currentTime = progressBar.value;
};

progressBar.addEventListener('input', () => {
  changeProgressBar()
})


const volume = document.querySelector('.volume');

function mute() {
  volume.classList.toggle('volumeOff');
  audio.muted = !audio.muted;
  if (audio.muted) {
    volumeBar.value = 0;
    changeVolume()
  } else {
    volumeBar.value = 100;
    changeVolume()
  }
}
volume.addEventListener('click', mute)

const volumeBar = document.querySelector('#volume-bar');
volumeBar.value = 100;


function changeVolume() {
  audio.volume = volumeBar.value / 100;
  if (audio.volume === 0) {
    volume.classList.add('volumeOff');
  }
  if (audio.volume > 0){
    volume.classList.remove('volumeOff');
  }
}

volumeBar.addEventListener('input', () => {
  changeVolume();
})



//audio

//settings
function toggleSettings() {
  if(all.classList.contains('hidden') && !todoWindow.classList.contains('todo-window__on')){
    all.classList.remove('hidden');
  }
  settingsWindow.classList.toggle('settings-window__on');
};

function toggleTodo() {
  if(all.classList.contains('hidden') && !settingsWindow.classList.contains('settings-window__on')){
    all.classList.remove('hidden');
  }
  todoWindow.classList.toggle('todo-window__on');
  cleanDoneList();
};

settings.addEventListener('click', toggleSettings);

todo.addEventListener('click', toggleTodo);

all.addEventListener('click', (event) => {
  if (event.target.classList.contains('all')){
    all.classList.add('hidden');
    settingsWindow.classList.remove('settings-window__on');
    todoWindow.classList.remove('todo-window__on');
  }
});





function changeSettings() {
  if (language === 'ru') {
    timeSpan.textContent = 'Время:';
    dateSpan.textContent = 'Дата:';
    greetingSpan.textContent = 'Приветсвие:';
    quoteSpan.textContent = 'Цитата:';
    weatherSpan.textContent = 'Погода:';
    audioSpan.textContent = 'Аудио:';
    languageSpan.textContent = 'Язык:';
    sourceSpan.textContent = 'Источник:';
    sourceTag.placeholder = 'Введите тег';
  }
  if (language === 'en') {
    timeSpan.textContent = 'Time:';
    dateSpan.textContent = 'Date:';
    greetingSpan.textContent = 'Greeting:';
    quoteSpan.textContent = 'Quote:';
    weatherSpan.textContent = 'Weather:';
    audioSpan.textContent = 'Audio:';
    languageSpan.textContent = 'Language:';
    sourceSpan.textContent = 'Source:';
    sourceTag.placeholder = 'Input tag';
  }
}
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
timeShow.addEventListener('change', hideTime);

function hideDate() {
  if (dateShow.value === 'off') {
    data.classList.add('hidden');
  }
  if (dateShow.value === 'on') {
    data.classList.remove('hidden');
  }
}
dateShow.addEventListener('change', hideDate);

function hideGreeting() {
  if (greetingShow.value === 'off') {
    greetingCont.classList.add('hidden');
  }
  if (greetingShow.value === 'on') {
    greetingCont.classList.remove('hidden');
  }
}
greetingShow.addEventListener('change', hideGreeting);

function hideQuote() {
  if (showQuote.value === 'off') {
    quoteCont.classList.add('hidden');
  }
  if (showQuote.value === 'on') {
    quoteCont.classList.remove('hidden');
  }
}
showQuote.addEventListener('change', hideQuote);

function hideWather() {
  if (weatherShow.value === 'off') {
    weather.classList.add('hidden');
  }
  if (weatherShow.value === 'on') {
    weather.classList.remove('hidden');
  }
}
weatherShow.addEventListener('change', hideWather);

function hideAudio() {
  if (audioShow.value === 'off') {
    player.classList.add('hidden');
  }
  if (audioShow.value === 'on') {
    player.classList.remove('hidden');
  }
}
audioShow.addEventListener('change', hideAudio);
//show elements


//todo
const selectBox = document.querySelector('#select-box');
const inboxList = document.querySelector('.inbox-list');
const todayList = document.querySelector('.today-list');
const doneList = document.querySelector('.done-list');
const todoText = document.getElementById('todo-input');




function chooseList() {
  if (selectBox.value === 'inbox') {
    inboxList.classList.add('list_on');
    todayList.classList.remove('list_on');
    doneList.classList.remove('list_on');
  }
  if (selectBox.value === 'today') {
    inboxList.classList.remove('list_on');
    todayList.classList.add('list_on');
    doneList.classList.remove('list_on');
  }
  if (selectBox.value === 'done') {
    inboxList.classList.remove('list_on');
    todayList.classList.remove('list_on');
    doneList.classList.add('list_on');
  }
}

selectBox.addEventListener('change', chooseList);

chooseList();


function writeTodo(text) {
  document.querySelectorAll('.todo-list').forEach(element => {
    if(element.classList.contains('list_on')) {
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.textContent = `${text}`;
      element.append(li);
    }
  })
}

todoText.addEventListener('change', () => {
  writeTodo(todoText.value);
  todoText.value = '';
})


todoWindow.addEventListener('click', function(event) {
  document.querySelectorAll('.todo-list').forEach(element => {
    if(element.classList.contains('done-list')){
      element.querySelectorAll('.list-item').forEach(item => {
        if (event.target.innerHTML === item.innerHTML) {
          item.remove();
        }
      })
    }
    if(element.classList.contains('inbox-list')){
      element.querySelectorAll('.list-item').forEach(item => {
        if (event.target.innerHTML === item.innerHTML) {
          item.classList.toggle('list-item-done');
        }
      })
    }
    if(element.classList.contains('today-list')){
      element.querySelectorAll('.list-item').forEach(item => {
        if (event.target.innerHTML === item.innerHTML) {
          item.classList.toggle('list-item-done');
        }
      })
    }
  })
});

function cleanDoneList(){
  document.querySelectorAll('.list-item').forEach(element => {
    if (element.classList.contains('list-item-done')){
      const li = document.createElement('li');
      li.classList.add('list-item');
      li.textContent = element.innerHTML;
      doneList.append(li);
      element.remove();
    }
  })
}
//todo



