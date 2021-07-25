function formatDate(date) {
    let hours = date.getHours();
    if (hours < 10) {
      hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10) {
      minutes = `0${minutes}`;
    }
    let dayIndex = date.getDay();
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    let day = days[dayIndex];
    let formattedDate = `${day}, ${hours}:${minutes}`;
    return formattedDate;
  }
  function displayForecast(response) {
    console.log(response.data.daily);
    let forecastElement = document.querySelector("#forecast");
    let forecastHTML = `<hr />`;
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"];
    days.forEach (function (day) {
      forecastHTML = forecastHTML + `<span class="forecast-days">${day} </span><span class="nextdays-max">84° </span>| <span class="nextdays-min">73°</span> <div class="forecast-icon"><span class="forecast-description">Thunderstorm</span> <img src="http://openweathermap.org/img/wn/01n@2x.png" width="36"/></div>`;
    });}
  function getForecast(coordinates) {
      console.log(coordinates);
      let apiKey = "4f368074f0c183534aaa3f5cab5a3038";
      let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
      console.log(apiUrl);
      axios.get(apiUrl).then(displayForecast);
    }

  function displayWeather(response) {
    document.querySelector("#city").innerHTML = response.data.name;
    document.querySelector("#temperature").innerHTML = Math.round(
      response.data.main.temp
    );
    document.querySelector("#feels-like").innerHTML = Math.round(
      response.data.main.feels_like
    );
    document.querySelector("#humidity").innerHTML = response.data.main.humidity;
    document.querySelector("#description").innerHTML =
      response.data.weather[0].main;
    document.querySelector("#speed").innerHTML = Math.round(response.data.wind.speed);
    document.querySelector("#icon").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`); 
    
    getForecast(response.data.coord);
    
    fahrenheitTemp = response.data.main.temp;
  }
  function search(city) {
    let apiKey = "4f368074f0c183534aaa3f5cab5a3038";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);
  }
  function handleSubmit(event) {
    event.preventDefault();
    let city = document.querySelector("#city-input").value;
    search(city);
  }
  search("College Station");
  
  function searchLocation(position) {
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    let apiKey = "4f368074f0c183534aaa3f5cab5a3038";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`;
    axios.get(apiUrl).then(displayWeather);
  }
  function currentLocation(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(searchLocation);
  }
  
  let searchForm = document.querySelector("#search-form");
  searchForm.addEventListener("submit", handleSubmit);
 
  function convertC(event) {
    event.preventDefault();
    aFahrenheit.classList.remove("active");
    aCelsius.classList.add("active");
    let celsiusTemp = (fahrenheitTemp - 32) * 5 / 9;
    let tempElement = document.querySelector("#temperature"); 
    tempElement.innerHTML = Math.round(celsiusTemp);
  }
  function convertF(event) {
    event.preventDefault();
    aCelsius.classList.remove("active");
    aFahrenheit.classList.add("active");
    let tempElement = document.querySelector("#temperature");
    tempElement.innerHTML = Math.round(fahrenheitTemp);
  }
  let fahrenheitTemp=null;

  let dateElement = document.querySelector("#date");
  let currentTime = new Date();
  dateElement.innerHTML = formatDate(currentTime);
  
  let aFahrenheit = document.querySelector("#fahrenheit-link");
  aFahrenheit.addEventListener("click", convertF);
  let aCelsius = document.querySelector("#celsius-link");
  aCelsius.addEventListener("click", convertC);
  
  let currentButton = document.querySelector("#current-button");
  currentButton.addEventListener("click", currentLocation);