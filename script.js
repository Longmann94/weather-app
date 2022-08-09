const searchBox = document.querySelector('#searchBox');
const searchBtn = document.querySelector('#searchButton');
const weatherDisplay = document.querySelector('.weather-container');
const weatherImage = document.querySelector('.weather-image');


async function getWeather() {

  try {
    const location = searchBox.value;
    const getLocation = await fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${location}&limit=5&appid=abc106e80842a4cdbc0191c41514e752`, {
      mode: 'cors'
    });
    const locationName = await getLocation.json();
    const getWeather = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${locationName[0].lat}&lon=${locationName[0].lon}&appid=abc106e80842a4cdbc0191c41514e752&units=metric`, {
      mode: 'cors'
    });
    const weather = await getWeather.json();
    weatherDisplay.textContent = `The weather in ${location} today is ${weather.main.temp}C with Min: ${weather.main.temp_min}C Max: ${weather.main.temp_max}C, currently it feels like ${weather.main.feels_like}C`;
    weatherImage.textContent = `It's `
    const img = document.createElement('img');
    img.src = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

    while(weatherImage.lastChild){
      weatherImage.removeChild(weatherImage.firstChild);
    }

    weatherImage.append(img);
    console.log(weather);
  } catch (err) {
    weatherDisplay.textContent = err;
  }

}

searchBtn.addEventListener('click', getWeather);
