// DOM Elements
const cityInput = document.getElementById('city-input');
const searchBtn = document.getElementById('search-btn');
const locationBtn = document.getElementById('location-btn');
const boilerplateLocationBtn = document.getElementById('boilerplate-location-btn');
const cityName = document.getElementById('city-name');
const currentDate = document.getElementById('current-date');
const currentTemp = document.getElementById('current-temp');
const highTemp = document.getElementById('high-temp');
const lowTemp = document.getElementById('low-temp');
const humidity = document.getElementById('humidity');
const windSpeed = document.getElementById('wind-speed');
const feelsLike = document.getElementById('feels-like');
const weatherIcon = document.getElementById('weather-icon');
const conditionText = document.getElementById('condition-text');
const dailyForecast = document.getElementById('daily-forecast');
const hourlyForecast = document.getElementById('hourly-forecast');
const loading = document.getElementById('loading');
const errorMessage = document.getElementById('error-message');
const errorText = document.getElementById('error-text');
const retryBtn = document.getElementById('retry-btn');
const weatherData = document.getElementById('weather-data');
const boilerplateUI = document.getElementById('boilerplate-ui');
const suggestionTags = document.querySelectorAll('.suggestion-tag');

// API endpoints
const CURRENT_WEATHER_API = 'http://localhost:8080/weather/';
const FORECAST_WEATHER_API = 'http://localhost:8080/weather/';

// State
let currentCity = '';

// Format date function
function formatDate(dateString) {
    try {
        // Your API returns format: "2025-11-02 12:32"
        const [datePart, timePart] = dateString.split(' ');
        const [year, month, day] = datePart.split('-');
        const [hours, minutes] = timePart.split(':');

        // Create date object in local timezone
        const date = new Date(year, month - 1, day, hours, minutes);

        if (isNaN(date.getTime())) {
            console.warn('Invalid date from API, using current time');
            return new Date().toLocaleDateString('en-US', {
                weekday: 'long',
                month: 'short',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                hour12: true
            });
        }

        const options = {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };

        return date.toLocaleDateString('en-US', options);
    } catch (error) {
        console.error('Error formatting date:', error);
        return new Date().toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        });
    }
}

// Format day name
function getDayName(dateString) {
    try {
        const date = new Date(dateString);
        if (isNaN(date.getTime())) {
            return 'Today';
        }
        const today = new Date();
        const tomorrow = new Date(today);
        tomorrow.setDate(tomorrow.getDate() + 1);

        if (date.toDateString() === today.toDateString()) return 'Today';
        if (date.toDateString() === tomorrow.toDateString()) return 'Tomorrow';

        return date.toLocaleDateString('en-US', { weekday: 'short' });
    } catch (error) {
        return 'Today';
    }
}

// Format hour for display
function formatHour(date) {
    const hours = date.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const displayHours = hours % 12 || 12;
    return displayHours + ' ' + ampm;
}

// Show boilerplate UI
function showBoilerplateUI() {
    boilerplateUI.style.display = 'flex';
    weatherData.style.display = 'none';
    errorMessage.style.display = 'none';
    loading.style.display = 'none';
}

// Hide boilerplate UI and show weather data
function showWeatherDataUI() {
    boilerplateUI.style.display = 'none';
    weatherData.style.display = 'block';
    errorMessage.style.display = 'none';
    loading.style.display = 'none';
}

// Show loading state
function showLoading() {
    loading.style.display = 'flex';
    boilerplateUI.style.display = 'none';
    weatherData.style.display = 'none';
    errorMessage.style.display = 'none';
}

// Hide loading state
function hideLoading() {
    loading.style.display = 'none';
}

// Show error message
function showError(message) {
    errorText.textContent = message;
    errorMessage.style.display = 'flex';
    boilerplateUI.style.display = 'none';
    weatherData.style.display = 'none';
    loading.style.display = 'none';
}

// Hide error message
function hideError() {
    errorMessage.style.display = 'none';
}

// Get current location using Geolocation API
function getCurrentLocation() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supported by this browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            position => {
                resolve({
                    latitude: position.coords.latitude,
                    longitude: position.coords.longitude
                });
            },
            error => {
                let errorMessage = 'Unable to retrieve your location. ';

                switch(error.code) {
                    case error.PERMISSION_DENIED:
                        errorMessage += 'Please allow location access to use this feature.';
                        break;
                    case error.POSITION_UNAVAILABLE:
                        errorMessage += 'Location information is unavailable.';
                        break;
                    case error.TIMEOUT:
                        errorMessage += 'Location request timed out.';
                        break;
                    default:
                        errorMessage += 'An unknown error occurred.';
                        break;
                }

                reject(new Error(errorMessage));
            },
            {
                timeout: 10000,
                enableHighAccuracy: false
            }
        );
    });
}

