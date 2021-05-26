//list of variables for easy access
//Left search column
let searchHistoryList = $(".search-history-list");
let searchCityInput = $(".search-city");
let searchCityButton = $(".search-city-button");
let clearHistoryButton = $(".clear-history");

//Right column information
let currentCity = $(".current-city");
let currentTemp = $(".current-temp");
let currentHumidity = $(".current-humidity");
let currentWindSpeed = $(".current-wind-speed");
let UVindex = $(".uv-index");
let fiveDayForecast = $(".five-day-forecast");

//Display current date 
let currentDate = moment().format('L');
$("#current-date").text("(" + currentDate + ")"); 

// start a search function to fetch data

function startSearch (event) {
    event.preventDefault();
    
    let userInput = document.querySelector("#search-value").value;

    if (!userInput) {
        console.log('Please enter a valid city!')
        return;
    } else {
        getWeatherForecast (userInput);
        getFiveDay (userInput);
        saveSearch (userInput);
        searchClear ();
    }
}

// clear search function
let searchClear = function () {
    userInput.value = '';
}

// 


// initiate button on click
let buttonClicked = function (event) {
    let newSearch = event.target.getAttribute('');

    if (newSearch) {
        getWeatherForecast(newSearch);
        getFiveDay(newSearch);
    }
}

let getWeatherForecast = function (city) {
    let apiKey = 'https://api.openweathermap.org/data/2.5/weather?q=' + city + '&units=imperial' + '&appid=e1cda767f020cb0ebf52c83958433ba3';

    fetch(apiKey)
        .then(function (response) {
            if (response.ok) {
                response.json().then(function (data) {
                    displayWeather(data,city);
                });
            } else {
                alert('Error: ' + response.statusText);
            }
        })
        .catch(function (error) {
            alert('OpenWeatherMap not able to load')
        });
};


searchCityButton.addEventListener('click', startSearch);
clearHistoryButton.addEventListener('click', buttonClicked);