//console.log("Why, hello there.");

//Print Data To DOM
const writeToDom = (myInnerds, myElement) => {
  document.getElementById(myElement).innerHTML = myInnerds;
};

//Put a mouseover event listener on card
const initHoverListener = () => {
  const planetCards = document.getElementsByClassName("planet-card");
  for(let n = 0; n < planetCards.length; n++){
    planetCards[n].addEventListener("mouseenter", turnCardOver);
    planetCards[n].addEventListener("mouseout", turnCardBackOver);
  };
};

const turnCardOver = () => {
  console.log("I'm flippin out man");
};

const turnCardBackOver = () => {
  console.log("Fuck Yeah");
};

//Function to create individual planet cards
//Front Face is Name of planet
//Back Face is Picture of Planet
const createPlanetCards = (dataArray) => {
  let planetFrontFace = "";
  for(let i = 0; i < dataArray.length; i++){
    planetFrontFace += `<div class='planet-card' id='${dataArray[i].name}'>`;
    planetFrontFace += `<h1>${dataArray[i].name}</h1>`;
    planetFrontFace += `</div>`;
  };
  writeToDom(planetFrontFace, "insert-planet-cards-here");
};

//XML HTTP Request on Page Load:
function ifFileLoads(){
  const myPlanets = JSON.parse(this.responseText);
  createPlanetCards(myPlanets.planets);
  initHoverListener();
};

//XML HTTP Request on Page Load- Error Handler
function ifFileFails(){
  console.log("Mistakes have been made.");
};

//When the JS is called, run this first: 
const startApplication = () => {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", ifFileLoads);
  myRequest.addEventListener("error", ifFileFails);
  myRequest.open("GET", "planet.json");
  myRequest.send();
};

startApplication();