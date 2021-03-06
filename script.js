//list of variables for easy access
//Left search column
let apiKey = "d423b4bd90678b82501d075774b8c2f7";
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