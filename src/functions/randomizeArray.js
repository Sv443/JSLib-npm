/**
 * 🔹 Randomizes all items in an array 🔹
 * @param {Array<any>} array 
 * @returns {Array<any>}
 * @throws Throws an error if the parameter is not an array
 * @since 1.8.0
 */
const randomizeArray = array => {
    let randRange = require("./randRange");

    if(isNaN(parseInt(array.length)))
        throw new Error(`Parameter in "jsl.randomizeArray()" needs to be an array that has to contain at one item.`);

    let newArray = [];

    array.forEach(item => {
        let randNumber = randRange(0, --array.length);

        newArray[randNumber] = item;
    });

    return newArray;
}
module.exports = randomizeArray;