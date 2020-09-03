import React from 'react';
import { Splash } from './Splash.js'
import { TopBar } from './TopBar.js';
import { StringInput } from './StringInput.js';
import { UserLocation } from './UserLocation.js';

class App extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        function: "",
        menuOpen: false,
        appStarted: false
      };
    }
    changeFunction = (event) => {
      this.setState({
          function: event.target.value,
          menuOpen: !this.state.menuOpen,
          appStarted: true
        });
    }
    switchAppFunction() {
      if (this.state.function === "userInput") {
        return <StringInput/>
      } else if (this.state.function === "userLocation") {
        return <UserLocation/>
      };
    }
    toggleMenu = (event) => {
        this.setState({
            menuOpen: !this.state.menuOpen
        });
    }
    renderMenu() {
        if (this.state.menuOpen) {
            return (
                <div id="appOptions" onChange={this.changeFunction}>
                  <label>
                    Enter a custom Geohash string<br />
                    <input type="radio" value="userInput" name="selectFunction"/>
                  </label>
                  <label>
                    Find your current location<br />
                    <input type="radio" value="userLocation" name="selectFunction"/>
                  </label>
                </div>
            )
        }
    }
    renderSplash() {
        if (!this.state.appStarted) {
            return (
                <Splash/>
            )
        }
    }
    render() {
      return (
        <div id="wrapper">
            <TopBar toggleMenu={this.toggleMenu}/>
            {this.renderMenu()}
            {this.renderSplash()}
            <div id="userInterface">
                {this.switchAppFunction()}
            </div>
        </div>
      );
    }
  }

  export { App };