// JSLib v1.6.6-npm by Sv443 - licensed under the MIT license

const fs = require("fs");
const http = require("http");
const https = require("https");
const perf = require('execution-time')();

var noShutdown = false;


/**
 * Info about JSLib
 * @param {Object} jsli
 * @param {string} jsli.version the current version
 * @param {string} jsli.name name of JSLib
 * @param {string} jsli.desc short description
 * @param {string} jsli.authors authors of JSLib
 * @param {string} jsli.license license of JSLib
 * @since 1.5.0
 */
const jsli = {
    version: "1.6.6",
    name: "JSLib",
    desc: "A fairly lightweight JavaScript library that makes coding a bit faster by taking away some of the complicated / complex functions",
    authors: "Sv443",
    license: "MIT"
};
module.exports.info = jsli;

/**
 * Returns all available functions of JSLib
 * @returns {Object} all functions and objects
 * @since 1.5.0
 */
module.exports.help = () => {
    console.log(module.exports);
}

/**
 * Returns the current version of JSLib
 * @returns {String} version
 * @since 1.5.0
 */
module.exports.version = () => {
    return jsli.version;
}

/**
 * Returns true, if the input is undefined, null, an empty string or an empty array. Otherwise returns false. 0 will return true and NaN will return false though!
 * @param {*} input Variable that should be checked, can be anything except JSON, stringify it first
 * @returns {boolean} true or false
 * @since 1.4.0
 * @version 1.6.5 lowercase alias jsl.isempty was removed
 */
const isEmpty = input => (input === undefined || input === null || input == "" || input == [] || input == "{}" || input == "{[]}") ? true : false;

module.exports.isEmpty = isEmpty;

/**
 * Checks if and how many values of the array are empty (undefined, null, "" or [])
 * @param {array} array Array that should be checked
 * @returns {(boolean|number)} boolean if all or none are empty and number if only some are empty
 * @since 1.5.0
 */
module.exports.isArrayEmpty = array => {
    if(isEmpty(array) || typeof array != "object") return "argument has to be of type array";
    let emptiness = 0;
    for(let i = 0; i < array.length; i++) {
        if(isEmpty(array[i])) emptiness++;
    }
    if(emptiness == array.length) return true;
    else if(emptiness == 0) return false;
    else return emptiness;
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
    process.on("SIGINT", ()=>{if(!noShutdown){funct();process.exit();}});
    process.on("SIGTERM", ()=>{if(!noShutdown){funct();process.exit();}});
    process.on("SIGKILL", ()=>{if(!noShutdown){funct();process.exit();}});
}

/**
 * Prevents the script from shutting down with default commands (CTRL + C). It has to either be killed with the task manager or internally, through the script
 * @since 1.5.0
 */
module.exports.noShutdown = () => {
    noShutdown = true;
    process.on("SIGINT", ()=>{});
    process.on("SIGTERM", ()=>{});
    process.on("SIGKILL", ()=>{});
}

/**
 * Removes the script shut down prevention that was previously enabled with noShutdown()
 * @since 1.6.0
 */
module.exports.yesShutdown = () => {
    noShutdown = false;
    process.on("SIGINT", ()=>{process.exit();});
    process.on("SIGTERM", ()=>{process.exit();});
    process.on("SIGKILL", ()=>{process.exit();});
}

/**
 * Highly random RNG with upper and lower boundary
 * @param {number} min lower boundary of the RNG
 * @param {number} max upper boundary of the RNG
 * @since 1.5.0
 */
module.exports.randRange = (min, max) => {
    if(min > max) return "out of range: lower boundary can't be higher than upper boundary";
    max++;
    if(typeof min != "number" || typeof max != "number") return "wrong arguments provided";

    var d = new Date().getTime();
    if (typeof performance !== 'undefined' && typeof performance.now === 'function'){
        d += performance.now();
    }
    var r = (d + Math.random() * (max - min)) % (max - min) | 0;
    return r += min;
}

// type and properties definition for the returned object of the ping function
/**
 * @typedef {Object} pingReturnValues An object containing the ping's results
 * @property {Number} statusCode The ping's returned status code (eg. 200 or 404)
 * @property {String} statusMessage The status message of the ping
 * @property {Number} responseTime The response time in milliseconds
 */
