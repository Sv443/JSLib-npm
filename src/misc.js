var noShutdown = false;

let net = require("./net");
module.exports.ping = net.ping;
module.exports.downloadFile = net.downloadFile;


let rng = require("./rng");
module.exports.randRange = rng.randRange;
module.exports.generateUUID = rng.generateUUID;

module.exports.seededRNG = {
    generateSeededNumbers: rng.seededRNG.generateSeededNumbers,
    generateRandomSeed: rng.seededRNG.generateRandomSeed,
    validateSeed: rng.seededRNG.validateSeed
}

module.exports.MenuPrompt = require("./classes/MenuPrompt").MenuPrompt;
module.exports.ProgressBar = require("./classes/ProgressBar").ProgressBar;

let files = require("./files");
let logger = files.logger;
module.exports.logger = logger;
module.exports.readdirRecursive = files.readdirRecursive;
module.exports.readdirRecursiveSync = files.readdirRecursiveSync;




/**
 * 🔹 Info about JSLib 🔹
 * @param {Object} jsli
 * @param {string} jsli.version The current version
 * @param {string} jsli.name The name of JSLib
 * @param {string} jsli.desc A short description
 * @param {string} jsli.authors The author(s) of JSLib
 * @param {string} jsli.license The license of JSLib
 * @since 1.5.0
 */
const jsli = {
    version: "1.8.0",
    name: "JSLib",
    desc: "A general-purpose, lightweight and dependency-free JavaScript library that makes coding a bit faster by providing many easy to use functions",
    authors: ["Sv443 <sven.fehler@web.de> (https://sv443.net/)"],
    license: "MIT"
};
module.exports.info = jsli;

/**
 * 🔹 Returns all available functions of JSLib 🔹
 * @returns {Object} all functions and objects
 * @since 1.5.0
 */
module.exports.help = () => {
    console.log(module.exports);
}

/**
 * 🔹 Returns the current version of JSLib 🔹
 * @returns {String} version
 * @since 1.5.0
 */
module.exports.version = () => {
    return jsli.version;
}

/**
 * 🔹 Returns true, if the input is undefined, null, an empty string, an empty array or an object with length = 0.
 * Otherwise returns false. The number 0 and NaN will return false though, so check them independently if needed! 🔹
 * @param {*} input Variable that should be checked - this can be of any type but the basic types will work best
 * @returns {Boolean} true or false
 * @since 1.4.0
 * @version 1.6.5 lowercase alias jsl.isempty was removed
 * @version 1.8.0 Added check for objects with length = 0
 */
const isEmpty = input => (input === undefined || input === null || input === "" || (typeof input == "object" && input.length > 0)) ? true : false;
module.exports.isEmpty = isEmpty;

/**
 * 🔹 Checks how many values of the array are empty (does the same check as `jsl.isEmpty()`, but on each array item) 🔹
 * @param {Array} array Array that should be checked
 * @returns {(Boolean|Number)} true if all are empty, false if none are empty and number if only some are empty
 * @throws Throws an error if the parameter isn't an array
 * @since 1.5.0
 * @version 1.8.0 Throwing error now instead of returning string
 */
module.exports.isArrayEmpty = array => {
    if(isEmpty(array) || typeof array != "object")
        throw new Error(`Wrong arguments provided for jsl.isArrayEmpty() - (expected: \"Object/Array\", got: \"${typeof array}\")`);

    let emptiness = 0;
    array.forEach(item => {
        if(isEmpty(item))
            emptiness++;
    });

    if(emptiness == array.length)
        return true;
    else if(emptiness == 0)
        return false;
    else return emptiness;
}

/**
 * 🔹 Sends a red console message and optionally exits the process with an optional status code. 🔹
 * @param {String} cause The cause of the error
 * @param {Boolean} [shutdown=false] if the process should be exited or not
 * @param {Number} [status=0] with which status code the process should be exited
 * @param {String} [log_file_path] if the error message should automatically be logged to the file with the specified path. undefined or null to disable.
 * @throws Throws an error if the "cause" parameter isn't a string
 * @since 1.5.0
 * @version 1.8.0 Throwing error now instead of logging to console and returning undefined
 */
module.exports.error = (cause, log_file_path, shutdown, status) => {
    if(isEmpty(cause) || typeof cause != "string")
        throw new Error(`Wrong arguments provided in "cause" for jsl.error() - (expected: \"String\", got: \"${typeof cause}\")`);

    if(!isEmpty(log_file_path) && typeof log_file_path == "string")
        logger(log_file_path, cause, {timestamp:true,append_bottom:true});
    console.log("\x1b[31m\x1b[1mThe following error occured:\n" + cause + "\x1b[0m\n");
    if(shutdown == true && !isEmpty(status)) process.exit(status);
    else if(shutdown == true && isEmpty(status)) process.exit();
}

