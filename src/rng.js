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
 * @prop {Number} seed The seed that was used to create the random numbers
 * @param {String} stringified The random numbers, but as a string
 * @param {Number} integer The random numbers, but as an integer
 */

/**
 * 🔹 Generates random numbers from the numerical range [0-9] based on a seed 🔹
 * @param {Number} [count=16] How many random numbers should be generated - will default to 16 if left empty
 * @param {Number} [seed] The seed to generate numbers from. Leave empty to use a random default seed. The used seed will be included in the returned object
 * @returns {SeededRandomNumbers} An object containing the seed and the random number in three different formats
 * @since 1.8.0
 */
const generateSeededNumbers = (count = 16, seed) => { // thanks to olsn for this code snippet: http://indiegamr.com/generate-repeatable-random-numbers-in-js/
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
        stringified: result.join(""),
        integer: parseInt(result.join(""))
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
        throw new Error(`Invalid argument provided for validateSeed() - make sure it is not empty / null / undefined and is of the correct type.\nExpected: "number" or "string", got: "${typeof seed}"`);

    seed = seed.toString();

    let regex = new RegExp(`^[0-9]{${digitCount}}`, "gm");

    if(!seed.match(regex) || seed.includes("\n"))
        return false;

    return true;
}

/**
 * 🔹 Highly random number generator with upper and lower boundary.
 * `Highly random` means that contrary to `Math.random()` which uses a seed, this RNG additionally uses a timestamp to calculate the number, making it much more random. 🔹
 * ⚠️ Warning! This RNG is not cryptographically secure, so don't do any password hashing or stuff that needs to be highly secure with this function! ⚠️
 * @param {number} min Lower boundary of the RNG
 * @param {number} max Upper boundary of the RNG
 * @since 1.5.0
 */
const randRange = (min, max) => {
    let {performance} = require("perf_hooks");

    min = parseInt(min);
    max = parseInt(max);

    if(min > max)
        throw new Error(`Invalid parameters provided for "min" and/or "max" in jsl.randRange() - make sure "min" is not bigger than "max"`);
    max++;
    if(typeof min != "number" || typeof max != "number")
        throw new Error(`Wrong parameter provided for "min" and/or "max" in jsl.randRange() - (expected: "Number" and "Number", got: "${typeof min}" and "${typeof max}")`);

    let d = new Date().getTime();
    if (typeof performance !== "undefined" && typeof performance.now === "function")
        d += performance.now();
    
    let r = (d + Math.random() * (max - min)) % (max - min) | 0;
    return r += min;
}

/**
 * 🔹 Creates a hexadecimal [0-9,A-F] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
 * @param {String} uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
 * @param {Boolean} [upperCase] Set to true to have all letters in upper case, false for lower case
 * @returns {String}
 * @since 1.5.0
 * @version 1.8.0 Renamed the function and moved it
 */
const hexadecimal = (uuidFormat, upperCase = false) => {
    let isEmpty = require("./misc").isEmpty;
    let replaceAt = require("./misc").replaceAt;
    let randRange = require("./misc").randRange;

    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = "0123456789ABCDEF";
    possible = possible.split("");
    
    if(isEmpty(uuidFormat) || typeof uuidFormat != "string")
        throw new Error(`Wrong parameter provided for "uuidFormat" in jsl.generateUUID.decimal() - (expected: "String", got: "${typeof uuidFormat}")`);

    let regex = /[xy]/gm;
    let match;
    let matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, idx, possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");
    if(upperCase) return result;
    else return result.toLowerCase();
}

/**
 * 🔹 Creates a decimal [0-9] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
 * @param {String} uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
 * @returns {String}
 * @since 1.8.0
 */
