//console.log("Why, hello there.");
//global variable
let myData = [];

//Print Data To DOM
const writeToDom = (myInnerds, myElement) => {
  document.getElementById(myElement).innerHTML = myInnerds;
};

//Put a mouseover event listener on card
const initHoverListener = (myDataArray) => {
  const planetCards = document.getElementsByClassName("planet-card");
  for(let n = 0; n < planetCards.length; n++){
    planetCards[n].addEventListener("mouseover", turnCardOver);
    planetCards[n].addEventListener("mouseleave", turnCardBackOver);
  };
};

const turnCardOver = (e) => {
  const myElement = e.target;
  const myCurrentCard = e.target.id;
  for(let n = 0; n < myData.length; n++)
  if(myCurrentCard === myData[n].name){
    console.log(myCurrentCard); 
    myElement.innerHTML = `<img src='${myData[n].imageUrl}' alt='${myData[n].name}'>`;   
  };
};

const turnCardBackOver = (e) => {
  const myElement = e.target;
  const myCurrentCard = e.target.id;
  for(let n = 0; n < myData.length; n++)
  if(myCurrentCard === myData[n].name){
    console.log(myCurrentCard); 
    myElement.innerHTML = `<h1>${myData[n].name}</h1>`;   
  };
};

//Function to create individual planet cards
//Front Face is Name of planet
//Back Face is Picture of Planet
const createPlanetCards = (dataArray) => {
  let planetFace = "";
  for(let i = 0; i < dataArray.length; i++){
    planetFace += `<div class='planet-card' id='${dataArray[i].name}'>`;
    planetFace += `<h1>${dataArray[i].name}</h1>`;
    planetFace += `</div>`;
  };
  writeToDom(planetFace, "insert-planet-cards-here");
};

//XML HTTP Request on Page Load:
function ifFileLoads(){
  const myPlanets = JSON.parse(this.responseText);
  createPlanetCards(myPlanets.planets);
  initHoverListener(myPlanets.planets);
  myData = myPlanets.planets;
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