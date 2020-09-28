//https://youtu.be/b8sUhU_eq3g
//wrap input in a form--submits ----button+enter

//Select the elements
const clear = document.querySelector(".clear");
const list = document.getElementById("list");
const cardTitle = document.getElementById("date");
const input = document.getElementById("item"); //what user types in field
let searchTermContainer = document.createElement("div");
searchTermContainer.className = "holdsSearchResults";
const body = document.querySelector("body");
body.appendChild(searchTermContainer);

//clear results

clear.addEventListener("click", function () {
  location.reload();
});

//Show card title
cardTitle.innerHTML = "FOOD LIST";

//Create Variables
let LIST = [];
let id = 0;

//eventListener
input.addEventListener("input", results);

//Fetch API
function results(e) {
  {
    e.preventDefault();
    let searchTerm = input.value;

    function fetchFood() {
      let item = searchTerm;
      let baseURL = `https://trackapi.nutritionix.com/v2/search/instant?query=${item}`;
      fetch(baseURL, {
        headers: {
          "x-app-id": "7da1437f",
          "x-app-key": "6cdc37fc5d007cf369a8d5b98437a199",
        },
      })
        .then((result) => result.json())
        .then((json) => displayResults(json));
    }

    fetchFood();
  }
}

//function displayResults
function displayResults(json) {
  console.log(json);
  while (searchTermContainer.firstChild) {
    searchTermContainer.removeChild(searchTermContainer.firstChild);
  }

  for (i = 0; i <= 8; i++) {
    let nameResults = json.common[i].food_name;
    //    let photo= json.common[i].photo.thumb;
    //    let image=document.createElement('img');
    //    image.src=photo;

    let foodResults = document.createElement("p");
    foodResults.className = "foodResults";

    searchTermContainer.appendChild(foodResults);
    foodResults.innerText = nameResults;
    foodResults.addEventListener("click", addToList);

    function addToList(e) {
      let savedItem = e.target.innerHTML;

      //Nutritional Information Post Request
      let baseURL = `https://trackapi.nutritionix.com/v2/natural/nutrients`;
      fetch(baseURL, {
        method: "POST",
        body: JSON.stringify({
          query: `${savedItem}`,
        }),
        headers: new Headers({
          "Content-Type": "application/json",
          "x-app-id": "7da1437f",
          "x-app-key": "6cdc37fc5d007cf369a8d5b98437a199",
        }),
      })
        .then((result) => result.json())
        .then((json) => console.log(json));

      while (searchTermContainer.hasChildNodes()) {
        searchTermContainer.removeChild(searchTermContainer.firstChild);
      }

      if (e) {
        addToDo(savedItem, id, false);
        LIST.push({
          name: savedItem,
          id: id,
          trash: false,
        });
        id++;
      }
      input.value = "";

      return nameResults;
    }
  }

  function addToDo(savedItem, id, trash) {
    if (trash) {
      return;
    }
    const item = `<li class= "item">
        <p class="text"> ${savedItem} </p>
        <i class= "far fa-trash-alt" job="delete" id="${id}"></i>
        </li>`;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item);
  }
}

// // Delete To Do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].trash = true;
}

//target the items created dynamically

list.addEventListener("click", function (event) {
  const element = event.target; //return the clicked element inside list
  const elementJob = element.attributes.job.value; //complete or delete
  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }
});

// 

var circle = document.querySelector('circle');
var radius = circle.r.baseVal.value;
var circumference = radius * 2 * Math.PI;

circle.style.strokeDasharray = `${circumference} ${circumference}`;
circle.style.strokeDashoffset = `${circumference}`;

function setProgress(percent) {
  const offset = circumference - percent / 100 * circumference;
  circle.style.strokeDashoffset = offset;
}

const goal = document.getElementById('cal');
setProgress(goal.value);

goal.addEventListener('change', function(e) {
  console.log(e);

  let svg= document.querySelector("svg");
 
  if (goal.value < 101 && goal.value > -1) {

    if(goal.value !== ""){
      
      circle.style.display="block";
      let calCount= goal.value;
      let textNum= document.querySelector(".textNum");
      textNum.textContent=calCount;
      // text=  `  <text x="50%" y="50%" text-anchor="middle" stroke="#51c5cf" stroke-width="px" dy=".3em">${calCount}</text>`
      
  
      // const position1 = "beforeend";
      // svg.insertAdjacentHTML(position1, text);
      setProgress(goal.value);}
    }else{
      circle.style.display="none"
      text.style.display="none";
    
  }  
  
})

// https://css-tricks.com/building-progress-ring-quickly/