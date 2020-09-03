import React from 'react';
import { Map } from './Map.js';
import { getLocation } from '../Algorithms/stringAlgorithm.js';

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
          <h2>Find a location</h2>
          <p>Enter a 2-12 character string using the Geohash alphabet:</p>
          <p className="instructions">
            The Geohash alphabet [32ghs] uses all
            digits 0-9 and almost all <b>lower case</b> letters except a, i, l and o.
          </p>
          <input
            type="text"
            size="12"
            onChange={this.updateString}
            fontSize="50"
          />
          <input
            type="button"
            value="Submit"
            onClick={this.getGeohash}
          />
          {this.renderMap()}
        </div>
      );
    }
  }

  export { StringInput };