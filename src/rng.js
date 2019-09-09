/**
 * 🔹 Creates a random seed 🔹
 * @param {Number} digitCount How many digits the seed should have
 * @returns {Number}
 * @since 1.8.0
 */
const generateRandomSeed = (digitCount = 10) => {
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

/**
 * @typedef {Object} SeededRandomNumbers
 * @prop {Array<Number>} numbers An array of the random numbers
 * @prop {Number} seed
 * @param {String} joined The random numbers, but as a string
 */

/**
 * 🔹 Generates random numbers based on a seed 🔹
 * @param {Number} count How many random numbers should be generated
 * @param {Number} [seed] The seed to generate numbers from. Leave empty to use a random default seed
 * @returns {SeededRandomNumbers}
 * @since 1.8.0
 */
const generateSeededNumbers = (count, seed) => { // thanks to olsn for this code snippet: http://indiegamr.com/generate-repeatable-random-numbers-in-js/
    let isEmpty = require("./misc").isEmpty;
    let result = [];

    if(isEmpty(seed)) seed = generateRandomSeed();

    if(!validateSeed(seed))
        throw new Error("Error while validating seed in generateSeededNumbers() - Seeds cannot start with 0 and can only contain numerical digits between 0 and 9");

    let initialSeed = seed;

    let seededRandom = (min, max) => {
        max = max || 1;
        min = min || 0;
    
        seed = (seed * 9301 + 49297) % 233280;
        let rnd = seed / 233280;
    
        return Math.floor(min + rnd * (max - min));
    }

    for(let i = 0; i < count; i++)
        result.push(seededRandom(0, 9));

    if(result[0] == 0)
        result[0] = 1; // make sure the first item is not 0, so we can parse it as an int without losing the first digit

    return {
        numbers: result,
        seed: initialSeed,
        joined: result.join("")
    }
}

/**
 * 🔹 Validates a seed 🔹
 * @param {(Number|String)} seed 
 * @returns {Boolean}
 * @since 1.8.0
 */
const validateSeed = (seed) => {
    let isEmpty = require("./misc").isEmpty;
    let digitCount;
    
    if(typeof seed == "string") digitCount = parseInt(seed.length);
    else digitCount = parseInt(seed.toString().length);

    if(isEmpty(seed) || isEmpty(digitCount) || isNaN(parseInt(digitCount)))
        throw new Error(`Invalid argument provided for validateSeed() - make sure it is not empty / null / undefined and is of the correct type.\nExpected: "number/string", got: "${typeof seed}"`);

    seed = seed.toString();

    let regex = new RegExp(`^[0-9]{${digitCount}}`, "gm");

    if(!seed.match(regex) || seed.includes("\n"))
        return false;

    return true;
}

/**
 * 🔹 Highly random RNG with upper and lower boundary 🔹
 * @param {number} min lower boundary of the RNG
 * @param {number} max upper boundary of the RNG
 * @since 1.5.0
 */
const randRange = (min, max) => {
    if(min > max) return "out of range: lower boundary can't be higher than upper boundary";
    max++;
    if(typeof min != "number" || typeof max != "number") return "wrong arguments provided";

    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    
    let r = (d + Math.random() * (max - min)) % (max - min) | 0;
    return r += min;
}

/**
 * 🔹 Creates a UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
 * @param {string} uuid_format the format of the UUID. All x's or y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy"
 * @returns {string} randomized UUID
 * @since 1.5.0
 */
const generateUUID = (uuid_format) => {
    if(isEmpty(uuid_format) || typeof uuid_format != "string") return "wrong attribute type - has to be of type string";

    let d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    return uuid_format.replace(/[xy]/g, function (c) {
        let r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

module.exports = { randRange, generateUUID, seededRNG: { generateSeededNumbers, generateRandomSeed, validateSeed } };