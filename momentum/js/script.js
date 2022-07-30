//time
const time = document.querySelector('.time');
const data = document.querySelector('.date');
const greeting = document.querySelector('.greeting');
const name = document.querySelector('.name');

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
function getTimeOfDay(hours) {
	return ['night', 'morning', 'day', 'evening'][Math.floor(hours / 6)];
}

function showGreeting() {
	const date = new Date();
	const hours = date.getHours();
	greeting.textContent = `Good ${getTimeOfDay(hours)}`;
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

