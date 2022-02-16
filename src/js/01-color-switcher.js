let intervalId;
const BACKGROUND_CHANGE_INTERVAL = 1000;

const butStartRef = document.querySelector('button[data-start]');
butStartRef.addEventListener('click', startColorChanging);
const butStopRef = document.querySelector('button[data-stop]');
butStopRef.addEventListener('click', stopColorChanging);

function startColorChanging() {
  butStartRef.setAttribute('disabled', '');
  butStopRef.removeAttribute('disabled');
  intervalId = setInterval(changeBackgroundColor, BACKGROUND_CHANGE_INTERVAL);
}

function changeBackgroundColor() {
  document.body.style.backgroundColor = getRandomHexColor();
}

function stopColorChanging() {
  butStartRef.removeAttribute('disabled');
  butStopRef.setAttribute('disabled', '');
  clearInterval(intervalId);
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
