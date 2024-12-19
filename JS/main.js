// --------today------------
var todayName = document.getElementById("todayName");
var todayNumber = document.getElementById("todayNumber");
var todayMonth = document.getElementById("todayMonth");
var todayTemp = document.getElementById("todayTemp");
var todayDegreeIcon = document.getElementById("todayDegreeIcon");
var todayDescription = document.getElementById("todayDescription");
var todayHumidity = document.getElementById("todayHumidity");
var todayWind = document.getElementById("todayWind");
var todayCompass = document.getElementById("todayCompass");
var todayLocation = document.getElementById("todayLocation");

// // --------tomorrow------------
var tomorrowName = document.getElementById("tomorrowName");
var tomorrowMinTemp = document.getElementById("tomorrowMinTemp");
var tomorrowMaxTemp = document.getElementById("tomorrowMaxTemp");
var tomorrowDegreeIcon = document.getElementById("tomorrowDegreeIcon");
var tomorrowDescription = document.getElementById("tomorrowDescription");

// // --------afterTomorrow------------
var afterName = document.getElementById("afterName");
var afterMinTemp = document.getElementById("afterMinTemp");
var afterMaxTemp = document.getElementById("afterMaxTemp");
var afterDegreeIcon = document.getElementById("afterDegreeIcon");
var afterDescription = document.getElementById("afterDescription");

// --------searchLocation------------
var searchLocation = document.getElementById("searchLocation");

searchLocation.addEventListener("input", function (e) {
    userInput = e.target.value;
    getWeather(userInput);
})



// --------geolocation------------

navigator.geolocation.getCurrentPosition(function (position) {
    var userLat = position.coords.latitude;
    var userLong = position.coords.longitude;
    getWeather(`${userLat},${userLong}`);
})

// --------weather data form API------------

async function getWeather(data) {
    var res = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d7750b889a5c4b8390c224448241812&q=${data}&days=3&aqi=no&alerts=no`);
    var dataWeather = await res.json();
    displayTodayWeather(dataWeather);
    displayTomorrowWeather(dataWeather);
    displayAfterTomorrowWeather(dataWeather);
}

// ---------display today weather------------ 

function displayTodayWeather(data) {
    var todayDateApi = data.current.last_updated;
    var todayDate = new Date(todayDateApi);

    var todayDateName = todayDate.toLocaleString("en-US", { weekday: "long" });
    var todayDateMonth = todayDate.toLocaleString("en-US", { month: "long" });
    var todayDateNumber = todayDate.getDate();

    todayName.innerHTML = todayDateName;
    todayNumber.innerHTML = todayDateNumber;
    todayMonth.innerHTML = todayDateMonth;
    todayLocation.innerHTML = data.location.name;

    todayTemp.innerHTML = data.current.temp_c;
    todayDegreeIcon.src = data.current.condition.icon;
    todayDescription.innerHTML = data.current.condition.text;

    todayHumidity.innerHTML = data.current.humidity;
    todayWind.innerHTML = data.current.wind_kph;
    todayCompass.innerHTML = data.current.wind_degree;

}


// ---------display tomorrow weather------------
function displayTomorrowWeather(data) {
    var tomorrowDateApi = data.forecast.forecastday[1].date;
    var tomorrowDate = new Date(tomorrowDateApi);
    var tomorrowDateName = tomorrowDate.toLocaleString("en-US", { weekday: "long" });

    tomorrowName.innerHTML = tomorrowDateName;
    tomorrowMinTemp.innerHTML = data.forecast.forecastday[1].day.mintemp_c;
    tomorrowMaxTemp.innerHTML = data.forecast.forecastday[1].day.maxtemp_c;
    tomorrowDegreeIcon.src = data.forecast.forecastday[1].day.condition.icon;
    tomorrowDescription.innerHTML = data.forecast.forecastday[1].day.condition.text;

}


// ---------display afterTomorrow weather------------

function displayAfterTomorrowWeather(data) {
    var afterDateApi = data.forecast.forecastday[2].date;
    var afterDate = new Date(afterDateApi);
    var afterDateName = afterDate.toLocaleString("en-US", { weekday: "long" });

    afterName.innerHTML = afterDateName;
    afterMinTemp.innerHTML = data.forecast.forecastday[2].day.mintemp_c;
    afterMaxTemp.innerHTML = data.forecast.forecastday[2].day.maxtemp_c;
    afterDegreeIcon.src = data.forecast.forecastday[2].day.condition.icon;
    afterDescription.innerHTML = data.forecast.forecastday[2].day.condition.text;

}
