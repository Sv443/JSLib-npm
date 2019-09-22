/**
 * 🔹 Converts an array to a better readable one 🔹
 * @param {Array} array The array you want to make readable
 * @param {String} [separators=", "] The default separator for all values except the last one. Defaults to ", " if left empty. Add whitespaces if needed!
 * @param {String} [lastSeparator=" and "] The last separator. Defaults to " and " if empty. Add whitespaces if needed!
 * @returns {String} Better readable array as string
 * @since 1.7.0
 */
const readableArray = (array, separators, lastSeparator) => {
    let isEmpty = require("./isEmpty");

    if(isEmpty(array) || typeof array != "object" || (!isEmpty(separators) && typeof separators != "string" && typeof separators != "boolean") || (!isEmpty(lastSeparator) && typeof lastSeparator != "string" && typeof lastSeparator != "boolean"))
        throw new Error(`Wrong or missing parameters in "jsl.readableArray()"`);
    if(isEmptyWithoutString(lastSeparator) || lastSeparator === false)
        lastSeparator = " and ";
    if(isEmptyWithoutString(separators) || separators === false)
        separators = ", ";

    if(array.length <= 1)
        return array.toString();
    else if(array.length == 2)
        return array.join(separators);
    else {
        let ae = lastSeparator + array[array.length - 1];
        array.pop();
        return array.join(separators) + ae;
    }
}

function isEmptyWithoutString(variable) {
    if((variable == null || variable == undefined || variable == [] || isNaN(variable)) && variable != "")
        return true;
    else return false;
}

module.exports = readableArray;