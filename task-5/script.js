document.getElementById('location-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const location = document.getElementById('location-input').value;
    getWeather(location);
});

function getWeather(location) {
    const apiKey = 'YOUR_API_KEY';
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            console.log(data);
            displayWeather(data);
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
        });
}

function displayWeather(data) {
    const location = data.name;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;

    document.getElementById('location').innerText = `Location: ${location}`;
    document.getElementById('description').innerText = `Description: ${description}`;
    document.getElementById('temperature').innerText = `Temperature: ${temperature} °C`;
    document.getElementById('humidity').innerText = `Humidity: ${humidity} %`;
    document.getElementById('wind-speed').innerText = `Wind Speed: ${windSpeed} m/s`;
}
