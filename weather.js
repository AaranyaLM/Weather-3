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

const getWeatherOn=()=>{
    let search = document.querySelector("#search")
    title.innerHTML = "";
    weather.innerHTML = `<p>Loading...</p>`;
    let city = search.value;
    if(!city){
        const cityData = localStorage.getItem("city");
        if (cityData) { //will display if there is a local storage data available
            console.log("Accessed from localStorage")
            const data = JSON.parse(cityData);
            showWeather(data);
        } else { //will display aylesbury if no local storage and no city value is found
            const url = `https://api.openweathermap.org/data/2.5/weather?q=Aylesbury%20Vale&appid=${apiKey}&units=metric`;
            fetch(url)
            .then((response) => response.json())
            .then((data) => {
                    localStorage.setItem("city", JSON.stringify(data));
                    getWeatherOn()
                
            })
            .catch((error) => console.error(error));
        }
    }else{
        const cityData= localStorage.getItem("city")
        if(cityData){
            const data = JSON.parse(cityData);
            if(data.name.toLowerCase()==city.toLowerCase()){
                console.log("Accessed from localStorage")
                showWeather(data)
            }else{
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
            fetch(url)
            .then((response)=>response.json())
            .then((onData)=>{
                if (onData.cod == "404") {
                    weather.innerHTML = `
                        <h2 style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%);"> City not found </h2>
                    `;
                }else{
                    console.log("Accessed from the internet")
                    localStorage.setItem("city", JSON.stringify(onData));
                    showWeather(onData);
                }
            })
            .catch((error) => console.error(error));
        }
    }
       
    }
}

const getWeatherOff=()=>{

}


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