
//global variable
let myData = [];

//Print Data To DOM
const writeToDom = (myInnerds, myElement) => {
  document.getElementById(myElement).innerHTML = myInnerds;
};

//Put a mouseover event listener on card
const initHoverListener = () => {
  const planetCards = document.getElementsByClassName("planet-card");
  for(let n = 0; n < planetCards.length; n++){
    planetCards[n].addEventListener("mouseover", turnCardOver);
    planetCards[n].addEventListener("mouseleave", turnCardBackOver);
    planetCards[n].addEventListener("click", displayInfoCard);
  };
  const searchBar = document.getElementById("mySearch");
  searchBar.addEventListener("click", runSearch);
};

const turnCardOver = (e) => {
  const myElement = e.target;
  const myCurrentCard = e.target.id;
  for(let n = 0; n < myData.length; n++)
  if(myCurrentCard === myData[n].name){
    myElement.innerHTML = `<img src='${myData[n].imageUrl}' alt='${myData[n].name}' id='${myData[n].name}'>`;   
  };
};

const turnCardBackOver = (e) => {
  const myElement = e.target;
  const myCurrentCard = e.target.id;
  for(let n = 0; n < myData.length; n++)
  if(myCurrentCard === myData[n].name){
    myElement.innerHTML = `<h1 id='${myData[n].name}'>${myData[n].name}</h1>`;   
  };
};

const displayInfoCard = (e) => {
  myClickedCard = e.target.id;
  let myInfoCardString = '';
  for(var m = 0; m < myData.length; m++){
    if(myClickedCard === myData[m].name){
      myInfoCardString += `<div class='info-card'>`;
      myInfoCardString += `<h1 id='BigRedX'>X</h1>`
      myInfoCardString += `<h1>${myData[m].name}</h1>`;
      myInfoCardString += `<img src='${myData[m].imageUrl}' alt='${myData[m].name}'>`; 
      myInfoCardString += `<p class='info-card-paragraph'>${myData[m].description}</p>`;
      myInfoCardString += `<p>Known Number of Moons: ${myData[m].numberOfMoons}</p>`;
      myInfoCardString += `<p>Largest Moon: ${myData[m].nameOfLargestMoon}</p>`;
      myInfoCardString += `</div>`;
    };
  };
  clearAllCards();
  writeToDom(myInfoCardString, 'insert-planet-cards-here');
  initBigRedX();  
};

const initBigRedX = (e) => {
  let myBigRedX = document.getElementById("BigRedX");
  console.log(myBigRedX);
  myBigRedX.addEventListener("click", restorePage);
};


//Display Cards Based on search
const runSearch = () => {
  restorePage();
  const mySearchEntry = document.getElementById("searchThis").value.toLowerCase();
  let myCardHas;
  for(var k = 0; k < myData.length; k++){
    myCardHas = false;
    if(myData[k].name.toLowerCase().includes(mySearchEntry)){
      myCardHas = true;
    }else if (myData[k].description.toLowerCase().includes(mySearchEntry)){
      myCardHas = true;
    }else if(myData[k].nameOfLargestMoon.toLowerCase().includes(mySearchEntry)){
      myCardHas = true;
    };
    if (myCardHas === false){
      document.getElementById(myData[k].name).style.display = 'none';
    };
  };
};


const restorePage = () => {
  clearAllCards();
  createPlanetCards(myData);
  initHoverListener();
};

const clearAllCards = () => {
  const myDiv = document.getElementById("insert-planet-cards-here");
  myDiv.innerHTML = '';
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