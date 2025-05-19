const API_KEY = '9eabe8ab3b4b9acb5c9a471b446aa61e'

const btn = document.getElementById('search-btn');
const input = document.getElementById('city-input');
const resultCard = document.getElementById('weather-result');
const errorMsg = document.getElementById('error-message');

function fetchWeather(city) {
  
  resultCard.classList.add('hidden');
  errorMsg.classList.add('hidden');

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric&lang=es`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error('Ciudad no encontrada');
      return response.json();
    })
    .then(data => {
      
      document.getElementById('city-name').textContent = `${data.name}, ${data.sys.country}`;
      document.getElementById('temperature').textContent = `Temperatura: ${data.main.temp} °C`;
      document.getElementById('description').textContent = `Clima: ${data.weather[0].description}`;
      document.getElementById('humidity').textContent = `Humedad: ${data.main.humidity}%`;
      document.getElementById('wind').textContent = `Viento: ${data.wind.speed} m/s`;
      
      const iconCode = data.weather[0].icon;
      document.getElementById('weather-icon').src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
      document.getElementById('weather-icon').alt = data.weather[0].description;

      resultCard.classList.remove('hidden');
    })
    .catch(err => {
      errorMsg.textContent = err.message;
      errorMsg.classList.remove('hidden');
    });
}


btn.addEventListener('click', () => {
  const city = input.value.trim();
  if (!city) return;

  fetchWeather(city);
});