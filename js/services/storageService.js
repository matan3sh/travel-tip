export const storageService = {
  saveToStorage,
  loadFromStorage,
};

function saveToStorage(key, value) {
  let valueStr = JSON.stringify(value);
  localStorage.setItem(key, valueStr);
}

function loadFromStorage(key) {
  let value = JSON.parse(localStorage.getItem(key));
  return value;
}
