const apiKey="9b6d0aa88d6f133dc229ec48ec83c0fe"
const button= document.querySelector("#button")
const weather= document.querySelector("#weather")
const title= document.querySelector("#title")

const getWeather = () => {
    let search = document.querySelector("#search")
    title.innerHTML = "";
    weather.innerHTML = `<p>Loading...</p>`;
    let city = search.value;
    if (city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod == "404") {
                    weather.innerHTML = `
                        <h2 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"> City not found </h2>
                    `;
                } else {
                    localStorage.setItem("city", JSON.stringify(data));
                    showWeather(data);
                }
            })
            .catch((error) => console.error(error));
    } else {
        const cityData = localStorage.getItem("city");
        if (cityData) {
            const data = JSON.parse(cityData);
            showWeather(data);
        } else {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=Aylesbury%20Vale&appid=${apiKey}&units=metric`;
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                if (data.cod == "404") {
                    weather.innerHTML = `
                        <h2 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"> City not found </h2>
                    `;
                } else {
                    localStorage.setItem("city", JSON.stringify(data));
                    showWeather(data);
                }
            })
            .catch((error) => console.error(error));
        }
    }
};


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
    getWeather()
}

window.addEventListener("keydown",function(e){
    switch(e.keyCode){
        case 13:
            getWeather();
            break;
    }
})