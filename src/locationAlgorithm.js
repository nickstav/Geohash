function getStringForGivenLatLong(coords, stringLength) {
    if (coords === null) {
        return null;
    }
    let latitudeRange = [-90, 0, 90];
    let longitudeRange = [-180, 0, 180];
    let accuracy = stringLength;

    let latitudeBinary = convertToBinary(coords.latitude, latitudeRange, accuracy);
    let longitudeBinary = convertToBinary(coords.longitude, longitudeRange, accuracy);

    let binaryRepresentation = mergeArrays(longitudeBinary, latitudeBinary);

    return getGeohashString(binaryRepresentation);
}

function convertToBinary(coords, range, accuracy) {
    let bits = [];
    //5 bits for each character of the string
    let totalBitLength = 5 * accuracy;
    let coordBitLength = getBitLengthForLatOrLong(totalBitLength, range);
    for (let i = 0; i < coordBitLength; i++) {
            if (coords < range[1]) {
                bits.push('0');
                // if 0 remove last element of array
                range.pop();
            } else if (coords > range[1]) {
                bits.push('1');
                // if 1 remove first entry of array
                range.shift();
            }
            // define the new average value and add to the middle of the range array
            let newMidPoint = (range[0] + range[1]) / 2;
            range.splice(1, 0, newMidPoint);
    }
    return bits;
}

//since long = odd bits and lat = even bits, we need to ensure correct length for odd values of totalBitLength
function getBitLengthForLatOrLong(totalLength, range) {
    //if dealing with latitude string
    if (range[0] === -90) {
        return  Math.floor(totalLength / 2);
    //if dealing with longitude string
    } else if (range[0] === -180) {
        return Math.round(totalLength / 2);
    }
}

function mergeArrays(array1, array2) {
    let j = Math.min(array1.length, array2.length);
    let result = [];
    for (let i = 0; i < j; i++) {
        result.push(array1[i], array2[i]);
    }
    //check if the first array is longer and add the last value if so
    if ((array1.length + array2.length)%2 !== 0) {
        result.push(array1[array1.length - 1]);
    }
    return result;
}

function getGeohashString(binaryArray) {
    let bits = [];
    let decimals = [];
    let binaryString = binaryArray.join('');

    //split the string into 5 bit blocks (each block represents a decimal number)
    for (let i = 0; i < binaryString.length; i += 5) {
        let bit = binaryString.substring(i, i+5);
        bits.push(bit)
    };
    
    //convert 5 bit binary number into a base 10 number
    for (let j = 0; j < bits.length; j++) {
        let decimal = parseInt(bits[j], 2)
        decimals.push(decimal);
    }

    let string = convertDecimalToString(decimals);
    return string;
}

function convertDecimalToString(decimalArray) {
    const base32 = '0123456789bcdefghjkmnpqrstuvwxyz';
    let string = '';
    for (var i = 0; i < decimalArray.length; i++) {
        string += base32.charAt(decimalArray[i]);
    }
    return string;
}

export { getStringForGivenLatLong };