/**
 * 🔹 Tests an array and returns true if all values are equal. 🔹
 * @param {Array} array
 * @returns {Boolean} true if all values are equal, false if not
 * @throws Throws an error if the parameter is not an array
 * @since 1.5.0
 * @version 1.8.0 Throwing error now instead of returning string
 */
module.exports.allEqual = array => {
    if(isEmpty(array) || typeof array != "object") 
        throw new Error(`Wrong arguments provided for jsl.allEqual() - (expected: \"Object/Array\", got: \"${typeof array}\")`);

    return array.every(v => v === array[0]);
}

/**
 * 🔹 Executes a function before the script gets shut down (on SIGINT, SIGTERM or SIGKILL) 🔹
 * @param {function} funct this function gets executed on script shutdown
 * @since 1.5.0
 */
module.exports.softShutdown = funct => {
    process.on("SIGINT", ()=>{if(!noShutdown){funct();process.exit();}});
    process.on("SIGTERM", ()=>{if(!noShutdown){funct();process.exit();}});
    process.on("SIGKILL", ()=>{if(!noShutdown){funct();process.exit();}});
}

/**
 * 🔹 Prevents the script from shutting down with default commands (CTRL + C).
 * It has to either be killed with the task manager or internally, through the script (using `process.exit()`) 🔹
 * @since 1.5.0
 */
module.exports.noShutdown = () => {
    noShutdown = true;
    process.on("SIGINT", ()=>{});
    process.on("SIGTERM", ()=>{});
    process.on("SIGKILL", ()=>{});
}

/**
 * 🔹 Removes the script shut down prevention that was previously enabled with noShutdown() 🔹
 * (Sorry for the name, I saw an opportunity and I took it, don't judge me)
 * @since 1.6.0
 */
module.exports.yesShutdown = () => {
    noShutdown = false;
    process.on("SIGINT", ()=>{process.exit();});
    process.on("SIGTERM", ()=>{process.exit();});
    process.on("SIGKILL", ()=>{process.exit();});
}

/**
 * 🔹 Adds color(s) to the input text and sends that colored text to the console 🔹
 * @param {String} text the text that should be colored and sent as a console message
 * @param {String} colors space separated list of color(s). (Available colors are: "rst/reset, bright, dim, underscore/ul/underline, blink, reverse, hidden, fgblack, fgred, fggreen, fgyellow, fgblue, fgmagenta, fgcyan, fgwhite, bgblack, bgred, bggreen, bgyellow, bgblue, bgmagenta, bgcyan, bgwhite")
 * @returns executes console.log() function
 * @since 1.6.0
 * @deprecated This function will soon be deprecated. Please use the object `jsl.col` instead - This function will soon redirect to that object too and then get completely deprecated in a later version
 */
module.exports.consoleColor = (text, colors) => {
    let cnbr = [];
    if(colors.includes("rst") || colors.includes("reset")) cnbr.push(0);
    if(colors.includes("bright")) cnbr.push(1);
    if(colors.includes("dim")) cnbr.push(2);
    if(colors.includes("underscore") || colors.includes("ul") || colors.includes("underline")) cnbr.push(4);
    if(colors.includes("blink")) cnbr.push(5);
    if(colors.includes("reverse")) cnbr.push(7);
    if(colors.includes("hidden")) cnbr.push(8);

    if(colors.includes("fgblack")) cnbr.push(30);
    if(colors.includes("fgred")) cnbr.push(31);
    if(colors.includes("fggreen")) cnbr.push(32);
    if(colors.includes("fgyellow")) cnbr.push(33);
    if(colors.includes("fgblue")) cnbr.push(34);
    if(colors.includes("fgmagenta")) cnbr.push(35);
    if(colors.includes("fgcyan")) cnbr.push(36);
    if(colors.includes("fgwhite")) cnbr.push(37);

    if(colors.includes("bgblack")) cnbr.push(40);
    if(colors.includes("bgred")) cnbr.push(41);
    if(colors.includes("bggreen")) cnbr.push(42);
    if(colors.includes("bgyellow")) cnbr.push(43);
    if(colors.includes("bgblue")) cnbr.push(44);
    if(colors.includes("bgmagenta")) cnbr.push(45);
    if(colors.includes("bgcyan")) cnbr.push(46);
    if(colors.includes("bgwhite")) cnbr.push(47);

    for(let i = 0; i < cnbr.length; i++) cnbr[i] = "\x1b[" + cnbr[i] + "m";
    return console.log(cnbr.join("") + text + "\x1b[0m");
}

