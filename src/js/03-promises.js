import Notiflix from 'notiflix';

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const amount = parseInt(document.querySelector('input[name="amount"]').value);
  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const step = parseInt(document.querySelector('input[name="step"]').value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const actualDelay = delay + step * i;

    createPromise(position, actualDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

/* 

//---------------Natalia

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(`✅ Fulfilled promise ${position} in ${delay}ms`);
    } else {
      reject(`❌ Rejected promise ${position} in ${delay}ms`);
    }
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const delay = document.querySelector("[name='delay']");
  const step = document.querySelector("[name='step']");
  const amount = document.querySelector("[name='amount']");
  let createdPromises = 0;

  const timerId = setInterval(() => {
    if (createdPromises >= amount.value) {
      clearInterval(timerId);
      return;
    }
    createPromise(createdPromises + 1, delay.value)
      .then(resolved => Notiflix.Notify.success(resolved))
      .catch(rejected => Notiflix.Notify.failure(rejected));
    createdPromises++;
  }, step.value);
});

*/

/* 

//---------------Molik

const form = document.querySelector('.form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

form.addEventListener('submit', event => {
  event.preventDefault();
  const amount = parseInt(document.querySelector('input[name="amount"]').value);
  const delay = parseInt(document.querySelector('input[name="delay"]').value);
  const step = parseInt(document.querySelector('input[name="step"]').value);

  for (let i = 0; i < amount; i++) {
    const position = i + 1;
    const actualDelay = delay + step * i;

    createPromise(position, actualDelay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
});

*/

/* 
function generateRandomColor() {
  const r = Math.floor(Math.random() * 256); // Składowa czerwona (0-255)
  const g = Math.floor(Math.random() * 256); // Składowa zielona (0-255)
  const b = Math.floor(Math.random() * 256); // Składowa niebieska (0-255)
  return `rgb(${r},${g},${b})`; // Format RGB
}

function updateBackgroundColor() {
  const color1 = generateRandomColor();
  const color2 = generateRandomColor();
  document.body.style.background = `linear-gradient(to right, ${color1}, ${color2})`;
}

// Aktualizacja tła co sekundę
setInterval(updateBackgroundColor, 1000);

*/
