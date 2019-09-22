/**
 * 🔹 Creates a random seed 🔹
 * @param {Number} digitCount How many digits the seed should have
 * @returns {Number}
 * @since 1.8.0
 */
const generateRandomSeed = (digitCount = 10) => {
    let randRange = require("../randRange");
    let seed = "";

    for(let i = 0; i < digitCount; i++)
        seed += Math.floor(randRange(0, 9)).toString();

    if(seed.startsWith("0"))
    {
        seed = seed.substring(1); // make sure the first item is not 0, so we can parse it as an int without losing the first digit
        seed = (Math.floor(Math.random() * (9 - 1)) + 1).toString() + seed;
    }

    return parseInt(seed);
}
module.exports = generateRandomSeed;