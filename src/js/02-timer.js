import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const dateTimePicker = document.querySelector('#datetime-picker');
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

flatpickr(dateTimePicker, options);

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

Zadanie 2 - Odliczanie czasu
Wykonaj to zadanie w plikach 02-timer.html i 02-timer.js. Napisz skrypt licznika, który odlicza czas do określonego zdarzenia. 
Taki licznik można wykorzystywać na blogach czy w sklepach internetowych, stronach z różnymi wydarzeniami, podczas przerwy technicznej itd. 

Elementy interfejsu
W HTML znajduje się znacznik licznika, pola wyboru końcowej daty i przycisku, po którego kliknięciu licznik powinien się uruchomić.

Popraw wizualnie elementy interfejsu.

<input type="text" id="datetime-picker" />
<button type="button" data-start>Start</button>

<div class="timer">
  <div class="field">
    <span class="value" data-days>00</span>
    <span class="label">Days</span>
  </div>
  <div class="field">
    <span class="value" data-hours>00</span>
    <span class="label">Hours</span>
  </div>
  <div class="field">
    <span class="value" data-minutes>00</span>
    <span class="label">Minutes</span>
  </div>
  <div class="field">
    <span class="value" data-seconds>00</span>
    <span class="label">Seconds</span>
  </div>
</div>

Biblioteka flatpickr:
Używaj biblioteki flatpickr po to, aby pozwolić użytkownikowi wybrać ostateczną datę i godzinę w takim samym formularzu niezależnie 
od przeglądarki. Aby dodać kod CSS biblioteki z projektem, należy dodać jeszcze jeden import, oprócz tego opisanego w dokumentacji.

// Opisany w dokumentacji
import flatpickr from "flatpickr";
// Dodatkowy import stylów
import "flatpickr/dist/flatpickr.min.css";

Biblioteka czeka na jej inicjalizację na elemencie input[type="text"], dlatego dodaliśmy do HTML input#datetime-picker.

<input type="text" id="datetime-picker" />

Drugim argumentem funkcji flatpickr(selector, options) jest nieobowiązkowy obiekt parametrów. Przygotowaliśmy dla Ciebie obiekt, 
który jest niezbędny do wykonania zadania. Przeczytaj, za co odpowiada każda właściwość w dokumentacji «Options» i użyj ich w swoim kodzie.

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};

Wybór daty:
Metoda onClose() z obiektu parametrów pojawia się za każdym razem przy zamknięciu elementu interfejsu, który tworzy flatpickr. 
To właśnie w niej należy opracować datę wybraną przez użytkownika. Parametr selectedDates to tablica wybranych dat, dlatego 
bierzemy z niej pierwszy element.

- Jeśli użytkownik wybrał datę z przeszłości, pokaż window.alert() o treści "Please choose a date in the future".
- Jeśli użytkownik wybrał odpowiednią datę (z przyszłości), przycisk «Start» staje się aktywny.
- Przycisk «Start» powinien być nieaktywny tak długo, dopóki użytkownik nie wybierze daty w przyszłości.
- Po kliknięciu przycisku «Start» zaczyna się odliczanie czasu do wybranej daty od momentu kliknięcia.

Odliczanie czasu:
Po kliknięciu na przycisk «Start» skrypt powinien wyliczać raz na sekundę, ile czasu pozostało do wskazanej daty i aktualizować 
interfejs licznika, pokazując cztery liczby: dni, godziny, minuty i sekundy, w formacie xx:xx:xx:xx (DD:HH:MM:SS).
- Liczba dni może składać się z więcej niż dwóch cyfr (jeśli wybierzemy odpowiednio odległą datę).
- Licznik powinien się zatrzymać, gdy osiągniemy datę końcowej a wartość licznika wyniesie 00:00:00:00.

Aby obliczyć potrzebne wartości użyj gotowej funkcji convertMs, gdzie ms to różnica między końcową i aktualną datą w milisekundach.

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

console.log(convertMs(2000));// {days: 0, hours: 0, minutes: 0, seconds: 2}
console.log(convertMs(140000));// {days: 0, hours: 0, minutes: 2, seconds: 20}
console.log(convertMs(24140000));// {days: 0, hours: 6 minutes: 42, seconds: 20}

//--------------------------------------------------------------------------------------------------

//ChatGPT

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
