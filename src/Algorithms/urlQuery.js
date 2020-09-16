function getURLQueryGeohash() {
    const urlQuery = new URLSearchParams(window.location.search);
    let geohashString = getStringFromParams(urlQuery);
    return geohashString;
}

function getStringFromParams(params) {
    if (params.has('string')) {
        return params.get('string');
    } else {
        if (params.toString().length > 1) {
            alert('Error: URL parameter could not be found. Please ensure url path is of the form "?string=..."')
        };
        return '';
    }
}

function updateURLQuery(string) {
    let params = new URLSearchParams(window.location.search);
    params.set("string", string);
    window.history.replaceState(null, null, "?"+params.toString());
}


export { getURLQueryGeohash, updateURLQuery }