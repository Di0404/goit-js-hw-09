import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

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
  
const refs = {
    startBtn: document.querySelector('[data-start'),
    days: document.querySelector('[data-days'),
    hours: document.querySelector('[data-hours'),
    minutes: document.querySelector('[data-minutes'),
    secounds: document.querySelector('[data-seconds'),
};

let selectDate = null
let intervalId = null;
refs.startBtn.disabled = true;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        // console.log(selectedDates[0]);
        selectDate = selectedDates[0]
    //   console.log(`selectDate`,selectDate);
      if (Date.now() > selectDate){
        Notiflix.Notify.failure('Please choose a date in the future');
        refs.startBtn.disabled = true;
          return
         
      }
      refs.startBtn.disabled = false;
    },
  };
  


function onBtnTimerClick ()  {
    refs.startBtn.disabled = true;
    intervalId = setInterval(() => {
        //  selectDate - Date.now() 
        const currentDate = new Date();
        const dateDiff = selectDate - currentDate;
        if (dateDiff <= 0) {
            clearInterval(intervalId);
            return;
          }
    const { days, hours, minutes, seconds } = addLeadingZero(convertMs(dateDiff));
    refs.days.textContent = `${days}`;
    refs.hours.textContent = `${hours}`;
    refs.minutes.textContent = `${minutes}`;
    refs.secounds.textContent = `${seconds}`;
    }, 1000);
}
function addLeadingZero({ days, hours, minutes, seconds }) {
    const daysNum = String(days).padStart(2, 0);
    const hoursNum = String(hours).padStart(2, 0);
    const minutesNum = String(minutes).padStart(2, 0);
    const secondsNum = String(seconds).padStart(2, 0);
    return { days: daysNum, hours: hoursNum, minutes: minutesNum, seconds: secondsNum };
  }
//   console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
//   console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
//   console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}


  
refs.startBtn.addEventListener('click', onBtnTimerClick)
flatpickr('#datetime-picker', options)