// Event listener for Enter key press in the city input field
document.getElementById('city-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        getWeather(document.getElementById('city-input').value);
    }
});

// Event listener for click on the search button
document.getElementById('search-button').addEventListener('click', function() {
    getWeather(document.getElementById('city-input').value);
});

// Fetch weather data from the OpenWeatherMap API
function getWeather(city) {
    const apiKey = 'd0a212324f2eda2d3bc9b874b1baeef0';  // Your actual API key
    const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
            updateCityList(city);  // Add the city to the list
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-details').innerHTML = `<p>Error: ${error.message}</p>`;  // Show error message
        });
}

// Display weather information on the page
function displayWeather(data) {
    const location = `${data.name}, ${data.sys.country}`;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const date = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit' });

    document.getElementById('location').innerText = location;
    document.getElementById('date').innerText = date;
    document.getElementById('weather-description').innerText = description;
    document.getElementById('temperature').innerText = `${temperature}°`;

    document.getElementById('temperature-detail').innerText = temperature;
    document.getElementById('humidity-detail').innerText = humidity;
    document.getElementById('wind-speed-detail').innerText = windSpeed;
}

// Update the city list with recent searches
function updateCityList(city) {
    const cityList = document.querySelector('.city-list');
    if (![...cityList.children].some(li => li.textContent === city)) {
        const li = document.createElement('li');
        li.textContent = city;
        cityList.appendChild(li);
    }
}

// Add event listeners to city list items for weather updates
document.querySelector('.city-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        getWeather(event.target.textContent);
    }
});
