document.addEventListener('DOMContentLoaded', () => {
    const cityInput = document.getElementById('city-input');
    const getWeatherBTn = document.getElementById("get-weather-btn");
    const weatherInfo = document.getElementById('weather-info');
    const cityName = document.getElementById('city-name');
    const temperatureDisplay = document.getElementById('temperature');
    const descriptionDisplay = document.getElementById('description');
    const errorMessage = document.getElementById('error-message');
    const sunriseTime = document.getElementById('sunrise');

    const apikey = "814f60cb116d7510c6754cf0d25a0f96";
    getWeatherBTn.addEventListener('click', async () => {
        const city = cityInput.value.trim()
        if(!city) return;
        
        try {
            const weatherData = await fetchWeatherData(city);
            displayWeatherData(weatherData);
        } catch (error) {
            showError()
        }
         
    })

    async function fetchWeatherData(city) {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apikey}`;

        const response = await fetch(url);
        console.log(typeof response);
        console.log("RESPONSE", response);

        if(!response.ok) {
            throw new Error("City not Found");
        }
        const data = await response.json()
        
        return data ;
    }
    
    function displayWeatherData(weatherData) {
        console.log(weatherData);
        const {name, main, weather, sys} = weatherData;
        cityName.textContent = name;
        sunrise =  new Date(sys.sunrise * 1000)
        sunriseDisplay = {
            date: sunrise.toLocaleDateString(),
            time: sunrise.toLocaleTimeString()
        }

        weatherInfo.classList.remove('hidden');
        errorMessage.classList.add('hidden');
        temperatureDisplay.textContent = `Temperature: ${main.temp}`
        descriptionDisplay.textContent = `Weather: ${weather[0].description}`
        sunriseTime.textContent = `Sunrise: ${sunriseDisplay.date} ${sunriseDisplay.time}`;
    }
    
    function showError() {
        weatherInfo.classList.add('hidden');
        errorMessage.classList.remove('hidden');
    }

})

