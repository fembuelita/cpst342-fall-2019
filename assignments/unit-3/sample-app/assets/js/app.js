const moment = require('moment');

document.addEventListener('DOMContentLoaded', e => {
  console.log(`Loaded document at ${moment().format()}`);

  // we're adding this here because if #triangle-list-toggle were to be injected to the DOM after the page loads
  // by AJAX or something similar we would not be able to find it in the DOM before it loads
  document.getElementById("triangle-list-toggle")
    .addEventListener("click", e => {
      e.preventDefault();

      let triList = document.getElementById("triangle-list");
      triList.classList.toggle("hidden");
    });
});

window.addEventListener('load', e => {
  console.log(`Loaded window at ${moment().format()}`);
});

window.addEventListener('beforeunload', e => {
  // this message won't show in chrome but it will force chrome's standard pop-up to trigger
  e.returnValue = 'Are you sure you wish to go?';
});

