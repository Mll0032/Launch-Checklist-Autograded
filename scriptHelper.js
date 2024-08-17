// Write your helper functions here!



function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    //Here is the HTML formatting for our mission target div.
    let missionTarget = document.getElementById("missionTarget");
    missionTarget.innerHTML = `
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
    if (testInput === "") {
        return "Empty";
    } else if (!isNaN(testInput)) {
        return "Is a Number";
    } else {
        return "Not a Number";
    }
}

 function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    let faultyItems = document.getElementById("faultyItems");
    let pilotStatus = document.getElementById("pilotStatus");
    let copilotStatus = document.getElementById("copilotStatus");
    let fuelStatus = document.getElementById("fuelStatus");
    let cargoStatus = document.getElementById("cargoStatus");
    let launchStatus = document.getElementById("launchStatus");

    console.log("List (faultyItems): ", list);
    console.log("Pilot: ", pilot, "Co-pilot: ", copilot); 
    console.log("Fuel Level: ", fuelLevel, "Cargo Level: ", cargoLevel);

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" ||
        validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
        alert("All fields are required!");
        //console.log("Validation failed: Empty field(s) detected");
        return;
    }

    if (validateInput(pilot) === "Is a Number" || validateInput(copilot) === "Is a Number") {
        alert("Pilot and Co-pilot names should be text.");
        //console.log("Validation failed: Pilot or Co-pilot name is a number");
        return;
    }

    if (validateInput(fuelLevel) === "Not a Number" || validateInput(cargoLevel) === "Not a Number") {
        alert("Fuel Level and Cargo Mass should be numbers.");
        //console.log("Validation failed: Fuel level or cargo mass is not a number");
        return;
    }
    pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
    copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

    if (fuelLevel < 10000) {
        fuelStatus.innerHTML = "Fuel level too low for launch";
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else {
        fuelStatus.innerHTML = "Fuel level high enough for launch";
    }

    if (cargoLevel > 10000) {
        cargoStatus.innerHTML = "Cargo mass too heavy for launch";
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle Not Ready for Launch";
        launchStatus.style.color = "red";
    } else {
        cargoStatus.innerHTML = "Cargo mass low enough for launch";
    }

    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        faultyItems.style.visibility = "visible";
        launchStatus.innerHTML = "Shuttle is Ready for Launch";
        launchStatus.style.color = "green";
    }
 }
 
 async function myFetch() {
     let planetsReturned;
 
     planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Network response was not ok");
        }     
    });
 
     return planetsReturned;
 }
 
 function pickPlanet(planets) {
    let randomIndex = Math.floor(Math.random() * planets.length);
    return planets[randomIndex];
 }
 
 module.exports.addDestinationInfo = addDestinationInfo;
 module.exports.validateInput = validateInput;
 module.exports.formSubmission = formSubmission;
 module.exports.pickPlanet = pickPlanet; 
 module.exports.myFetch = myFetch;