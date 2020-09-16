import React from 'react';
import { Map } from './Map.js';
import { getUserLocation, getLocationAccuracy } from '../Algorithms/userLocation.js';
import { getStringForGivenLatLong } from '../Algorithms/locationAlgorithm.js';

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
      if (this.state.userLocation === null || this.state.string === null) {
        return (
          <div id="loadingState">
            <p className="loadingText">Finding location...</p>
          </div>
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
        <React.Fragment>
          <div id="options">
            <h2>Get your location</h2>
            <p>Select the accuracy (i.e. string length) and click "submit" to Geohash your current location</p>
            <div id="stringLength">
              <label className="stringLength">
                <input
                  type="range"
                  className="slider"
                  min="2" max="12" step="1"
                  defaultValue="6"
                  onInput={this.setCharacterLength}
                />
                String length: {this.state.stringLength} characters
              </label>
            </div>
            <div id="buttonWrapper">
              <input
                type="button"
                value="Submit"
                onClick={this.getString}
              />
            </div>
          </div>
          {this.renderMap()}
          </React.Fragment>
      );
    }
  }

  export { UserLocation }