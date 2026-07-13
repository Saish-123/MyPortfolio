const apiKey = "b63367a246ae3952511667be5ce5d7d0";
const searchBtn = document.getElementById("search");
searchBtn.addEventListener("click", () => {
    const city = document.getElementById("city").value.trim();
    if(city===""){
        alert("Please enter a city.");
        return;
    }
    document.querySelector(".weather").style.display="block";
    getWeather(city);

});

async function getWeather(city){

    const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try{
        const response=await fetch(url);
        const data=await response.json();
        console.log(data);
        if(response.status!==200){
            alert(data.message);
            return;
        }
        document.getElementById("temp").innerHTML=
        Math.round(data.main.temp)+"°C";

        document.getElementById("cityName").innerHTML=
        data.name;

        document.getElementById("weather").innerHTML=
        data.weather[0].main;

        document.getElementById("humidity").innerHTML=
        data.main.humidity+"%";

        document.getElementById("wind").innerHTML=
        data.wind.speed+" km/h";

        // Weather Image
        const weatherIcons={
            Clear:"images/sun.png",
            Clouds:"images/cloudy.png",
            Rain:"images/heavy-rain.png",
            Drizzle:"images/heavy-rain.png",
            Thunderstorm:"images/storm.png",
            Snow:"images/snow.png",
            Mist:"images/cloudy.png",
            Smoke:"images/cloudy.png",
            Haze:"images/cloudy.png",
            Dust:"images/cloudy.png",
            Fog:"images/cloudy.png"
        };
        const condition=data.weather[0].main;
        document.getElementById("icon").src=
        weatherIcons[condition] || "images/cloudy.png";
    }
    catch(error){
        console.log(error);
        alert("Something went wrong!");
    }
}