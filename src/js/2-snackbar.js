import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector(".form");
const inputMs = document.querySelector(".form-input");

function handleSubmit(event) {
  event.preventDefault();
    
  const delay = event.target.elements.delay.value;
  const state = event.target.elements.state.value

  const promise = new Promise((resolve, reject) => {
    resolve({delay: `${delay}`, state: `${state}`});
    reject ({delay: `${delay}`, state: `${state}`})
  })
    
  setTimeout(() => {
    promise.then(item => {
      if (item.state === "fulfilled") {
        iziToast.show({
          title: '',
          backgroundColor: 'green',
          messageColor: 'white',
          message: `✅ Fulfilled promise in ${item.delay}ms`,
          position: 'topRight',
        })
      } else {
        iziToast.show({
          title: '',
          backgroundColor: 'red',
          messageColor: 'white',
          message: `❌ Rejected promise in ${item.delay}ms`,
          position: 'topRight',
        })
      }
    })
  }, delay);

  inputMs.value = "";
};

form.addEventListener("submit", handleSubmit)