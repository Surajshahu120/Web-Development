const apiKey = "d34aa376849d4c8e19bdf5a77ed8d2f2";
const inpData = document.querySelector("#inpData");
const Button = document.querySelector("#btn");
const weatherIcon= document.querySelector(".weather-icon");
let store=[];
async function fetchApi() {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inpData.value}&appid=${apiKey}&units=metric`;
    
    try {
        let data = await fetch(apiUrl);
        let res = await data.json();
        let weather_icons=res.weather[0];
        console.log(res.weather[0].id); 
        document.querySelector(".city").innerHTML=res.name;
        document.querySelector(".temp").innerHTML=res.main.temp;
        document.querySelector(".humidity").innerHTML=res.main.humidity+" %";
        document.querySelector(".wind").innerHTML=res.wind.speed+" km/hr";
        store=[...store,{"id":res.weather[0].id,"city":res.name,"temprature":res.main.temp,"humidity":res.main.humidity,"wind":res.wind.speed}];
        console.log(store);
        
        if(weather_icons.main=="Clouds"){
           weatherIcon.src="images/cloud.png";
        }
        else if(weather_icons.main=="Clear"){
            weatherIcon.src="images/clear.png";
        }
        else if(weather_icons.main=="Rain"){
            weatherIcon.src="images/rain.png";
        }
        else if(weather_icons.main=="Drizzle"){
            weatherIcon.src="images/drizzle.png";
        }
        else if(weather_icons.main=="Mist"){
            weatherIcon.src="images/mist.png";
        }
        else {
            console.error('Error: ' + data.message); // Log the error message from the API
        }
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

Button.addEventListener("click", fetchApi);



function getRecentData() {
    // Assume 'store' is an array of objects with the data to display
    if (!store || store.length === 0) {
        alert("No recent data available.");
        return;
    }

    // Create table elements
    let table = document.createElement("table");
    let tHead = document.createElement('thead');
    let tRow = document.createElement('tr');

    // Create table headers
    for (let val in store[0]) {
        let th = document.createElement('th'); // Create a new th element
        th.innerHTML = `<b>${val}</b>`;
        tRow.appendChild(th);
    }
    tHead.appendChild(tRow);
    table.appendChild(tHead);

    // Create table body
    let tBody = document.createElement("tbody");
    store.forEach((val) => {
        let tRow = document.createElement('tr');
        for (let res in val) {
            let td = document.createElement('td');
            td.innerText = val[res];
            tRow.appendChild(td);
        }
        tBody.appendChild(tRow);
    });
    table.appendChild(tBody);

    // Clear any existing table before appending the new one
    const existingTable = document.querySelector("table");
    if (existingTable) {
        document.body.removeChild(existingTable);
    }

    // Append the new table to the body
    document.body.appendChild(table);
}

// Assume 'store' is defined elsewhere in your code
let recentData = document.querySelector("#recentData");
recentData.addEventListener('click', getRecentData);
