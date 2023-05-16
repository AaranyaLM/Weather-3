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
    
    let weatherData=[]; //naya 

    if (!city) { // condn 1: if there is no city name in search bar
      const cityData = localStorage.getItem("city");
      if (cityData) { // condn 1.1: if there is no city name , but there is local st data
        console.log("Data accessed from local storage");
        const data = JSON.parse(cityData);
        showWeather(data);
      } else { //condn 1.2: if there is no city name and no local st data (default)
        console.log("Data accessed from the internet");
        const url = `https://api.openweathermap.org/data/2.5/weather?q=Aylesbury%20Vale&appid=${apiKey}&units=metric`;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            localStorage.setItem("city", JSON.stringify(data));
            showWeather(data);
          })
          .catch((error) => console.error(error));
      }
    } else { // condn 2: if there is a city name in search bar
      const cityData = localStorage.getItem("city");
      if (cityData) { //condn 2.1: if there is local st data available
        const data = JSON.parse(cityData);
        if (data.name.toLowerCase() == city.toLowerCase()) {// condn 2.1.1: if the local st city name is same as the searched city name
          console.log("Data accessed from local storage");
          showWeather(data);
        } else {// condn 2.1.2: if the local st city name is not the same as the searched city name
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
                localStorage.setItem("city", JSON.stringify(onData));
                showWeather(onData);
              }
            })
            .catch((error) => console.error(error));
        }
       } //else {
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
    }
  };


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