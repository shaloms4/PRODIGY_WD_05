document.getElementById('city-input').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        getWeather(document.getElementById('city-input').value);
    }
});

document.getElementById('search-button').addEventListener('click', function() {
    getWeather(document.getElementById('city-input').value);
});

function getWeather(city) {
    const apiKey = 'd0a212324f2eda2d3bc9b874b1baeef0'; 
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
                throw new Error(data.message); 
            }
            displayWeather(data);
            updateCityList(city);  
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            document.getElementById('weather-details').innerHTML = `<p>Error: ${error.message}</p>`;  
        });
}

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

function updateCityList(city) {
    const cityList = document.querySelector('.city-list');
    if (![...cityList.children].some(li => li.textContent === city)) {
        const li = document.createElement('li');
        li.textContent = city;
        cityList.appendChild(li);
    }
}

document.querySelector('.city-list').addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        getWeather(event.target.textContent);
    }
});
