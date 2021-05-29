//list of variables for easy access

let currentCity = document.querySelector("#current-city");
let currentTemp = document.querySelector("#current-temp");
let currentHumidity = document.querySelector("#current-humidity");
let currentWindSpeed = document.querySelector("#current-wind-speed");
let UVindex = document.querySelector("#uv-index");
let fiveDayForecast = document.querySelector("#five-day-forecast");

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
    }
}

let searchArry = JSON.parse(localStorage.getItem("searches"));
let searchContainer = document.querySelector("#search-container");
let searchHistoryList = document.querySelector("#search-city-list");

function saveSearch (userInput) {
    let searchCityButton = document.createElement("button");
    searchCityButton.textContent = userInput;
    searchCityButton.setAttribute("class", "pastsearch");
    searchCityButton.setAttribute("id", userInput);

    searchContainer.append(searchCityButton);

    if (searchArry == null) {
        searchArry = [userInput];
        localStorage.setItem("searches", JSON.stringify(searchArry));
    } else {
        searchArry.push(searchCityButton.innerHTML);
        localStorage.setItem("searches", JSON.stringify(searchArry));
    }

}

displayPreviousSearches();

function displayPreviousSearches () {
    let pulledSearches = JSON.parse(localStorage.getItem("searches"));

    if (searchArry != null) {
        for (let i=0; i < pulledSearches.length; i++) {
            let search = pulledSearches[i];
            let btn = document.createElement("button");
            btn.textContent = search;
            btn.setAttribute("class", "previoussearch");
            searchContainer.append(btn);
        }
    }
}

// initiate button on click
let previousSearchClicks = $("#search-container");
    previousSearchClicks.on("click", ".previoussearch", repeatSearch);

function repeatSearch(event) {
    let buttonClicked = $(event.target);
    userInput = buttonClicked[0].innerHTML;
    document.querySelector("#search-value").value = buttonClicked[0].innerHTML;
    startSearch(event);
}

function getWeatherForecast(userInput) {
    
    let apiKey = 'https://api.openweathermap.org/data/2.5/weather?q=' + userInput + '&appid=d423b4bd90678b82501d075774b8c2f7' + '&units=imperial';

    fetch(apiKey)
        .then(function (response) {
           return response.json();
})
    .then(function (response) {

        currentCity.textContent = " " + response.name;

        let currentIcon = document.createElement("img");
        currentIcon.setAttribute("src", "http://openweathermap.org/img/w" + response.weather[0].icon + ".png");
        currentIcon.setAttribute("cookie", "SameSite=Lax");
        city.appendChild(currentIcon);

        currentTemp.textContent = " " + response.main.currentTemp + "°F";
        currentHumidity.textContent= " " + response.main.currentHumidity + "%";
        currentWindSpeed.textContent = " " + response.currentWindSpeed + " MPH";

        let lat = response.coord.lat;
        let long = response.coord.lon;

        let requestUVIndex = "http://api.openweathermap.org/data/2.5/uvi?lat=" + lat + "&lon=" + long + "&appid=d423b4bd90678b82501d075774b8c2f7";

        fetch(requestUVIndex)
            .then(function(response) {
                return response.json();
            })
            .then(function(response) {
                UVindex.textContent = " " + response.value;

                let currentUVIndex = parseFloat(response.value);

                if (currentUVIndex < 2) {
                    UVindex.setAttribute("style", "background-color: green;");
                } else if (currentUVIndex < 7) {
                    UVindex.setAttribute("style", "background-color: yellow;");
                } else {
                    UVindex.setAttribute("style", "background-color: red;");
                }
            })
    })

    // need to finish 5-day forecast 
}
