import React from 'react';

function TopBar({toggleMenu}) {
        return (
            <div id="topBar">
                <h1>GEOHASH</h1>
                <button className="menu" onClick={toggleMenu}></button>
            </div>
        )
}

export { TopBar }