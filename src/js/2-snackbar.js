import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

// Object with form fields
let formData = {
  delay: "",
  state: ""
};

// Variables
const formPromise = document.querySelector('.form');

// Function to create a promise
function makePromise({ delay, state }) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if(state === 'fulfilled') {
        resolve(`✅ Fulfilled promise in ${delay}ms`);
      } else {
        reject(`❌ Rejected promise in ${delay}ms`);
      }
    }, delay);
  });
}

// Function to show iziToast message
function showToast(message, color) {
  iziToast.show({
    message: message,
    color: color,
    position: 'topRight',
    messageColor: '#ffffff',
    backgroundColor: color,
  });
}

// Submit form promise callback
function onFormPromiseSubmit(event) {
  event.preventDefault();
  const form = event.currentTarget;
  const formEls = form.elements;

  formData = {
    delay: formEls.delay.value,
    state: formEls.state.value
  };

  makePromise(formData)
    .then((value) => {
      showToast(value, '#59a10d');
    })
    .catch((error) => {
      showToast(error, '#ef4040');
    });

  formData = { delay: '', state: '' };
  form.reset();
}

// Events
formPromise.addEventListener('submit', onFormPromiseSubmit);
