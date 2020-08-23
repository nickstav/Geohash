import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { getLocation } from './stringAlgorithm.js';
import { getUserLocation, getLocationAccuracy } from './userLocation.js';
import { getStringForGivenLatLong } from './locationAlgorithm.js';
import { loadMap, createMarker } from './map.js';

// not sure about having to do this... bleurgh
let L = window.L;

// (PS - I know I need to add divs and tidy all the html bits below :-) )

class Map extends React.Component {
  //need to define the map after the component has mounted the <div> in which it belongs
  componentDidMount() {
    this.map = loadMap(this.props.latitude, this.props.longitude);
    this.marker = createMarker(this.map, this.props.latitude, this.props.longitude);
    this.label = this.writeLabel();
    this.polygon = L.polygon([
      [this.props.maxLatitude, this.props.minLongitude],
      [this.props.maxLatitude, this.props.maxLongitude],
      [this.props.minLatitude, this.props.maxLongitude],
      [this.props.minLatitude, this.props.minLongitude]
    ]);

    if (this.props.showResults) {
      this.polygon.addTo(this.map);
      this.map.fitBounds(this.polygon.getBounds());
      this.marker.bindPopup(this.label).openPopup();
    } else {
      //set an arbitrary zoom level centred on user's location
      this.map.setZoom(8);
    }
  }
  //above function only called once, so ensure map properties are updated along with new props values
  componentDidUpdate() { 
    this.marker.setLatLng([this.props.latitude, this.props.longitude]);
    this.polygon.setLatLngs([
      [this.props.maxLatitude, this.props.minLongitude],
      [this.props.maxLatitude, this.props.maxLongitude],
      [this.props.minLatitude, this.props.maxLongitude],
      [this.props.minLatitude, this.props.minLongitude]
    ]);
    this.label = this.writeLabel();

    if (this.props.showResults) {
      this.polygon.addTo(this.map);
      this.map.fitBounds(this.polygon.getBounds());
      this.marker.bindPopup(this.label).openPopup();
    }
  }
  writeLabel() {
    if (this.props.label === 'userString') {
      return `estimated location: ${this.props.latitude.toFixed(2)}°, 
              ${this.props.longitude.toFixed(2)}°`;
    } else if (this.props.label !== null) {
      return `Geohash string for current location: <b>${this.props.label}</b>`;
    } else if (this.props.label === null) {
      return 'Getting string...';
    } else {
      return 'Error getting label';
    }
  }
  render() {
    return (
       <div id='mapDiv'></div>
    )
  }
}


class StringInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      string: '',
      coords: null,
      showMap: false
    };
  }
  updateString = (event) => {
    this.setState({string: event.target.value});
  }
  getGeohash = () => {
    if (this.state.string.length < 2 || this.state.string.length > 12) {
      alert('Error: Please enter a string of length 2-12 characters');
      return;
    }
    let geohash = getLocation(this.state.string);
    if (geohash === null) {
      alert('Error: One or more characters are not valid for Geohashing')
    } else {
      this.setState({
        showMap: true,
        coords: geohash
      });
    } 
  }
  renderMap() {
    if (this.state.showMap) {
      return (
        <Map 
          latitude={this.state.coords.averageLatitude}
          longitude={this.state.coords.averageLongitude}
          minLatitude={this.state.coords.minLatitude}
          maxLatitude={this.state.coords.maxLatitude}
          minLongitude={this.state.coords.minLongitude}
          maxLongitude={this.state.coords.maxLongitude}
          label={'userString'}
          showResults={true}
        />
      )
    }
  }
  render() {
    return (
      <div>
        <h2>Find a location!</h2>
        <p>Enter a 2-12 character string using the Geohash alphabet:</p>
        <input
          type="text"
          onChange={this.updateString}
        />
        <input
          type="button"
          value="Submit"
          onClick={this.getGeohash}
        />
        <p id="instructions">
          (the Geohash alphabet [32ghs] uses all
          digits 0-9 and almost all <b>lower case</b> letters except a, i, l and o)
        </p>
        {this.renderMap()}
      </div>
    );
  }
}


class UserLocation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stringLength: 6,
      string: null,
      userLocation: null,
      latAccuracy: 0,
      longAccuracy: 0,
      requestSubmitted: false
    };
  }
  async componentDidMount() {
    let coords = await getUserLocation();
    this.setState({userLocation: coords});
  }
  setCharacterLength = (event) => {
    this.setState({stringLength: event.target.value});
  }
  getString = () => {
    if (this.state.UserLocation === null) {
      alert("User location not found - please wait a few seconds and try again (if the problem persists, check that your location can be shared");
    } else {
      this.setState({
        string: getStringForGivenLatLong(this.state.userLocation, this.state.stringLength),
        latAccuracy: getLocationAccuracy(this.state.stringLength, "lat"),
        longAccuracy: getLocationAccuracy(this.state.stringLength, "long"),
        requestSubmitted: true
      });
    }
  }
  renderMap() {
    if (this.state.userLocation === null) {
      return (
        <p>Finding location...</p>
      )
    } else {
        return (
          <Map 
            latitude={this.state.userLocation.latitude}
            longitude={this.state.userLocation.longitude}
            minLatitude={this.state.userLocation.latitude - this.state.latAccuracy}
            maxLatitude={this.state.userLocation.latitude + this.state.latAccuracy}
            minLongitude={this.state.userLocation.longitude - this.state.longAccuracy}
            maxLongitude={this.state.userLocation.longitude + this.state.longAccuracy}
            label={this.state.string}
            showResults={this.state.requestSubmitted}
          />
        )
    }
  }
  render() {
    return (
      <div>
        <h2>Get your location!</h2>
        <p>Select the accuracy (i.e. string length) and click "submit" to geohash your current location</p>
        <input
          type="range"
          min="2" max="12" step="1"
          defaultValue="6"
          onInput={this.setCharacterLength}
        />
        <input
          type="button"
          value="Submit"
          onClick={this.getString}
        />
        <p>String length: {this.state.stringLength} characters</p>
        {this.renderMap()}
      </div>
    );
  }
}



class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      function: ""
    };
  }
  changeFunction = (event) => {
    this.setState({function: event.target.value});
  }
  switchAppFunction() {
    if (this.state.function === "userInput") {
      return <StringInput/>
    } else if (this.state.function === "userLocation") {
      return <UserLocation/>
    };
  }
  render() {
    return (
      <div id="mainBody">
        <h1>Geohash!</h1>
        <div id="appOptions" onChange={this.changeFunction}>
          <input type="radio" value="userInput" name="selectFunction"/>Enter a custom Geohash string
          <input type="radio" value="userLocation" name="selectFunction"/>Get your current location
        </div>
        <div id="userInterface">
          {this.switchAppFunction()}
        </div>
         
      </div>
    );
  }
}

  // ========================================
  
ReactDOM.render(
  <App />,
  document.getElementById('root')
);
  