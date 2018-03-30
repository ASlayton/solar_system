//console.log("Why, hello there.");

//Print Data To DOM
const writeToDom = (myInnerds, myElement) => {
  document.getElementById(myElement).innerHTML = myInnerds;
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