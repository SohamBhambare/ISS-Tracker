// Making a map and tiles
const mymap = L.map('issMap').setView([0, 0], 5);
const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';

const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const tiles = L.tileLayer(tileUrl, { attribution });
tiles.addTo(mymap);

// Making a marker with a custom icon
const issIcon = L.icon({
  iconUrl: 'iss200.png',
  iconSize: [70, 40],
  iconAnchor: [25, 16]
});
const marker = L.marker([0, 0], { icon: issIcon }).addTo(mymap);

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544';

let firstTime = true;

async function getISS() {
  const response = await fetch(api_url);
  const data = await response.json();
  console.log(data);
  const latitude = data.latitude
  const longitude = data.longitude
  const velocity = data.velocity
  const altitude = data.altitude
  const visibility = data.visibility

  //updates the location on the map
  mymap.setView([latitude, longitude], mymap.getZoom());
  marker.setLatLng([latitude, longitude]);


  document.getElementById('lat').textContent = latitude.toFixed(2);
  document.getElementById('lon').textContent = longitude.toFixed(2);
  document.getElementById('vel').textContent = velocity.toFixed(2);
  document.getElementById('alt').textContent = altitude.toFixed(2);
  document.getElementById('day').textContent = visibility;
}

getISS();

setInterval(getISS, 1000);
