// Напиши скрипт, который при сабмите формы вызывает функцию 
// createPromise(position, delay) столько раз, 
// сколько ввели в поле amount. 
// При каждом вызове передай ей номер создаваемого промиса 
// (position) и задержку учитывая введенную пользователем первую
//  задержку (delay) и шаг (step).
import Notiflix from 'notiflix';

const formRef = document.querySelector('.form');
// console.log(formRef)

function submitHandler(event) {
  event.preventDefault();
  const inputRef = event.currentTarget.elements;
  // console.log(`inputRefs`,inputRef)
  const delayValue = inputRef.delay.value;
  // console.log(`delayValue`,delayValue)
  const stepValue = inputRef.step.value;
  // console.log(`stepValue`,stepValue)
  const amountValue = inputRef.amount.value;
  // console.log(`amountValue`,amountValue)

  let totalDelay = Number(delayValue);
  console.log(`totalDelay`,totalDelay)
  let toTalAmount = Number(amountValue)
  console.log(`toTalAmount`,toTalAmount)

  for (let i = 1; i <= toTalAmount; i += 1) {
    if (i === 1) {
      createPromise(i, totalDelay).then(logSuccess).catch(logError);
    } else {
      totalDelay += Number(stepValue);
      createPromise(i, totalDelay).then(logSuccess).catch(logError);
    }
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
const logSuccess = ({ position, delay }) => {
  Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
};

const logError = ({ position, delay }) => {
  Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
};
formRef.addEventListener('submit', submitHandler);
