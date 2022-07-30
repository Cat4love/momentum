//time
const time = document.querySelector('.time');
const data = document.querySelector('.date');

function showTime() {
	const date = new Date();
	const currentTime = date.toLocaleTimeString();
	time.textContent = currentTime;
	setTimeout(showTime, 1000);
	showDate();
	};

showTime();

function showDate() {
	const date = new Date();
	const options = {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'};
	const currentDate = date.toLocaleDateString('en-Us', options);
	data.textContent = currentDate;
};
//time





