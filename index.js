const apiKey = "0826b9600796a72d4ac76fe09fb4e66d";
const units = "metric";

const criteriaInput = document.querySelector("#criteria");
const currentButton = document.querySelector("#current");

const form = document.getElementById("form");
form.addEventListener("submit", search);

function search(event) {
  event.preventDefault();
  doSearch(criteriaInput.value, units, apiKey);
}

currentButton.addEventListener("click", () => {
  navigator.geolocation.getCurrentPosition((position) => {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let reverseLookupUrl = `https://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${apiKey}`;
    axios.get(reverseLookupUrl).then((response) => {
      let location = response.data[0].name;
      doSearch(location, units, apiKey);
    });
  });
});

function showResult(response) {
  let result = response.data;
  let placeName = result.name;
  let description = result.weather[0].main;
  let temperature = Math.round(result.main.temp);
  let humidity = Math.round(result.main.humidity);
  let wind = Math.round(result.wind.speed);

  let placeNameElement = document.querySelector("#place-name");
  let descriptionElement = document.querySelector("#description");
  let temperatureElement = document.querySelector("#temperature");
  let humidityElement = document.querySelector("#humidity");
  let windSpeedElement = document.querySelector("#wind-speed");

  placeNameElement.innerHTML = placeName;
  descriptionElement.innerHTML = description;
  temperatureElement.innerHTML = temperature;
  humidityElement.innerHTML = humidity;
  windSpeedElement.innerHTML = wind;
}

function doSearch(location, units, apiKey) {
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=${units}&APPID=${apiKey}`;
  callWeatherService(apiUrl);
}

function callWeatherService(apiUrl) {
  axios.get(apiUrl).then(showResult);
}

function formatDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let currentDay = days[date.getDay()];
  let currentHour = date.getHours();
  let currentMinutes = String(date.getMinutes()).padStart(2, "0");

  let formattedDate = `${currentDay} ${currentHour}:${currentMinutes}`;

  return formattedDate;
}

let time = document.querySelector("#current-time");
time.innerHTML = formatDate(new Date());
