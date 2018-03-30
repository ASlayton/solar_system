//console.log("Why, hello there.");

//XML HTTP Request on Page Load:
function ifFileLoads(){
  console.log("It's alive!!!!")
};

function ifFails(){
  console.log("Mistakes have been made.");
};

//When the JS is called, run this first: 
const startApplication = () => {
  let myRequest = new XMLHttpRequest();
  myRequest.addEventListener("load", ifFileLoads);
  myRequest.addEventListener("error", ifFails);
  myRequest.open("GET", "planet.json");
  myRequest.send();
};

startApplication();