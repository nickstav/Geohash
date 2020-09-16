import React from 'react';

function TopBar(props) {   
    if (props.isDesktop) {
        return (
            <div id="topBar">
                <h1>GEOHASH</h1>
            </div>
        )
    } else {
        return (
            <div id="topBar">
                <h1>GEOHASH</h1>
                {<button className="menu" onClick={props.toggleMenu}></button>}
            </div>
        )
    }
}

export { TopBar }