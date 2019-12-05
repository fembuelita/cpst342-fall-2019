document.addEventListener('DOMContentLoaded', async function(){
  await fetch('./data.json')
    .then(async response => {
      const database = await response.json();
      debugger;

      hideLoadingMsg();
      printCreatures(database.creatures, database.hobbies);
      // printHobbies(database.hobbies);

    })
    .catch(err => {
      console.error("Failed to get database", err);
      alert("Failed to connect to the database. Please try again later, or if the issue persists you should check your homework before submitting");
    });
});

function hideLoadingMsg() {
  document.getElementById("loading-msg").remove();
}

function printCreatures(creaturesArr, hobbiesArr) {
  let table = document.getElementById("creatures-table");
  let tableBody = document.getElementById("creatures-data");
  creaturesArr.map(item => {
    // created our elements
    let tr = document.createElement("tr");
    let tdUserId = document.createElement("td");
    let tdName = document.createElement("td");
    let tdAge = document.createElement("td");
    let tdHobby = document.createElement("td");

    // add values to the TD tags
    tdUserId.innerText = item.id;
    tdName.innerText = item.name;
    tdAge.innerText = item.age;
    // tdHobby.innerText = item.hobby_id;
    tdHobby.innerText = hobbyIdToDesc(item.hobby_id, hobbiesArr).description;

    // add the td tags to the TR
    tr.appendChild(tdUserId);
    tr.appendChild(tdName);
    tr.appendChild(tdAge);
    tr.appendChild(tdHobby);

    // add the TR to the table
    tableBody.appendChild(tr);
  });

  table.classList.remove("hidden");
}

function hobbyIdToDesc(hobbyId, hobbiesArr) {
  return hobbiesArr.filter(hobby => {
    return hobby.id === hobbyId;
  })[0];
}

// function printHobbies(hobbiesArr) {}


//
// document.addEventListener('DOMContentLoaded', function(){
//
// });
//
// window.addEventListener('load', e => {
//   console.log("The window has loaded");
// });
//
// document.addEventListener('DOMContentLoaded', () => {
//   console.log("The document has loaded");
//   let h1Tags = document.getElementsByTagName("h1");
//   if (typeof h1Tags != "undefined" && h1Tags.length > 0) {
//     h1Tags[0].style.backgroundColor="#FF0000";
//   }
//
// // Create <h1>Hello World</h1>
//   let body = document.getElementsByTagName("body")[0];
//   let newH1Tag = document.createElement("h1");
//   newH1Tag.innerText = "This h1 tag was created by javascript!";
//   body.appendChild(newH1Tag);
// });
//
// console.log("Hello the page has executed this script");

// $(document).ready(function(){
//
// });
// jQuery(document).ready(function($){
//
// });
//
//
// ({
//
// })(jQuery);