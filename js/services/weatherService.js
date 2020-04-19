export const weatherService = {
  getWeather,
};

function getWeather(coords, cityName) {
  const API_KEY = '744c0d7ccc28176f50864df53e6f789c';
  const prmRes = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&APPID=${API_KEY}`
  );
  const prmData = prmRes.then((res) => {
    let locationName = cityName;
    let mainWeather = res.data.weather[0].main;
    let desc = res.data.weather[0].description;
    let currentTemp = Math.floor(res.data.main.temp / 12.45) + '°c';
    let maxTemp = Math.floor(res.data.main.temp_max / 12.45) + '°c';
    let minTemp = Math.floor(res.data.main.temp_min / 12.45) + '°c';
    var icon = res.data.weather[0].icon;
    var wind = Math.floor(res.data.wind.speed * 3.6) + 'k/h';
    return {
      locationName,
      mainWeather,
      desc,
      currentTemp,
      maxTemp,
      minTemp,
      icon,
      wind,
    };
  });
  return prmData;
}
