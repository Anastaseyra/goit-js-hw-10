import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const button = document.querySelector('button[data-start]');
const daySpan = document.querySelector('span[data-days]');
const minuteSpan = document.querySelector('span[data-minutes]');
const secondSpan = document.querySelector('span[data-seconds]');
const input = document.querySelector('#datetime-picker');
const hourSpan = document.querySelector('span[data-hours]');

button.disabled = true;

let userSelectedDate = '';

iziToast.settings({
  timeout: 4000,
  position: 'topRight',
});

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] > Date.now()) {
      button.disabled = false;
      userSelectedDate = selectedDates[0] - Date.now();
    } else {
      button.disabled = true;
      iziToast.error({ message: 'Please choose a date in the future' });
    }
  },
};

flatpickr(input, options);

const handleClickStart = () => {
  input.disabled = true;

  const timeinterval = setInterval(() => {
    if (userSelectedDate > 1000) {
      userSelectedDate -= 1000;

      const { days, hours, minutes, seconds } = convertMs(userSelectedDate);

      daySpan.textContent = `${days}`.padStart(2, '0');
      hourSpan.textContent = `${hours}`.padStart(2, '0');
      minuteSpan.textContent = `${minutes}`.padStart(2, '0');
      secondSpan.textContent = `${seconds}`.padStart(2, '0');

      button.disabled = true;
    }

    if (userSelectedDate <= 1000) {
      clearInterval(timeinterval);
      input.disabled = false;
    }
  }, 1000);
};

button.addEventListener('click', handleClickStart);

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