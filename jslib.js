// JSLib v1.5.0-npm by Sv443 - licensed under the MIT license

const fs = require("fs");

/**
 * Info about JSLib
 * @param {Object} jsli
 * @param {string} jsli.version the current version
 * @param {string} jsli.name name of JSLib
 * @param {string} jsli.desc short description
 * @param {string} jsli.authors authors of JSLib
 * @param {string} jsli.license license of JSLib
 */
const jsli = {
    version: "1.5.0",
    name: "JSLib",
    desc: "JavaScript simplified",
    authors: "Sv443",
    license: "MIT"
};
module.exports.info = jsli;

try {
    var settings = {};
    settings = JSON.parse(fs.readFileSync("./settings.json"));
    module.exports.settings = settings;
} catch(err) {}

/**
 * Returns all available functions of JSLib
 * @returns {Object} all functions and objects
 * @since 1.5.0
 */
module.exports.help = () => {
    console.log(module.exports);
}

/**
 * Returns true, if the input is undefined, null, an empty string or an empty array. Otherwise returns false.
 * @param {*} input Variable that should be checked
 * @returns {boolean} true or false
 * @since 1.4.0
 */
function isEmpty(input) {
	if(input === undefined || input === null || input == "" || input == []) return true;
	else return false;
} module.exports.isEmpty = isEmpty;

/**
 * Checks if and how many values of the array are empty (undefined, null, "" or [])
 * @param {array} array Array that should be checked
 * @returns {(boolean|number)} boolean if all or none are empty and number if only some are empty
 * @since 1.5.0
 */
module.exports.isArrayEmpty = array => {
    if(isEmpty(array) || typeof array != "object") return "argument has to be of type array";
    let emptyness = 0;
    for(let i = 0; i < array.length; i++) {
        if(isEmpty(array[i])) emptyness++;
    }
    if(emptyness == array.length) return true;
    else if(emptyness == 0) return false;
    else return emptyness;
}
 
/**
 * Sends a red console message and optionally exits the process with an optional status code.
 * @param {string} cause The cause of the error
 * @param {boolean} [shutdown=false] if the process should be exited or not
 * @param {number} [status=0] with which status code the process should be exited
 * @param {string} [log_file_path] if the error message should automatically be logged to the file with the specified path. undefined or null to disable.
 * @since 1.5.0
 */
module.exports.error = (cause, log_file_path, shutdown, status) => {
    if(isEmpty(cause) || typeof cause != "string"){console.log("cause can't be empty ");return;}

    if(!isEmpty(log_file_path) && typeof log_file_path == "string") logger(log_file_path, cause, {timestamp:true,append_bottom:true});
    console.log("\x1b[31m\x1b[1mThe following error occured:\n" + cause + "\x1b[0m\n");
    if(shutdown == true && !isEmpty(status)) process.exit(status);
    else if(shutdown == true && isEmpty(status)) process.exit();
}

/**
 * Logs a string to a specified log file
 * @param {string} path Relative path to the log file
 * @param {string} content Content that should be written to the log file
 * @param {Object} [options] Additional options
 * @param {boolean} [options.append_bottom=true] true to append content to the bottom of a file, false to just override the file's contents
 * @param {boolean} [options.timestamp=false] true to add a timestamp to the logged content
 * @since 1.5.0
 */
function logger(path, content, options) {
    if(isEmpty(path) || isEmpty(content) || typeof path != "string" || typeof content != "string"){console.log("path and/or content are empty or of the wrong type");return;}

    let timestamp = new Date();

    if(options.timestamp) content = "[" + timestamp + "]  " + content;

    if(!options.append_bottom) fs.writeFileSync(path, content);
    else fs.appendFileSync(path, content + "\n");
} module.exports.logger = logger;

/**
 * Creates a UUID with a given format. This uses a RNG that is even more random than the standard Math.random()
 * @param {string} uuid_format the format of the UUID. All x's or y's will be affected by the RNG. Example: "xxxx-yyyy-xxxx-yyyy"
 * @returns {string} randomized UUID
 * @since 1.5.0
 */
module.exports.generateUUID = (uuid_format) => {
    if(isEmpty(uuid_format) || typeof uuid_format != "string") return "wrong attribute type - has to be of type string";

    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    return uuid_format.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

/**
 * Tests an array and returns true if all values are equal.
 * @param {array} array
 * @returns {boolean} true if all values are equal, false if not
 * @since 1.5.0
 */
module.exports.allEqual = (array) => {
    if(isEmpty(array) || typeof array != "object") return "wrong attribute type - has to be of type array";
    return array.every(v => v === array[0]);
}

/**
 * Executes a function before the script gets shut down (on SIGINT, SIGTERM or SIGKILL)
 * @param {function} funct this function gets executed on script shutdown
 * @since 1.5.0
 */
module.exports.softShutdown = funct => {
    process.on("SIGINT", ()=>{funct();process.exit();});
    process.on("SIGTERM", ()=>{funct();process.exit();});
    process.on("SIGKILL", ()=>{funct();process.exit();});
}

/**
 * Prevents the script from shutting down with default commands (CTRL + C). It has to either be killed with the task manager or internally, through the script
 * @since 1.5.0
 */
module.exports.noShutdown = () => {
    process.on("SIGINT", ()=>{});
    process.on("SIGTERM", ()=>{});
    process.on("SIGKILL", ()=>{});
}

/**
 * Highly random RNG with upper and lower boundary
 * @param {number} min lower boundary of the RNG
 * @param {number} max upper boundary of the RNG
 */
module.exports.randRange = (min, max) => {
    if(min > max) return "out of range: lower boundary can't be less than upper boundary";
    if(typeof min != "number" || typeof max != "number") return "wrong arguments provided";

    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    var r = (d + Math.random() * (max - min)) % (max - min) | 0;
    return r += min;
}