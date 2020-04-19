import { storageService } from './services/storageService.js';
import { locationService } from './services/locationService.js';
import { weatherService } from './services/weatherService.js';

window.onload = () => {
  let location = storageService.loadFromStorage('location');
  if (location) {
    locationService.initMap(location.coords);
    renderLocationsTable(location);
  }
};

document.querySelector('.btn-search').addEventListener('click', (e) => {
  e.preventDefault();
  let searchValue = document.querySelector('.search-value').value;
  locationService
    .getGeoCodeBySearch(searchValue)
    .then((res) => renderLocationsTable(res));
});

function renderLocationsTable(location) {
  const elLocationTable = document.querySelector('.locations-list');
  const locationRow = document.createElement('tr');
  const { id, cityName, fullName, coords } = location;
  locationRow.innerHTML = `
    <th>${id}</th>
    <td class="location-name">${fullName}</td>
    <td class="${cityName}"></td>
    <td>
    <button class="btn btn-warning action-btn ">Update</button>
    <button class="btn btn-danger delete action-btn">Delete</button>
    </td>
    `;
  elLocationTable.appendChild(locationRow);
  weatherService.getWeather(coords, cityName).then((res) => {
    renderWeather(res);
    renderWeatherTable(res);
  });
  storageService.saveToStorage('location', location);
}

function renderWeatherTable(locationWeather) {
  const { desc, icon, locationName } = locationWeather;
  let strHTML = `<img src="img/${icon}.png" class="weather-img"></img>
                <span class="weather-desc">${desc}</span>
    `;
  document.querySelector(`.${locationName}`).innerHTML = strHTML;
}

function renderWeather(weather) {
  const {
    locationName,
    desc,
    icon,
    currentTemp,
    mainWeather,
    maxTemp,
    minTemp,
    wind,
  } = weather;
  const strHTML = `
        <img src="img/${icon}.png"></img>
        <h2>${locationName}, ${currentTemp} ${mainWeather}</h2>
        <h3 class="text-secondary weather-desc">${desc}</h3>
        <strong>From: ${minTemp} to ${maxTemp}</strong>
        <p>Wind Speed: ${wind}</p>
    `;
  document.querySelector('.weather').innerHTML = strHTML;
  storageService.saveToStorage('weather', weather);
}

document.querySelector('.locations-list').addEventListener('click', (e) => {
  console.log(e.target);
  locationService.deleteLocation(e.target);
});
