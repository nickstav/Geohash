async function getUserLocation() {
    if (navigator.geolocation) {
        console.log("geolocation available");
        let position = await getCoords();
        return {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        };
    } else {
        console.log('geolocation not available');
        return null;
    };
;}

function getCoords() {
    return new Promise((res, rej) => {
        navigator.geolocation.getCurrentPosition(res, rej);
    });
}

function getLocationAccuracy(stringLength, coord) {
//the nth bit gives an max error of (initial max error) / 2^n
//(eg error for latitude reduces from 45 to 22.5, 11.25, 5.625, etc)
  let totalBits = 5 * stringLength;
  let latitudeAccuracy = 45 / Math.pow(2, Math.floor(totalBits/2));
  let longitudeAccuracy = 90 / Math.pow(2, Math.round(totalBits/2));

  if (coord === "lat") {
      return latitudeAccuracy;
  } else if (coord === "long") {
      return longitudeAccuracy;
  }
}


export { getUserLocation, getLocationAccuracy }