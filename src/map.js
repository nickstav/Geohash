let L = window.L;

function loadMap(lat, long) {
    let newMap = L.map('mapDiv').setView([lat,long], 1);
    const attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
    const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
    const tiles = L.tileLayer(tileUrl, { attribution });
    tiles.addTo(newMap);
  
    return newMap;
}
  
function createMarker(map, lat, long) {
    let newMarker = L.marker([lat, long]);
    newMarker.addTo(map);
  
    return newMarker;
}

export { loadMap, createMarker }