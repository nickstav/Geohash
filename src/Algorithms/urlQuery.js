function getURLQueryGeohash() {
    const urlQuery = new URLSearchParams(window.location.search);
    let geohashString = getStringFromParams(urlQuery);
    return geohashString;
}

function getStringFromParams(params) {
    if (params.has('string')) {
        return params.get('string');
    } else if (params.has('geohash')) {
        return params.get('geohash');
    } else {
        //if no string is explicity defined, return the param in full [minus the '=' that toString() adds]
        return params.toString().replace('=', '');
    }
}


export { getURLQueryGeohash }