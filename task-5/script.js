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
    const location = `${data.name}`;
    const description = data.weather[0].description;
    const temperature = data.main.temp;
    const humidity = data.main.humidity;
    const windSpeed = data.wind.speed;
    const date = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit' });

    const weatherIcons = {
        'clear sky': 'fa-sun',
        'few clouds': 'fa-cloud-sun',
        'scattered clouds': 'fa-cloud',
        'broken clouds': 'fa-cloud-meatball',
        'shower rain': 'fa-cloud-showers-heavy',
        'rain': 'fa-cloud-showers-water',
        'thunderstorm': 'fa-bolt',
        'snow': 'fa-snowflake',
        'mist': 'fa-smog',
    };

    const iconClass = weatherIcons[description] || 'fa-cloud';

    document.getElementById('location').innerText = location;
    document.getElementById('date').innerText = date; 
    document.getElementById('weather-description').innerText = description;
    document.getElementById('temperature').innerText = `${temperature}°c`;
    document.getElementById('humidity-detail').innerText = `${humidity}`;
    document.getElementById('wind-speed-detail').innerText = `${windSpeed}`;
    document.getElementById('weather-icon').className = `fa ${iconClass}`;

    document.getElementById('temperature-detail').innerText = temperature; 
    document.getElementById('humidity-detail').innerText = humidity;
    document.getElementById('wind-speed-detail').innerText = windSpeed;
}

document.querySelectorAll('.city-list li').forEach(item => {
    item.addEventListener('click', () => {
        getWeather(item.textContent);
    });
});

function updateCityList(city) {
    const cityList = document.querySelector('.city-list');
    const cityItems = Array.from(cityList.querySelectorAll('li')).map(item => item.textContent);

    if (!cityItems.includes(city)) {
        const newCityItem = document.createElement('li');
        newCityItem.textContent = city;
        newCityItem.addEventListener('click', () => {
            getWeather(city);
        });

        cityList.appendChild(newCityItem);
    }
}

function setCurrentDate() {
    const date = new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short', year: '2-digit' });
    document.getElementById('date').innerText = date;
}

window.onload = function() {
    setCurrentDate();
};
