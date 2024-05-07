// flatpickr
import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

// iziToast
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// variables
let userSelectedDate = null;
let timerProggress = null;
const dateChooseField = document.querySelector('#datetime-picker');
const timerBtn = document.querySelector('[data-start]');
const time = Date.now();

// flatpickr options
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    userSelectedDate = selectedDates[0];

    if (userSelectedDate.getTime() < time) {
      iziToast.show({
        title: 'Error',
        message: 'Please choose a date in the future',
        color: '#ef4040',
        position: 'topRight',
        messageColor: '#ffffff',
        titleColor: '#ffffff',
        backgroundColor: '#ef4040',
        image: '../img/oct.svg',
        imageWidth: 24
      });
      timerBtn.setAttribute('disabled', true);
    } else {
      timerBtn.removeAttribute('disabled');
    }
  },
};

// Convert milliseconds to days, hours, minutes, seconds
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

// add leading zero
function addLeadingZero(value) {
  return String(value).padStart(2, '0')
}

// Update timer display
function updateTimerDisplay(time) {
  const daysField = document.querySelector('[data-days]');
  const hoursField = document.querySelector('[data-hours]');
  const minutesField = document.querySelector('[data-minutes]');
  const secondsField = document.querySelector('[data-seconds]');

  daysField.textContent = addLeadingZero(time.days);
  hoursField.textContent = addLeadingZero(time.hours);
  minutesField.textContent = addLeadingZero(time.minutes);
  secondsField.textContent = addLeadingZero(time.seconds);
}

// add disable for date field and button
function disableTimerClick(dateField, btn) {
  dateField.setAttribute('disabled', true);
  btn.setAttribute('disabled', true);
}

// remove disable from date field
function EnableTimerClick(dateField) {
  dateField.removeAttribute('disabled');
}

// Event Click function on timer start button
function onTimerStart(event) {
  disableTimerClick(dateChooseField, event.currentTarget)
  let timeDifference = userSelectedDate.getTime() - Date.now();

  const initialTimeLeft = convertMs(timeDifference);
  updateTimerDisplay(initialTimeLeft)

  timerProggress = setInterval(() => {
    if (timeDifference <= 999) {
      clearInterval(timerProggress);
      EnableTimerClick(dateChooseField)
      // Timer has expired
      return;
    }

    timeDifference -= 1000;
    const timeLeft = convertMs(timeDifference);
    updateTimerDisplay(timeLeft);

  }, 1000);
}

// init Flatpicker
flatpickr(dateChooseField, options);

// Evants
timerBtn.addEventListener('click', onTimerStart);