// Fetch current weather data
async function fetchCurrentWeather(city) {
    try {
        console.log(`Fetching weather for: ${city}`);
        const response = await fetch(`${CURRENT_WEATHER_API}${encodeURIComponent(city)}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('API Response:', data);
        return data;
    } catch (error) {
        console.error('Error fetching current weather:', error);
        throw new Error('Unable to fetch weather data. Please check the city name and try again.');
    }
}

// Fetch forecast weather data
async function fetchForecastWeather(city, days = 7) {
    try {
        console.log(`Fetching forecast for: ${city}, days: ${days}`);
        const response = await fetch(`${FORECAST_WEATHER_API}${encodeURIComponent(city)}/${days}`, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Forecast data:', data);
        return data;
    } catch (error) {
        console.error('Error fetching forecast:', error);
        throw new Error('Unable to fetch forecast data.');
    }
}

// Update UI with current weather data
function updateCurrentWeather(data) {
    if (!data) {
        console.error('No data provided to updateCurrentWeather');
        return;
    }

    console.log('📍 Location from API:', {
        city: data.city,
        region: data.region,
        country: data.country,
        coordinates: `${data.latitude}, ${data.longitude}`
    });

    // Show full location information to avoid confusion
    let locationText = data.city;
    if (data.region && data.region !== data.city) {
        locationText += `, ${data.region}`;
    }
    locationText += `, ${data.country}`;

    cityName.textContent = locationText;
    currentDate.textContent = `${data.conditionText || 'Unknown'} · ${formatDate(data.localTime)}`;
    currentTemp.textContent = `${Math.round(data.temperatureC)}°`;

    // Use forecast data for high/low temperatures if available
    let highTempValue = data.temperatureC + 3; // default offset
    let lowTempValue = data.temperatureC - 5; // default offset

    if (data.forecastdays && data.forecastdays.length > 0) {
        highTempValue = data.forecastdays[0].day.maxtemp_c;
        lowTempValue = data.forecastdays[0].day.mintemp_c;
    }

    highTemp.textContent = `${Math.round(highTempValue)}°`;
    lowTemp.textContent = `${Math.round(lowTempValue)}°`;

    // Use exact values from API
    humidity.textContent = `${data.humidity}%`;
    windSpeed.textContent = `${data.windKph} KpH`;
    feelsLike.textContent = `${Math.round(data.feelsLikeC)}°`;

    // Update weather icon and condition
    if (data.conditionIcon) {
        weatherIcon.src = `https:${data.conditionIcon}`;
    }
    conditionText.textContent = data.conditionText;
}

// Update hourly forecast
function updateHourlyForecast() {
    hourlyForecast.innerHTML = '';

    const now = new Date();
    const hours = [];
    const temps = [];
    const conditions = ['Clear', 'Partly Cloudy', 'Cloudy', 'Clear', 'Sunny', 'Clear', 'Partly Cloudy', 'Clear'];
    const icons = [
        '//cdn.weatherapi.com/weather/64x64/night/113.png',
        '//cdn.weatherapi.com/weather/64x64/night/116.png',
        '//cdn.weatherapi.com/weather/64x64/night/119.png',
        '//cdn.weatherapi.com/weather/64x64/day/113.png',
        '//cdn.weatherapi.com/weather/64x64/day/113.png',
        '//cdn.weatherapi.com/weather/64x64/day/116.png',
        '//cdn.weatherapi.com/weather/64x64/day/119.png',
        '//cdn.weatherapi.com/weather/64x64/day/113.png'
    ];

    // Generate data for next 24 hours (8 time slots)
    for (let i = 0; i < 8; i++) {
        const hour = new Date(now.getTime() + i * 3 * 60 * 60 * 1000);
        const hourString = i === 0 ? 'Now' : formatHour(hour);
        hours.push(hourString);

        // Generate realistic temperature curve
        const baseTemp = 25;
        const hourOfDay = hour.getHours();
        let tempVariation = 0;

        if (hourOfDay >= 22 || hourOfDay < 6) {
            tempVariation = -4; // Night
        } else if (hourOfDay >= 6 && hourOfDay < 12) {
            tempVariation = 2; // Morning
        } else if (hourOfDay >= 12 && hourOfDay < 16) {
            tempVariation = 6; // Afternoon
        } else {
            tempVariation = 3; // Evening
        }

        temps.push(baseTemp + tempVariation + Math.floor(Math.random() * 3));
    }

    hours.forEach((hour, index) => {
        const hourElement = document.createElement('div');
        hourElement.className = `hourly-item ${index === 0 ? 'current-hour' : ''}`;

        hourElement.innerHTML = `
            <span class="hour">${hour}</span>
            <img class="hourly-icon" src="https:${icons[index]}" alt="${conditions[index]}">
            <span class="hour-temp">${temps[index]}°</span>
            <span class="hour-condition">${conditions[index]}</span>
        `;

        hourlyForecast.appendChild(hourElement);
    });
}

// Update daily forecast
function updateDailyForecast(data) {
    dailyForecast.innerHTML = '';

    if (!data || !data.forecastdays || !Array.isArray(data.forecastdays)) {
        console.warn('Invalid forecast data');
        showError('Invalid forecast data received from server.');
        return;
    }

    // Ensure we show exactly 7 days
    const daysToShow = data.forecastdays.slice(0, 7);
    const today = new Date().toDateString();

    daysToShow.forEach((day, index) => {
        const dayElement = document.createElement('div');
        const isToday = new Date(day.date).toDateString() === today;
        dayElement.className = `daily-item ${isToday ? 'today' : ''}`;

        dayElement.innerHTML = `
            <span class="day-name">${getDayName(day.date)}</span>
            <img class="daily-icon" src="https:${day.day.condition.icon}" alt="${day.day.condition.text}">
            <div class="daily-temp">
                <span class="high-temp">${Math.round(day.day.maxtemp_c)}°</span>
                <span class="low-temp">${Math.round(day.day.mintemp_c)}°</span>
            </div>
        `;

        dailyForecast.appendChild(dayElement);
    });
}

// Load weather data for a city
async function loadWeatherData(city) {
    if (!city || city.trim() === '') {
        showError('Please enter a valid city name');
        return;
    }

    showLoading();
    hideError();

    try {
        console.log(`Loading weather data for: ${city}`);
        const currentData = await fetchCurrentWeather(city);

        if (currentData) {
            updateCurrentWeather(currentData);
            currentCity = city;

            // Fetch forecast data
            const forecastData = await fetchForecastWeather(city);
            if (forecastData) {
                updateDailyForecast(forecastData);
            }

            // Update hourly forecast
            updateHourlyForecast();

            // Show weather data UI
            showWeatherDataUI();

            // Save to localStorage
            localStorage.setItem('lastCity', city);

            console.log('Weather data loaded successfully');
        } else {
            throw new Error('No data received from API');
        }
    } catch (error) {
        console.error('Error loading weather data:', error);
        showError(error.message);
    } finally {
        hideLoading();
    }
}

// Load weather data for current location
async function loadCurrentLocationWeather() {
    showLoading();
    hideError();

    try {
        const position = await getCurrentLocation();
        console.log('Got location:', position);

        // For this example, we'll use a default city
        // In a real app, you would reverse geocode the coordinates
        await loadWeatherData("Delhi, India");

    } catch (error) {
        console.error('Error getting location:', error);
        showError(error.message);
    }
}

// Search for weather data
async function searchWeather() {
    const city = cityInput.value.trim();
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    await loadWeatherData(city);
    cityInput.value = ''; // Clear input after search
}

// Event listeners
searchBtn.addEventListener('click', searchWeather);
locationBtn.addEventListener('click', loadCurrentLocationWeather);
boilerplateLocationBtn.addEventListener('click', loadCurrentLocationWeather);
retryBtn.addEventListener('click', () => {
    if (currentCity) {
        loadWeatherData(currentCity);
    } else {
        showBoilerplateUI();
    }
});

cityInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        searchWeather();
    }
});

// Add event listeners to suggestion tags
suggestionTags.forEach(tag => {
    tag.addEventListener('click', () => {
        const city = tag.getAttribute('data-city');
        loadWeatherData(city);
    });
});

// Initialize app
window.addEventListener('DOMContentLoaded', () => {
    console.log('Weather app initializing...');

    // Always show boilerplate UI first, don't auto-load any city
    showBoilerplateUI();

    // Clear any stored city to prevent auto-loading
    localStorage.removeItem('lastCity');
});