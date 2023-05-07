const apiKey="9b6d0aa88d6f133dc229ec48ec83c0fe"
const form= document.querySelector("form")
const weather= document.querySelector("#weather")
let search= document.querySelector("#search")
const title= document.querySelector("#title")
search.value= "Aylesbury Vale"


const getWeather = (city) => {
    title.innerHTML = "";
    weather.innerHTML = `<p>Loading...</p>`;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        const database = JSON.stringify(data);
        localStorage.setItem("database", database);
        showWeather(data);
      })
      .catch((error) => {
        const database = localStorage.getItem("database");
        if (database) {
          showWeather(JSON.parse(database));
        } else {
          weather.innerHTML = `<h2>Something went wrong. Please try again later.</h2>`;
        }
      });
}

const showWeather=(data)=>{
    console.log(data)
    if(data.cod=="404"){
        weather.innerHTML=`a
            <h2 style=" position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);"> City not found </h2>
        `
        return
    }
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
    getWeather(search.value)
}

form.addEventListener("submit",function(event){
    getWeather(search.value)
    event.preventDefault()
})