const decimal = (uuidFormat) => {
    let isEmpty = require("./misc").isEmpty;
    let replaceAt = require("./misc").replaceAt;
    let randRange = require("./misc").randRange;

    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = "0123456789";
    possible = possible.split("");
    
    if(isEmpty(uuidFormat) || typeof uuidFormat != "string")
        throw new Error(`Wrong parameter provided for "uuidFormat" in jsl.generateUUID.decimal() - (expected: "String", got: "${typeof uuidFormat}")`);

    let regex = /[xy]/gm;
    let match;
    let matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, idx, possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");
    return result;
}

/**
 * 🔹 Creates an alphanumerical [0-9,A-Z] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
 * @param {String} uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
 * @param {Boolean} [upperCase] Set to true to have all letters in upper case, false for lower case
 * @returns {String}
 * @since 1.8.0
 */
const alphanumerical = (uuidFormat, upperCase) => {
    let isEmpty = require("./misc").isEmpty;
    let replaceAt = require("./misc").replaceAt;
    let randRange = require("./misc").randRange;

    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    possible = possible.split("");
    
    if(isEmpty(uuidFormat) || typeof uuidFormat != "string")
        throw new Error(`Wrong parameter provided for "uuidFormat" in jsl.generateUUID.alphanumerical() - (expected: "String", got: "${typeof uuidFormat}")`);

    let regex = /[xy]/gm;
    let match;
    let matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, parseInt(idx), possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");
    if(upperCase) return result;
    else return result.toLowerCase();
}

/**
 * 🔹 Creates a binary [0-1] UUID with a given format. This uses a RNG that is even more random than the standard Math.random() 🔹
 * @param {String} uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
 * @returns {String}
 * @since 1.8.0
 */
const binary = (uuidFormat) => {
    let isEmpty = require("./misc").isEmpty;
    let replaceAt = require("./misc").replaceAt;
    let randRange = require("./misc").randRange;

    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = "01";
    possible = possible.split("");
    
    if(isEmpty(uuidFormat) || typeof uuidFormat != "string")
        throw new Error(`Wrong parameter provided for "uuidFormat" in jsl.generateUUID.binary() - (expected: "String", got: "${typeof uuidFormat}")`);

    let regex = /[xy]/gm;
    let match;
    let matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, idx, possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");
    return result;
}

/**
 * 🔹 Creates a custom UUID with a given format from a list of characters specified by the possibleValues parameter. This uses a RNG that is even more random than the standard Math.random() 🔹
 * @param {String} uuidFormat The format of the UUID. All x's and y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy" - if you want an x or y to not be replaced, prefix it with this character: ^
 * @param {String} possibleValues A string containing all characters that should be injected into the final UUID - (delimited by nothing) - Example: "ABCDEF01234$%&#"
 * @returns {String}
 * @since 1.8.0
 */
const custom = (uuidFormat, possibleValues) => {
    let isEmpty = require("./misc").isEmpty;
    let replaceAt = require("./misc").replaceAt;
    let randRange = require("./misc").randRange;

    uuidFormat = uuidFormat.replace(/\^x/gm, "ꮦ");
    uuidFormat = uuidFormat.replace(/\^y/gm, "ꮧ");

    let possible = possibleValues.toString();
    possible = possible.split("");
    
    if(isEmpty(uuidFormat) || typeof uuidFormat != "string")
        throw new Error(`Wrong parameter provided for "uuidFormat" in jsl.generateUUID.decimal() - (expected: "String", got: "${typeof uuidFormat}")`);

    let regex = /[xy]/gm;
    let match;
    let matches = [];

    while((match = regex.exec(uuidFormat)) != null)
        matches.push(match.index)

    let result = uuidFormat;
    matches.forEach(idx => result = replaceAt(result, idx, possible[randRange(0, possible.length - 1)]));

    result = result.replace(/[\uABA6]/gmu, "x");
    result = result.replace(/[\uABA7]/gmu, "y");
    return result;
}

module.exports = {
    randRange,
    generateUUID: {
        hexadecimal,
        decimal,
        alphanumerical,
        binary,
        custom
    },
    seededRNG: {
        generateSeededNumbers,
        generateRandomSeed,
        validateSeed
    }
};