/**
 * 🔹 Converts an array to a better readable one 🔹
 * @param {Array} array The array you want to make readable
 * @param {String} [separators=", "] The default separator for all values except the last one. Defaults to ", " if left empty. Add whitespaces if needed!
 * @param {String} [lastSeparator=" and "] The last separator. Defaults to " and " if empty. Add whitespaces if needed!
 * @returns {String} Better readable array as string
 * @since 1.7.0
 */
module.exports.readableArray = (array, separators, lastSeparator) => {
    if(isEmpty(array) || typeof array != "object" || (!isEmpty(separators) && typeof separators != "string" && typeof separators != "boolean") || (!isEmpty(lastSeparator) && typeof lastSeparator != "string" && typeof lastSeparator != "boolean"))
        throw new Error(`Wrong or missing parameters in "jsl.readableArray()"`);
    if(isEmptyWithoutString(lastSeparator) || lastSeparator === false) lastSeparator = " and ";
    if(isEmptyWithoutString(separators) || separators === false) separators = ", ";

    if(array.length <= 1) return array.toString();
    else if(array.length == 2) return array.join(separators);
    else {
        let ae = lastSeparator + array[array.length - 1];
        array.pop();
        return array.join(separators) + ae;
    }
}

function isEmptyWithoutString(variable) {
    if((variable == null || variable == undefined || variable == [] || isNaN(variable)) && variable != "") return true;
    else return false;
}

/**
 * 🔹 Transforms the `value` parameter from the numerical range [`range_1_min`-`range_1_max`] to the numerical range [`range_2_min`-`range_2_max`] 🔹
 * @param {Number} value The value from the first numerical range, that you want to transform to a value inside the second numerical range
 * @param {Number} range_1_min The minimum possible value of the first numerical range
 * @param {Number} range_1_max The maximum possible value of the first numerical range
 * @param {Number} range_2_min The minimum possible value of the second numerical range
 * @param {Number} range_2_max The maximum possible value of the second numerical range
 * @returns {Number} Floating point number of `value` inside the second numerical range
 * @throws Throws an error if the arguments are not of type `Number` or the `*_max` argument(s) is/are equal to 0
 * @since 1.8.0
 */
const mapRange = (value, range_1_min, range_1_max, range_2_min, range_2_max) => {
    [value, range_1_min, range_1_max, range_2_min, range_2_max].forEach(arg => {
        if(isEmpty(arg) || isNaN(parseInt(arg)) || typeof arg != "number")
            throw new Error("Wrong argument(s) provided for mapRange() - (expected: \"Number\", got: \"" + typeof arg + "\")");
    });

    if(range_1_max === 0 || range_2_max === 0)
        throw new Error("Division by zero error in mapRange() - make sure the \"*_max\" arguments are not 0");

    if(range_1_min === 0 && range_2_min === 0)
        return value * (range_2_max / range_1_max);

    return ((value - range_1_min) * ((range_2_max - range_2_min) / (range_1_max - range_1_min)) + range_2_min);
}
module.exports.mapRange = mapRange;



/**
 * 🔹 Use this to add color to your console output 🔹
 * ⚠️ "jsl.consoleColor()" will soon be deprecated - use this instead!
 * @prop {String} rst
 * @prop {String} reset
 * @prop {String} fat
 * @prop {Object} fg Foreground / font color
 * @prop {String} fg.red
 * @prop {String} fg.green
 * @prop {String} fg.yellow
 * @prop {String} fg.blue
 * @prop {String} fg.pink
 * @prop {String} fg.cyan
 * @prop {Object} bg Background color
 * @prop {String} bg.red
 * @prop {String} bg.green
 * @prop {String} bg.yellow
 * @prop {String} bg.blue
 * @prop {String} bg.pink
 * @prop {String} bg.cyan
 * @since 1.8.0
 */
const colors = {
    rst:   "\x1b[0m",
    reset: "\x1b[0m",
    fat:   "\x1b[37m",
    fg: {
        rst:    "\x1b[0m",
        reset:  "\x1b[0m",
        fat:    "\x1b[37m",
        red:    "\x1b[31m\x1b[1m",
        green:  "\x1b[32m\x1b[1m",
        yellow: "\x1b[33m\x1b[1m",
        blue:   "\x1b[34m\x1b[1m",
        pink:   "\x1b[35m\x1b[1m",
        cyan:   "\x1b[36m\x1b[1m"
    },
    bg: {
        rst:    "\x1b[0m",
        reset:  "\x1b[0m",
        fat:    "\x1b[37m",
        red:    "\x1b[41m\x1b[1m",
        green:  "\x1b[42m\x1b[1m",
        yellow: "\x1b[43m\x1b[1m",
        blue:   "\x1b[44m\x1b[1m",
        pink:   "\x1b[45m\x1b[1m",
        cyan:   "\x1b[46m\x1b[1m"
    }
}
module.exports.colors = colors;