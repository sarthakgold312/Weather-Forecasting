async function getWeather() {
    const city = document.getElementById('cityInput').value;
    const apiKey = 'b357a981d82080f5322ec6ce830c7242';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherResult = `
                <h2>${data.name}, ${data.sys.country}</h2>
                <p>Temperature: ${(data.main.temp) - 273.15}°C</p>
                <p>Weather: ${data.weather[0].description}</p>
                <p>Humidity: ${data.main.humidity}%</p>
                <p>Wind Speed: ${data.wind.speed} m/s</p>
                <p>Sunrise : ${new Date(data.sys.sunrise * 1000).toLocaleTimeString()}</p>
                <p>Sunset : ${new Date(data.sys.sunset * 1000).toLocaleTimeString()}</p>
            `;
            document.getElementById('weatherResult').innerHTML = weatherResult;
        } else {
            document.getElementById('weatherResult').innerHTML = `<p>${data.message}</p>`;
        }
    } catch (error) {
        console.error('Error fetching weather data:', error);
        document.getElementById('weatherResult').innerHTML = `<p>Error fetching weather data</p>`;
    }
}