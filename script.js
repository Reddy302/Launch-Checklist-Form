// Write your JavaScript code here!
window.addEventListener("load", function(){
   let button = document.getElementById("formSubmit");
   button.addEventListener("click", function(event){
      let pilotName = String(document.querySelector("input[id=pilotName]").value);
      let copilotName = String(document.querySelector("input[id=copilotName]").value);
      let fuelLevel = document.querySelector("input[id=fuelLevel]").value;
      let cargoMass = document.querySelector("input[id=cargoMass]").value;

      let form = document.querySelector("form");
      form.addEventListener("submit", function(event){

         if (pilotName === "" || copilotName === "" || fuelLevel === "" || cargoMass === ""){
            alert("All Fields Required");
            event.preventDefault();
         };
         fuelLevel = Number(fuelLevel);
         cargoMass = Number(cargoMass);
         if(isNaN(fuelLevel)){
            alert("Fuel Level Must Be A Number.");
            event.preventDefault();
         };
         if(isNaN(cargoMass)){
            alert("Cargo Mass Must Be A Number.");
            event.preventDefault();
         };

         let pilotStatus = document.getElementById("pilotStatus");
         let copilotStatus = document.getElementById("copilotStatus");
         pilotStatus.innerHTML = `Pilot ${pilotName} is ready for launch`;
         copilotStatus.innerHTML = `Co-pilot ${copilotName} is ready for launch`;

         if (fuelLevel < 10000){
            document.getElementById("faultyItems").style.visibility = "visible";
            let fuelStatus = document.getElementById("fuelStatus");
            fuelStatus.innerHTML = `Fuel level TOO LOW for launch`;
            let launchStatus = document.getElementById("launchStatus");
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            event.preventDefault();
         };

         if (cargoMass > 10000){
            document.getElementById("faultyItems").style.visibility = "visible";
            let cargoStatus = document.getElementById("cargoStatus");
            cargoStatus.innerHTML = `Cargo mass TOO HIGH to launch`;
            let launchStatus = document.getElementById("launchStatus");
            launchStatus.innerHTML = "Shuttle not ready for launch";
            launchStatus.style.color = "red";
            event.preventDefault();
         };

         if (fuelLevel > 10000 && cargoMass < 10000){
            let launchStatus = document.getElementById("launchStatus");
            launchStatus.innerHTML = "Shuttle is ready for launch";
            launchStatus.style.color = "green";
            event.preventDefault();
         };

      });

   });

   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response){
      response.json().then(function(json){
         const div = document.getElementById("missionTarget");
         div.innerHTML = `
            <h2>Mission Destination</h2>
            <ol>
               <li>Name: ${json[0].name}</li>
               <li>Diameter: ${json[0].diameter}</li>
               <li>Star: ${json[0].star}</li>
               <li>Distance from Earth: ${json[0].distance}</li>
               <li>Number of Moons: ${json[0].moons}</li>
            </ol>
            <img src="${json[0].image}">
         `;
      });
   });

});