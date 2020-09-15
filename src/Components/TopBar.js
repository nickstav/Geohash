import React from 'react';
import { checkIfDesktop } from '../Algorithms/checkDevice.js';

function TopBar({toggleMenu}) {
    let isDesktop = checkIfDesktop();
       
    if (isDesktop) {
        return (
            <div id="topBar">
                <h1>GEOHASH</h1>
            </div>
        )
    } else {
        return (
            <div id="topBar">
                <h1>GEOHASH</h1>
                {<button className="menu" onClick={toggleMenu}></button>}
            </div>
        )
    }
}

export { TopBar }