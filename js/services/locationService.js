import { utilService } from './utilService.js';
export const locationService = {
  getGeoCodeBySearch,
  initMap,
  deleteLocation,
};

function initMap(coords) {
  const { lat, lng } = coords;
  var map;
  return connectToGoogle().then(
    () =>
      (map = new google.maps.Map(document.querySelector('#map'), {
        center: { lat, lng },
        zoom: 14,
      }))
  );
}

function connectToGoogle() {
  const API_KEY = 'AIzaSyB52WZadL0qrmDyH9SjRaVGCxg98KR0dfc';
  let googleScript = document.createElement('script');
  googleScript.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
  googleScript.async = true;
  document.body.append(googleScript);
  return new Promise((resolve, reject) => {
    googleScript.onload = resolve;
    googleScript.onerror = () => reject('GoogleMaps failed to load');
  });
}

function getGeoCodeBySearch(searchValue) {
  var prmRes = axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
    params: {
      address: searchValue,
      key: 'AIzaSyB52WZadL0qrmDyH9SjRaVGCxg98KR0dfc',
    },
  });
  var prmData = prmRes.then((res) => {
    var cityName = res.data.results[0].address_components[0].long_name;
    var fullName = res.data.results[0].formatted_address;
    var coords = res.data.results[0].geometry.location;
    initMap(coords);
    return { id: utilService.makeId(), cityName, fullName, coords };
  });
  return prmData;
}

function deleteLocation(el) {
  if (el.classList.contains('delete')) {
    el.parentElement.parentElement.remove();
    localStorage.clear();
  }
}