let returnval={"statusCode":0,"statusMessage":0,"responseTime":0};

/**
 * Pings the specified URL and returns the status code
 * @param {String} URL the URL that should be pinged
 * @param {*} [timeout=5000] time in milliseconds after which the ping will time out and return a 404 error
 * @returns {Promise<pingReturnValues>} promise object gets passed the HTTP status code (for example 200 or 404), the status message and the response duration in ms; if errored returns a string with the error message
 * @since 1.6.0
 * @version 1.6.1 changed attributes
 * @version 1.6.5 changed time measurement dependency due to deprecation
 * @version 1.6.6 updated documentation for the resulting object
 */
module.exports.ping = (URL, timeout) => {
    if(typeof URL != "string") return "wrong arguments provided";
    if(isEmpty(timeout) || typeof timeout != "number") timeout = 5000;

    let http_version = (URL.match(/(http:\/\/)/gm) || URL.match(/(https:\/\/)/gm))[0].replace("://", "");

    let host = URL.split("://")[1].split("/")[0];
    let path = URL.split("://")[1].split("/");
    if(isEmpty(path[1])) path = "/";
    else {
        path.shift();
        path = path.join("/");
    }

    if(http_version == "https") {
        try {
            return new Promise((resolve, reject) => {
                if(isEmpty(host)) return reject("URL is formatted incorrectly");
                try {
                    perf.start("ping");
                    https.get({
                        host: host,
                        path: path,
                        timeout: timeout
                    }, res => {
                        res.on('data', d => {});
                        res.on('end', () => {
                            var tResults = perf.stop("ping");
                            var measure = Math.round(tResults.time);
                            let returnval = {
                                "statusCode": parseInt(res.statusCode),
                                "statusMessage": res.statusMessage,
                                "responseTime": parseInt(measure)
                            }
                            return resolve(returnval);
                        });
                    });
                }
                catch(err) {
                    return reject(err);
                }
            });
        }
        catch(err) {
            return reject(err);
        }
    }
    else {
        try {
            return new Promise((resolve, reject) => {
                if(isEmpty(host)) return reject("URL is formatted incorrectly");
                try {
                    perf.start("ping");
                    http.get({
                        host: host,
                        path: path,
                        timeout: timeout
                    }, res => {
                        res.on('data', d => {});
                        res.on('end', () => {
                            var tResults = perf.stop("ping");
                            var measure = Math.round(tResults.time);
                            let returnval = {
                                "statusCode": parseInt(res.statusCode),
                                "statusMessage": res.statusMessage,
                                "responseTime": parseInt(measure)
                            }
                            return resolve(returnval);
                        });
                    });
                }
                catch(err) {
                    return reject(err);
                }
            });
        }
        catch(err) {
            return reject(err);
        }
    }
}

/**
 * Adds color(s) to the input text and sends that colored text to the console
 * @param {String} text the text that should be colored and sent as a console message
 * @param {String} colors space separated list of color(s). (Available colors are: "rst/reset, bright, dim, underscore/ul/underline, blink, reverse, hidden, fgblack, fgred, fggreen, fgyellow, fgblue, fgmagenta, fgcyan, fgwhite, bgblack, bgred, bggreen, bgyellow, bgblue, bgmagenta, bgcyan, bgwhite")
 * @returns executes console.log() function
 * @since 1.6.0
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
 * Converts an array to a better readable one
 * @param {Array} array The array you want to make readable
 * @param {String} [separators=", "] The default separator for all values except the last one. Defaults to ", " if left empty. Add whitespaces if needed!
 * @param {String} [lastSeparator=" and "] The last separator. Defaults to " and " if empty. Add whitespaces if needed!
 * @returns {String} Better readable array as string
 * @since 1.7.0
 */
module.exports.readableArray = (array, separators, lastSeparator) => {
    if(isEmpty(array) || typeof array != "object" || (!isEmpty(separators) && typeof separators != "string" && typeof separators != "boolean") || (!isEmpty(lastSeparator) && typeof lastSeparator != "string" && typeof lastSeparator != "boolean")) return "wrong or missing arguments";
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