import React from 'react';
import { Map } from './Map.js';
import { getLocation } from '../Algorithms/stringAlgorithm.js';

class StringInput extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        string: this.props.string,
        coords: null,
        showMap: false
      };
    }
    componentDidMount() {
      //show result of any URL Query that has been detected
      if (this.state.string.length > 1) {
        this.getGeohash();
      }
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
        <React.Fragment>
          <h2>Find a location</h2>
          <p>Enter a 2-12 character string using the Geohash alphabet:</p>
          <p className="instructions">
            The Geohash alphabet [32ghs] uses all
            digits 0-9 and almost all <b>lower case</b> letters except a, i, l and o.
          </p>
          <div id="textInputWrapper">
            <input
            value={this.state.string}
              type="text"
              size="12"
              onChange={this.updateString}
              fontSize="50"
            />
          </div>
          <div id="buttonWrapper">
            <input
              type="button"
              value="Submit"
              onClick={this.getGeohash}
            />
          </div>
          {this.renderMap()}
          </React.Fragment>
      );
    }
  }

  export { StringInput };