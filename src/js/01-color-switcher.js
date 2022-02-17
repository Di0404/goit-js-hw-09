const btnStartRef = document.querySelector('[data-start]');
const btnStopRef = document.querySelector('[data-stop]');
const bodyEl = document.body;

// console.log(btnStartRef)
// console.log(btnStopRef)

let seconds = 0; // переменная хранит пройденные секунды
let intervalId = null;
btnStartRef.disabled = false;
btnStopRef.disabled = false;

function getRandomHexColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }
const watchHandler = () => {
    
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;}
    intervalId = setInterval(() => {
    bodyEl.style.backgroundColor =   getRandomHexColor()
    btnStartRef.disabled = true;
   
  }, 1000);
};

const stopwatchHandler = () => {
    clearInterval(intervalId);
btnStartRef.disabled = false;
btnStopRef.disabled = true;
}

btnStartRef.addEventListener('click', watchHandler)
btnStopRef.addEventListener('click', stopwatchHandler)
