function displayInfo(response) {
  let mainTemp = Math.round(response.data.temperature.current);
  let humidity = Math.round(response.data.temperature.humidity);
  let speed = Math.round(response.data.wind.speed);
  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = mainTemp;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#speed").innerHTML = speed;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;
}

function inputInfo(city) {
  let key = "4dad04c3ca4f2774bb04900t8b93bo1f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${key}&units=metric`;
  axios.get(apiUrl).then(displayInfo);
}
function sumbitInfo(event) {
  event.preventDefault();
  let city = document.querySelector("#enter-city").value;
  inputInfo(city);
}
document.querySelector("#show-city").addEventListener("submit", sumbitInfo);

function displayLocation(position) {
  let key = "4dad04c3ca4f2774bb04900t8b93bo1f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${position.coords.longitude}&lat=${position.coords.latitude}&key=${key}`;
  axios.get(apiUrl).then(displayInfo);
}
function displayPosition(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayLocation);
}
let current = document.querySelector("#currentLocation");
current.addEventListener("click", displayPosition);
inputInfo("Hanau");

function currentDate(date) {
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDay = date.getDay();
  let days = [
    `Sunday`,
    `Monday`,
    `Tuesday`,
    `Wednesday`,
    `Thursday`,
    `Friday`,
    `Saturday`,
  ];
  let day = days[currentDay];
  return `${day}, ${hours}:${minutes}`;
}
let p = document.querySelector("p#date");
let now = new Date();
p.innerHTML = currentDate(now);

function celsiusToFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector("#temperature");
  tempFahrenheit.innerHTML = 8;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusToFahrenheit);

function fahrenheitToCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#temperature");
  let fahrenheitUnit = tempCelsius.innerHTML;
  tempCelsius.innerHTML = Math.round((fahrenheitUnit * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitToCelsius);
