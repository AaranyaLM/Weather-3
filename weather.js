const apiKey="1bb0ad32be0d73c2ed42f310d07ee508"
const button= document.querySelector("#button")
const weather= document.querySelector("#weather")
const title= document.querySelector("#title")

const getConnectionStatus=(status)=>{
    if(status){
        console.log("Online")
        getWeatherOn()
    }else{
        console.log("Offline")
        getWeatherOff()
    }
}

const getWeatherOn = () => {
  let search = document.querySelector("#search");
  title.innerHTML = "";
  weather.innerHTML = `<p>Loading...</p>`;
  let city = search.value;

  let weatherData = [];

  if (!city) {
    const cityData = localStorage.getItem("city");
    if (cityData) {
      console.log("Data accessed from local storage");
      weatherData = JSON.parse(cityData); // Retrieve the weather data array from local storage
      const data = weatherData[weatherData.length - 1]; // Get the latest data from the array
      showWeather(data);
    } else {
      console.log("Data accessed from the internet");
      const url = `https://api.openweathermap.org/data/2.5/weather?q=Aylesbury%20Vale&appid=${apiKey}&units=metric`;
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          weatherData.push(data); // Append data to the weatherData array
          localStorage.setItem("city", JSON.stringify(weatherData)); // Store the updated weatherData array in local storage
          showWeather(data);
        })
        .catch((error) => console.error(error));
    }
  } else {
    const cityData = localStorage.getItem("city");
    if (cityData) {
      weatherData = JSON.parse(cityData); // Retrieve the weather data array from local storage
      const matchingData = weatherData.find(
        (data) => data.name.toLowerCase() === city.toLowerCase()
      );
      if (matchingData) {
        console.log("Data accessed from local storage");
        showWeather(matchingData);
      } else {
        console.log("Data accessed from the internet");
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(url)
          .then((response) => response.json())
          .then((onData) => {
            if (onData.cod == "404") {
              weather.innerHTML = `
                <h2 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"> City not found </h2>
              `;
            } else {
              weatherData.push(onData); // Append data to the weatherData array
              localStorage.setItem("city", JSON.stringify(weatherData)); // Store the updated weatherData array in local storage
              showWeather(onData);
            }
          })
          .catch((error) => console.error(error));
      }
    }
  }
};

  //else {
      //   console.log("Data accessed from the internet");
      //   const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      //   fetch(url)
      //     .then((response) => response.json())
      //     .then((onData) => {
      //       if (onData.cod == "404") {
      //         weather.innerHTML = `
      //         <h2 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"> City not found </h2>
      //         `;
      //       } else {
      //         localStorage.setItem("city", JSON.stringify(onData));
      //         showWeather(onData);
      //       }
      //     })
      //     .catch((error) => console.error(error));
      // }

  const getWeatherOff = () => {
    const cityData = localStorage.getItem("city");
    if (cityData) {
      console.log("Data accessed from local storage");
      const data = JSON.parse(cityData);
      showWeather(data);
    } else {
      console.log("Failed to fetch data: no internet connection");
      weather.innerHTML = `
        <h2 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);">
          Failed to fetch data. Please check your internet connection and try again.
        </h2>`;
    }
  };



const showWeather=(data)=>{
    console.log(data)
    
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    const today = new Date();
    const date = today.getDate();
    const monthIndex = today.getMonth();
    const year = today.getFullYear();
    const monthName = months[monthIndex];
    const formattedDate = `${date} ${monthName}, ${year}`;  

    title.innerHTML=`
        <h1>${data.name}</h1>
        <h2>${formattedDate}</h2>
    `
    weather.innerHTML=`
    <div class="row-1">
        <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png">
        <div class="item-title">${data.weather[0].main}</div>
    </div>

    <div class="row-2">

        <div class="item">
            <i class="fa-solid fa-temperature-three-quarters"></i>
            <div class="item-title">
                Temperature
            </div>
            <div class="item-content">
                ${data.main.temp}°C
            </div>
        </div>

        <div class="item">
            <i class="fa-solid fa-gauge"></i>
            <div class="item-title">
                Pressure
            </div>
            <div class="item-content">
              ${data.main.pressure} mb
            </div>
        </div>

        <div class="item">
            <i class="fa-solid fa-wind"></i>
            <div class="item-title">
                Windspeed
            </div>
            <div class="item-content">
                ${data.wind.speed} km/h
            </div>
        </div>

        <div class="item">
            <i class="fa-solid fa-droplet"></i>
            <div class="item-title">
                Humidity
            </div>
            <div class="item-content">
                ${data.main.humidity}%
            </div>
        </div>

        </div>
    </div>
    `
}
window.onload= function(){
    getConnectionStatus(navigator.onLine)
}

window.addEventListener("keydown",function(e){
    switch(e.keyCode){
        case 13:
            getConnectionStatus(navigator.onLine)
            break;
    }
})