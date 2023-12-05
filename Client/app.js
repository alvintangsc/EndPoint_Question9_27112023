// Fill up the code for the question
const readline = require("readline-sync");
const fetch = require('node-fetch');

let allPopulationData;

function loadAllData(){
    return new Promise((resolve,reject) =>{
        fetch("http://localhost:8081/allpopulationdata")
        // We'll use the json() method to return a 2nd promise
        // then parse it into JSON objects
        .then(response => response.json())
        .then(function (data) {
            resolve(data)
        })
        .catch((error)=> {
            console.log("Error reading", error);
        }); // closes catch
    }); // close new Promise parameter and function
}


// sortOrder - a string either "asc" or "dsc"
// inputArray - original unsorted array containing the JSON 
// propertyToSortBy - property name
// return sorted array based on the above params
function sortJsonArray(sortOrder, inputArray, propertyToSortBy){
    // deep copy the sorted array
    let sortedArray = [...inputArray];
    // ascending sort
    if(sortOrder == "asc"){
        sortedArray.sort((a,b) =>{
            return parseInt(b[propertyToSortBy]) - parseInt(a[propertyToSortBy]);
        })
    }
    // descending sort
    else if (sortOrder == "dsc"){
        sortedArray.sort((a,b) =>{
            return parseInt(a[propertyToSortBy]) - parseInt(b[propertyToSortBy]);
        })
    }
    return sortedArray;
}


function generateMenuText(){
    
    let displayText = "\n1. 5 countries with highest populations.";
    displayText += "\n2. 5 countries with lowest populations.";
    displayText += "\n3. Country with highest density per sq km.";
    displayText += "\n4. Country with lowest density per sq km.";
    displayText += "\n5. Country with highest GDP.";
    displayText += "\n6. Country with lowest GDP.";
    displayText += "\n7. Exit Program.";
    displayText += "\nPlease enter an option (1-7): ";
    return displayText;
}

function mainProgram(){
    let menuText = generateMenuText();
    let userChoice = 0;
    let sorted;

    do{
        userChoice = readline.questionInt(menuText);
        console.log("You have chosen item: ", userChoice);

        if(userChoice > 0 && userChoice < 8){
            switch (userChoice) {
                case 1:
                    sorted = sortJsonArray("asc", allPopulationData, "Population");
                    console.log("Population\tCountry");
                    // 5 Countries with highest populations.
                    for (let i = 0; i < 5; i++) {
                        console.log(`${sorted[i].Population}\t${sorted[i].Country}`);
                    }
                    break;
                case 2:
                    sorted = sortJsonArray("dsc", allPopulationData, "Population");
                    console.log("Population\tCountry");
                    // 5 Countries with lowest populations.
                    for (let i = 0; i < 5; i++) {
                        console.log(`${sorted[i].Population}\t${sorted[i].Country}`);
                    }
                    break;
                case 3:
                    sorted = sortJsonArray("asc", allPopulationData, "PopDensityPerSqm");
                    console.log("Country with highest density per square meter: ", sorted[0].Country);
                    console.log("Density per square meter:", sorted[0].PopDensityPerSqm);
                    break;
                case 4:
                    // TODO: Same as no. 3
                    break;
                case 5:
                    // Highest GDP per capital
                    sorted = sortJsonArray("asc", allPopulationData, "GDPpercapital");
                    console.log("Country with highest GDP per capital: ", sorted[0].Country);
                    console.log("GDP per capital:", sorted[0].GDPpercapital);
                    break;
                case 6:
                    // TODO: as 5
                    break;
                case 7:
                    console.log("End of Program! Goodbye!")
                    break;
            }
        }

    }while (userChoice != 7);
}

// load the data, then print the raw data
loadAllData()
    .then((result) => {
        allPopulationData = result;
        console.clear();
        // Main Program goes here.
        mainProgram();
        // console.log(allPopulationData);
    });

// we can't use data that may not be ready yet.
// console.log(allPopulationData);