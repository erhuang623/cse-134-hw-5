
const imageUrl = 'https://api.weather.gov/gridpoints/SGX/55,22/forecast';
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
    showWeather(`${properties.temperature}`,`${properties.shortForecast}`, `${properties.icon}`, `${properties.windSpeed}`, `${properties.windDirection}`);

  })
  .catch(error => {
    console.error('There was a problem fetching the weather data:', error);
   });

function showWeather(temperature, description, icon, windSpeed, direction) {
  document.getElementById('temperature').innerHTML = temperature +  "°F";
  document.getElementById('description').innerHTML = description;
  document.getElementById('weatherImage').src = icon;
  document.getElementById('windSpeed').innerHTML = windSpeed;
  // document.getElementById('direction').innerHTML = direction;
  if (direction == 'S') {
    document.getElementById('direction').innerHTML = "South";
  } 
  else if(direction == 'N') {
    document.getElementById('direction').innerHTML = "North";
  }

  else if(direction == 'E') {
    document.getElementById('direction').innerHTML = "East";
  }

  else if(direction == 'W') {
    document.getElementById('direction').innerHTML = "West";
  } 

  //keeking multidirectional to the acronym such as SW or NE.
}  