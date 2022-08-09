const searchBox = document.querySelector('#searchBox');
const searchBtn = document.querySelector('#searchButton');
const weatherDisplay = document.querySelector('.weather-container');


async function getWeather() {

  try {
    const location = searchBox.value;
    const getLocation = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=abc106e80842a4cdbc0191c41514e752`, {
      mode: 'cors'
    });
    const locationName = await getLocation.json();
    const getWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationName[0].lat}&lon=${locationName[0].lon}&appid=abc106e80842a4cdbc0191c41514e752&units=metric`, {
      mode: 'cors'
    });
    const weather = await getWeather.json();
    weatherDisplay.textContent = weather.main.feels_like + 'C';
    console.log(weather);
  } catch (err) {
    weatherDisplay.textContent = err;
  }

}

searchBtn.addEventListener('click', getWeather);
