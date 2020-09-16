function getLocation(string) {
    let binaryCoords = getLatLongAsBinary(string)

    if (binaryCoords === null) {
        return null;
    }

    let latitudeRange = [-90, 0, 90];
    let longitudeRange = [-180, 0, 180];

    let latitude = getGeoCoords(binaryCoords.latitude, latitudeRange);
    let longitude = getGeoCoords(binaryCoords.longitude, longitudeRange);

    return {
            minLatitude: latitude.min,
            maxLatitude: latitude.max,
            averageLatitude: latitude.average,
            minLongitude: longitude.min,
            maxLongitude: longitude.max,
            averageLongitude: longitude.average
            };
}

// function to turn string of chracters into their binary representations and join them together
function getLatLongAsBinary(string) {
    let binaryString = '';
    for (const character of string) {
        let binaryValue = getBinaryRepresentation(character);
        if (binaryValue === null) {
            alert(`Error: "${character}" is not a valid character for Geohashing.`)
            return null;
        } else {
            binaryString = binaryString + binaryValue;
        }
    }
    
    return splitBinaryIntoLatLong(binaryString)
}


function getBinaryRepresentation(character) {
    // define geohash alphabet as a string where the index represents the decimal value
    const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';
    let decimalValue = base32.indexOf(character);

    //if the character is not in the string, indexOf() returns -1
    if (decimalValue === -1) {
        return null;
    } else {
        return convertToBinary(decimalValue);
    }
}


// function to split a binary string into its even characters (longitude) & odd characters (latitude)
function splitBinaryIntoLatLong(string) {
    let latitude = '';
    let longitude = '';

    for (let i = 0; i < string.length; i++) {
        if (i === 0 || i%2 === 0) {
            longitude = longitude + string[i]; 
        } else {
            latitude = latitude + string[i];
        };
    }

    return {latitude, longitude};
}


function convertToBinary(decimal) {
    let binaryNumber = decimal.toString(2);

    //we want a binary representation of 5 bits, so add relevant no. 0s to start of smaller values
    while (binaryNumber.length < 5) {
        binaryNumber = '0' + binaryNumber;
    }

    return binaryNumber;
}


function getGeoCoords(binaryCoords, range) {
    // take the first or second half of the array range depending on whether the bit is 0 or 1
    for (let i = 0; i < binaryCoords.length; i++) {
        if (binaryCoords[i] === '0') {
            // if 0 remove last element of array
            range.pop();
        } else {
            // if 1 remove first entry of array
            range.shift();
        }
        // define the new average value and add to the middle of the range array
        let newMidPoint = (range[0] + range[1]) / 2;
        range.splice(1, 0, newMidPoint);
    }
    // return the final average value
    return {
            min: range[0], 
            max: range[2], 
            average: range[1]
            };
}


export { getLocation }