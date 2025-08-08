const frontCoords = [44.074918, -92.438158];
const middleCoords = [44.074949, -92.437991];
const backCoords = [44.074995, -92.437500];

function toRad(degrees) {
  return degrees * Math.PI / 180;
}

function calculateDistance(lat1, lon1, lat2, lon2) {
  const R = 6371e3; // metres
  const φ1 = toRad(lat1);
  const φ2 = toRad(lat2);
  const Δφ = toRad(lat2 - lat1);
  const Δλ = toRad(lon2 - lon1);

  const a = Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
            Math.cos(φ1) * Math.cos(φ2) *
            Math.sin(Δλ / 2) * Math.sin(Δλ / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  const d = R * c; // in metres
  return d * 1.09361; // convert to yards
}

function getDistances() {
  if (!navigator.geolocation) {
    document.getElementById("status").textContent = "Geolocation is not supported by your browser.";
    return;
  }

  document.getElementById("status").textContent = "Getting location...";

  navigator.geolocation.getCurrentPosition(position => {
    const userLat = position.coords.latitude;
    const userLon = position.coords.longitude;

    const front = calculateDistance(userLat, userLon, ...frontCoords).toFixed(1);
    const middle = calculateDistance(userLat, userLon, ...middleCoords).toFixed(1);
    const back = calculateDistance(userLat, userLon, ...backCoords).toFixed(1);

    document.getElementById("frontDist").textContent = front;
    document.getElementById("middleDist").textContent = middle;
    document.getElementById("backDist").textContent = back;
    document.getElementById("status").textContent = "Distances updated.";
  }, () => {
    document.getElementById("status").textContent = "Unable to retrieve your location.";
  });
}
