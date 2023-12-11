
const url = 'https://api.weather.gov/gridpoints/SGX/55,22/forecast';
  fetch(url)
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok.');
    }
    return response.json();
  })
  .then(data => {
    const properties = data.properties.periods[0];
    showWeather(`${properties.temperature}`,`${properties.shortForecast}`, `${properties.icon}`);

  })
  .catch(error => {
    console.error('There was a problem fetching the weather data:', error);
   });

function showWeather(temperature, description, icon) {
  document.getElementById('temperature').innerHTML = temperature +  "°F";
  document.getElementById('description').innerHTML = description;
  document.getElementById('weatherImage').src = icon;
}