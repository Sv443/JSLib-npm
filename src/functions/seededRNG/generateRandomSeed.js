/**
 * 🔹 Creates a random seed 🔹
 * @param {Number} [digitCount=10] How many digits the seed should have - defaults to 10 if left empty
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
        seed = randRange(1, 9).toString() + seed.toString();
    }

    return parseInt(seed);
}
module.exports = generateRandomSeed;
