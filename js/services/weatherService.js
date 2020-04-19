export const weatherService = {
  getWeather,
};

function getWeather(coords, cityName) {
  const API_KEY = '744c0d7ccc28176f50864df53e6f789c';
  const prmRes = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?lat=${coords.lat}&lon=${coords.lng}&units=metric&APPID=${API_KEY}`
  );
  const prmData = prmRes.then((res) => {
    let locationName = cityName;
    let mainWeather = res.data.weather[0].main;
    let desc = res.data.weather[0].description;
    let currentTemp = res.data.main.temp + ' °C';
    let maxTemp = res.data.main.temp_max + ' °C';
    let minTemp = res.data.main.temp_min + ' °C';
    var icon = res.data.weather[0].icon;
    var wind = res.data.wind.speed + ' m/s';
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
