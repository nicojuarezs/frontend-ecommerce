export function removeDecimals(value) {
    if(isNaN(value)) {
        return;
    }
    return Math.round( value * 100 ) / 100;
    // return +value.toFixed(2)
}