function cityForecast(coordinates) {
  let key = "4dad04c3ca4f2774bb04900t8b93bo1f";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lon=${coordinates.longitude}&lat=${coordinates.latitude}&key=${key}&units=metric`;

  axios.get(apiUrl).then(displayForecast);
}

function displayInfo(response) {
  let mainTemp = Math.round(response.data.temperature.current);
  let humidity = Math.round(response.data.temperature.humidity);
  let speed = Math.round(response.data.wind.speed);
  let icon = document.querySelector("#weatherIcon");
  icon.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${response.data.condition.icon}.png`
  );
  celsiusTemperature = mainTemp;

  document.querySelector("#city").innerHTML = response.data.city;
  document.querySelector("#weatherIcon").innerHTML =
    response.data.condition.icon;
  document.querySelector("#temperature").innerHTML = mainTemp;
  document.querySelector("#humidity").innerHTML = humidity;
  document.querySelector("#speed").innerHTML = speed;
  document.querySelector("#description").innerHTML =
    response.data.condition.description;

  cityForecast(response.data.coordinates);
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

function displayForecast(response) {
  let forecastMon = document.querySelector("#forecastRow");
  let forecastHTML = `<div class="row">`;
  let days = ["Fri", "Sat", "Sun", "Mon", "Tue"];
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
      <div class="col">
        <div class="forecastDay">${day}</div>
           <img
              src="http://shecodes-assets.s3.amazonaws.com/api/weather/icons/clear-sky-day.png"
              class="forecastIcon"
              id="iconMon"
              alt=""
              width="36"
            />
            <div class="forecastTemp">
              <span class="forecastMondayMax">9°</span>
              <span class="forecastMondayMin">10°</span>          
        </div>
      </div>`;
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastMon.innerHTML = forecastHTML;
}

function celsiusToFahrenheit(event) {
  event.preventDefault();
  let tempFahrenheit = document.querySelector("#temperature");
  tempFahrenheit.innerHTML = celsiusTemperature;
}
let celsius = document.querySelector("#celsius");
celsius.addEventListener("click", celsiusToFahrenheit);

function fahrenheitToCelsius(event) {
  event.preventDefault();
  let tempCelsius = document.querySelector("#temperature");
  let fahrenheitUnit = tempCelsius.innerHTML;
  tempCelsius.innerHTML = Math.round((celsiusTemperature * 9) / 5 + 32);
}
let fahrenheit = document.querySelector("#fahrenheit");
fahrenheit.addEventListener("click", fahrenheitToCelsius);

let celsiusTemperature = null;

inputInfo("Hanau");
