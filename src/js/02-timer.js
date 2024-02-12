import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const dateTimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
      return;
    } else {
      startBtn.disabled = false;
    }
  },
};

let countdownInterval;

const flatpickr = flatpickr(dateTimePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value < 10 ? `0${value}` : value;
}
startBtn.addEventListener('click', timerStart);

function timerStart() {
  const selectedDate = new Date(dateTimePicker.value);
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  dateTimePicker.disabled = true;
  updateCountdown(selectedDate - currentDate);
  countdownInterval = setInterval(() => {
    updateCountdown(selectedDate - new Date());
  }, 1000);
  startBtn.disabled = true;
}

function updateCountdown(timeDiff) {
  const { days, hours, minutes, seconds } = convertMs(timeDiff);
  document.querySelector('[data-days]').textContent = addLeadingZero(days);
  document.querySelector('[data-hours]').textContent = addLeadingZero(hours);
  document.querySelector('[data-minutes]').textContent =
    addLeadingZero(minutes);
  document.querySelector('[data-seconds]').textContent =
    addLeadingZero(seconds);
  if (timeDiff <= 0) {
    clearInterval(countdownInterval);
    Notiflix.Notify.success('Countdown finished!');
  }
}

console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

/* 

<script>
    // Set the target date for the countdown (replace with your desired date)
    const targetDate = new Date("2024-01-01T00:00:00Z").getTime();

    function updateCountdown() {
      const currentDate = new Date().getTime();
      const timeDifference = targetDate - currentDate;

      const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      document.getElementById('days').innerText = formatTime(days);
      document.getElementById('hours').innerText = formatTime(hours);
      document.getElementById('minutes').innerText = formatTime(minutes);
      document.getElementById('seconds').innerText = formatTime(seconds);
    }

    function formatTime(time) {
      return time < 10 ? `0${time}` : time;
    }

    // Initial update
    updateCountdown();

    // Update the countdown every second
    setInterval(updateCountdown, 1000);
  </script>

*/

/*

import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const days = document.querySelector('[data-days]');
const hours = document.querySelector('[data-hours]');
const minutes = document.querySelector('[data-minutes]');
const seconds = document.querySelector('[data-seconds]');

startBtn.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future!');
      return;
    } else {
      startBtn.disabled = false;
    }
  },
};

flatpickr(dateTimePicker, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

let countdownInterval;

function updateTimer(ms) {
  const { days, hours, minutes, seconds } = convertMs(ms);
  days.textContent  = String(days).padStart(2, '0');
  hours.textContent  = String(hours).padStart(2, '0');
  minutes.textContent  = String(minutes).padStart(2, '0');
  seconds.textContent  = String(seconds).padStart(2, '0');
}

startBtn.addEventListener('click', timerStart);

function timerStart() {
  const selectedDate = new Date(dateTimePicker.value);
  const currentDate = new Date();
  if (selectedDate <= currentDate) {
    Notiflix.Notify.failure('Please choose a date in the future');
    return;
  }
  dateTimePicker.disabled = true;
  updateTimer(selectedDate - currentDate);

  countdownInterval = setInterval(() => {
    const remainingTime = selectedDate - new Date();
    if (remainingTime <= 0) {
      clearInterval(countdownInterval);
      startBtn.disabled = false;
    } else {
      updateTimer(remainingTime);
    }
  }, 1000);
}

*/
