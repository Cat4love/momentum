//time
const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');
const slideNext = document.querySelector('.slide-next');
const slidePrev = document.querySelector('.slide-prev');
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

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
	const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
	const currentDate = date.toLocaleDateString('en-Us', options);
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
	greeting.textContent = `Good ${getTimeOfDay()}`;
}

function setLocalStorage() {
	localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
	if (localStorage.getItem('name')) {
		name.value = localStorage.getItem('name');
	}
}
window.addEventListener('load', getLocalStorage)
//greeting

//slider
function getRandomNum() {
	return Math.floor(Math.random() * 20) + 1;
}

let randomNum = getRandomNum();

function setBg() {
	const timeOfDay = getTimeOfDay();
	const bgNum = String(randomNum).padStart(2, '0');
	const img = new Image();
	img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${bgNum}.jpg`;
	img.addEventListener('load', () => {
		document.body.style.backgroundImage = `url(${img.src})`;
	})
};

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
city.value = 'Minsk';
async function getWeather() {
	let	url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=5e6a18dd46aeb701230f1dac90b8123c&units=metric`;
	const res = await fetch(url);
	const data = await res.json();
	weatherIcon.className = 'weather-icon owf';
	weatherIcon.classList.add(`owf-${data.weather[0].id}`);
	temperature.textContent = `${data.main.temp}°C`;
	weatherDescription.textContent = data.weather[0].description;
	console.log(city.value);
}
getWeather()

city.addEventListener('change', getWeather);
//weather 

