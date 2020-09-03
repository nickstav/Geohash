import React from 'react';
import { loadMap, createMarker } from '../Algorithms/map.js';
let L = window.L;

class Map extends React.Component {
    //need to define the map after the component has mounted the <div> in which it belongs
    constructor(props, state) {
      super(props);
      this.map = null;
      this.marker = null;
      this.label = null;
      this.polygon = null;
      this.initialZoomLevel = 8;
    }
  
    componentDidMount() {
      const { latitude, longitude, maxLatitude, maxLongitude, minLatitude, minLongitude, showResults } = this.props;
  
      this.map = loadMap(latitude, longitude);
      this.marker = createMarker(this.map, latitude, longitude);
      this.label = this.writeLabel();
      this.polygon = L.polygon([
        [maxLatitude, minLongitude],
        [maxLatitude, maxLongitude],
        [minLatitude, maxLongitude],
        [minLatitude, minLongitude]
      ]);
  
      if (showResults) {
        this.polygon.addTo(this.map);
        this.map.fitBounds(this.polygon.getBounds());
        this.marker.bindPopup(this.label).openPopup();
      } else {
        //set an arbitrary zoom level centred on user's location
        this.map.setZoom(this.initialZoomLevel);
      }
    }
    //above function only called once, so ensure map properties are updated along with new props values
    componentDidUpdate() { 
      const { latitude, longitude, maxLatitude, maxLongitude, minLatitude, minLongitude, showResults } = this.props;
  
      this.marker.setLatLng([latitude, longitude]);
      this.polygon.setLatLngs([
        [maxLatitude, minLongitude],
        [maxLatitude, maxLongitude],
        [minLatitude, maxLongitude],
        [minLatitude, minLongitude]
      ]);
      this.label = this.writeLabel();
  
      if (showResults) {
        this.polygon.addTo(this.map);
        this.map.fitBounds(this.polygon.getBounds());
        this.marker.bindPopup(this.label).openPopup();
      }
    }
    writeLabel() {
  
      const { label, latitude, longitude } = this.props;
  
      if (label === 'userString') {
        return `estimated location: ${latitude.toFixed(2)}°, 
                ${longitude.toFixed(2)}°`;
      } else if (label !== null) {
        return `Geohash string for current location: <b>${label}</b>`;
      } else if (label === null) {
        return 'Getting string...';
      } else {
        return 'Error getting label';
      }
    }
    render() {
      return (
        <div id="mapHolder">
          <div id="mapFrame">
            <div id='mapDiv'></div>
          </div>
        </div>
      )
    }
  }

  export { Map }