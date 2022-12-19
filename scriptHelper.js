// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
   // Here is the HTML formatting for our mission target div.
    let div = document.getElementById("missionTarget");
    div.innerHTML = `   
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">
                `;
   
}

function validateInput(testInput) {
    let userInput = Number(testInput);
    if (testInput === "") {
        return "Empty";
    }
    else if (isNaN(userInput)) {
        return "Not a Number";
    }
    else if (isNaN(userInput) === false) { 
        return "Is a Number";
    }
}

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let pilotStatus = document.getElementById("pilotStatus"); 
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    if (validateInput(pilot) === "Empty" || //NOT WORKING CORRECTLY
        validateInput(copilot) === "Empty" ||
        fuelLevel === 0 ||
        cargoLevel === 0) {
            alert("All fields are required and numbers should be larger than zero!");
    } else if 
       (validateInput(pilot) === "Is a Number" ||
        validateInput(copilot) === "Is a Number" ||
        validateInput(fuelLevel) === "Not a Number" ||
        validateInput(cargoLevel) === "Not a Number") {
            alert("Make sure to enter valid information for each field!");
    } else {
        console.log(fuelLevel);
        console.log(cargoLevel);
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;
        if (fuelLevel < 10000 && cargoLevel <= 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        } else if (fuelLevel >= 10000 && cargoLevel > 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        } else if (fuelLevel < 10000 && cargoLevel > 10000) {
            list.style.visibility = "visible";
            fuelStatus.innerHTML = "Fuel level too low for launch";
            cargoStatus.innerHTML = "Cargo mass too heavy for launch";
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
        } else {
            list.style.visibility = "invisible";
            fuelStatus.innerHTML = "Fuel level high enough for launch";
            cargoStatus.innerHTML = "Cargo mass low enough for launch";
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "green";
        }
    }

}

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        return response.json();
    });

    return planetsReturned;
}

function pickPlanet(planets) {
    let planet = Math.floor(Math.random()*planets.length);
    return planets[planet];
}

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
