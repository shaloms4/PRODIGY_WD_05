document.getElementById('city-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const city = document.getElementById('city-input').value;
    getWeather(city);
});

function getWeather(city) {
    const apiKey = 'd0a212324f2eda2d3bc9b874b1baeef0';  // Your actual API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    document.getElementById('weather-info').innerHTML = '<p>Loading...</p>';  // Show loading indicator

    fetch(currentWeatherUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok: ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            if (data.cod !== 200) {
                throw new Error(data.message);  // Throw error for invalid responses
            }
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-info').innerHTML = `<p>Error: ${error.message}</p>`;  // Show error message
        });
}

function displayWeather(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.getElementById('location-info').innerHTML = `
        <p>Location: ${location}</p>
        <p>Description: ${description}</p>
    `;

    document.getElementById('weather-info').innerHTML = `
        <p>Temperature: ${temperature} °C</p>
        <p>Humidity: ${humidity} %</p>
        <p>Wind Speed: ${windSpeed} m/s</p>
    `;
}
