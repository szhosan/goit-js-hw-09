import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

let userSelectedDate;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0].getTime();
    checkSelectedDate();
  },
};

const refs = {
  buttStartRef: document.querySelector('button[data-start]'),
  spanDaysRef: document.querySelector('span[data-days]'),
  spanHoursRef: document.querySelector('span[data-hours]'),
  spanMinutesRef: document.querySelector('span[data-minutes]'),
  spanSecondsRef: document.querySelector('span[data-seconds]'),
};

const INTERVAL_UPDATE_INTERFACE = 1000;

refs.buttStartRef.setAttribute('disabled', '');
refs.buttStartRef.addEventListener('click', () => {
  setInterval(updateTimeInterface, INTERVAL_UPDATE_INTERFACE);
});

flatpickr('#datetime-picker', options);

function checkSelectedDate() {
  if (userSelectedDate < new Date().getTime()) {
    window.alert('Please choose a date in the future');
  } else {
    refs.buttStartRef.removeAttribute('disabled');
  }
}

function updateTimeInterface() {
  const time = convertMs(userSelectedDate - new Date().getTime());
  console.log(time);
  refs.spanDaysRef.textContent = time.days;
  refs.spanHoursRef.textContent = time.hours;
  refs.spanMinutesRef.textContent = time.minutes;
  refs.spanSecondsRef.textContent = time.seconds;
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  let days = String(Math.floor(ms / day));
  // Remaining hours
  const hours = String(Math.floor((ms % day) / hour)).padStart(2, '0');
  // Remaining minutes
  const minutes = String(Math.floor(((ms % day) % hour) / minute)).padStart(2, '0');
  // Remaining seconds
  const seconds = String(Math.floor((((ms % day) % hour) % minute) / second)).padStart(2, '0');
  if (days.length === 1) days = days.padStart(2, '0');
  return { days, hours, minutes, seconds };
}
