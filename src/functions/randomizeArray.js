/**
 * 🔹 Randomizes all items in an array 🔹
 * @param {Array<any>} array The array that should be randomized
 * @returns {Array<any>} Returns the randomized array
 * @throws Throws an error if the parameter is not an array
 * @since 1.8.0
 */
const randomizeArray = array => {
    let randRange = require("./randRange");

    if(isNaN(parseInt(array.length)))
        throw new Error(`Parameter in "jsl.randomizeArray()" needs to be an array that has to contain at one item.`);

    // TODO: remake this
    return array;
}
module.exports = randomizeArray;