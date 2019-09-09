const readLine = require("readline");

var noShutdown = false;

let logger = require("./files").logger;
module.exports.ping = require("./net").ping;
module.exports.downloadFile = require("./net").downloadFile;


let rng = require("./rng");
module.exports.randRange = rng.randRange;
module.exports.generateUUID = rng.generateUUID;

module.exports.seededRNG = {
    generateSeededNumbers: rng.seededRNG.generateSeededNumbers,
    generateRandomSeed: rng.seededRNG.generateRandomSeed,
    validateSeed: rng.seededRNG.validateSeed
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
module.exports.logger = logger;

/**
 * Reads a folder asynchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback - Warning! Large amounts of files (like letting it run on "C:/") can freeze the process completely or exceed the maximum possible index of a JS array
 * @param {String} folder The folder that should be recursively read
 * @param {Function} callback The function that gets called after the folder has been read - has two arguments: error and result
 * @async
 * @since 1.7.0
 */
module.exports.readdirRecursive = require("./files").readdirRecursive;

/**
 * Reads a folder synchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback - Warning! Large amounts of files (like letting it run on "C:/") can freeze the process completely or exceed the maximum possible index of a JS array
 * @param {String} folder The folder that should be recursively read
 * @since 1.7.0
 */
module.exports.readdirRecursiveSync = require("./files").readdirRecursiveSync;




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
    version: "1.8.0",
    name: "JSLib",
    desc: "A general-purpose, lightweight and dependency-free JavaScript library that makes coding a bit faster by providing many easy to use functions",
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
 * Returns true, if the input is undefined, null, an empty string, an empty array or an object with length = 0.
 * Otherwise returns false. The number 0 and NaN will return false though, so check them independently if needed!
 * @param {*} input Variable that should be checked, can be anything except JSON, stringify it first
 * @returns {Boolean} true or false
 * @since 1.4.0
 * @version 1.6.5 lowercase alias jsl.isempty was removed
 * @version 1.8.0 Added check for objects with length = 0
 */
const isEmpty = input => (input === undefined || input === null || input === "" || input === [] || input === "{}" || (typeof input == "object" && input.length > 0)) ? true : false;

module.exports.isEmpty = isEmpty;

/**
 * Checks how many values of the array are empty (does the same check as `jsl.isEmpty()`, but on each array item)
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
        if(isEmpty(item)) emptiness++;
    });
    if(emptiness == array.length) return true;
    else if(emptiness == 0) return false;
    else return emptiness;
}

/**
 * Sends a red console message and optionally exits the process with an optional status code.
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

    if(!isEmpty(log_file_path) && typeof log_file_path == "string") logger(log_file_path, cause, {timestamp:true,append_bottom:true});
    console.log("\x1b[31m\x1b[1mThe following error occured:\n" + cause + "\x1b[0m\n");
    if(shutdown == true && !isEmpty(status)) process.exit(status);
    else if(shutdown == true && isEmpty(status)) process.exit();
}

/**
 * Tests an array and returns true if all values are equal.
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
 * Prevents the script from shutting down with default commands (CTRL + C).
 * It has to either be killed with the task manager or internally, through the script (using `process.exit()`)
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
 * Sorry for the name, I saw an opportunity and I took it, don't judge me
 * @since 1.6.0
 */
module.exports.yesShutdown = () => {
    noShutdown = false;
    process.on("SIGINT", ()=>{process.exit();});
    process.on("SIGTERM", ()=>{process.exit();});
    process.on("SIGKILL", ()=>{process.exit();});
}

/**
 * Adds color(s) to the input text and sends that colored text to the console
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
 * Converts an array to a better readable one
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

const ProgressBar = class {
    /**
     * Creates a dynamic progress bar with a percentage and custom message display
     * @param {Number} timesToUpdate How many times you will call ProgressBar.next() in total - example: 4 means you will need to call ProgressBar.next() exactly four times to reach 100% progress 
     * @param {String} [initialMessage=""] Initial message that appears at 0% progress
     * @since 1.7.0
     */
    constructor(timesToUpdate, initialMessage) {
        if(initialMessage == undefined) initialMessage = "";
        this.timesToUpdate = timesToUpdate;
        this.iteration = 1;
        this.progress = 0.0;
        this.progressDisplay = "";
        this.filledChar = "■";
        this.blankChar = "─";
        this.finishFunction = undefined;

        for(let i = 0; i < this.timesToUpdate; i++) this.progressDisplay += this.blankChar;

        this._update(initialMessage);
    }

    /**
     * Increment the progress bar. The amount of these functions should be known at the point of initially creating the ProgressBar object.
     * @param {String} message Message that should be displayed
     * @since 1.7.0
     */
    next(message) { // increments the progress bar
        this.progress = (1 / this.timesToUpdate) * this.iteration;

        let pt = "";
        for(let i = 0; i < this.iteration; i++) pt += this.filledChar;
        this.progressDisplay = pt + this.progressDisplay.substring(this.iteration);
        
        this._update(message);
        this.iteration++;
    }

    /**
     * ❌ Private method - please don't use ❌
     * @private
     */
    _update(message) { // private method to update the console message
        if(this.iteration <= this.timesToUpdate) {
            if(!isEmpty(message)) message = "- " + message;
            else message = "";

            process.stdout.cursorTo(0);
            process.stdout.clearLine();
            process.stdout.write(`${(this.progress != 1.0 ? "\x1b[33m" : "\x1b[32m")}\x1b[1m${Math.round(this.progress * 100)}%\x1b[0m ${(Math.round(this.progress * 100) < 10 ? "  " : (Math.round(this.progress * 100) < 100 ? " " : ""))}[${this.progressDisplay.replace(new RegExp(this.filledChar, "gm"), "\x1b[32m\x1b[1m" + this.filledChar + "\x1b[0m")}] ${message}${(this.progress != 1.0 ? "" : "\n")}`);
            if(this.progress == 1.0 && this.finishFunction != undefined) this.finishFunction();
        }
    }

    /**
     * Executes a function once the progress reaches 100%
     * @param {Function} callback Function
     * @since 1.7.0
     */
    onFinish(callback) {
        if(typeof callback != "function" || callback == undefined || callback == null) throw new Error("Wrong arguments provided for ProgressBar.onFinish() - (expected: \"Function\", got: \"" + typeof callback + "\")");
        this.finishFunction = callback;
    }

    /**
     * Get the current progress as a float value
     * @returns {Float}
     * @since 1.7.0
     */
    getProgress() {
        return this.progress;
    }

    /**
     * Get the amount of increments that are still needed to reach 100% progress
     * @returns {Number}
     * @since 1.7.0
     */
    getRemainingIncrements() {
        return (this.timesToUpdate - this.iteration >= 0 ? this.timesToUpdate - this.iteration : 0);
    }
}
module.exports.ProgressBar = ProgressBar;


/**
 * Transforms the `value` parameter from the numerical range [`range_1_min`-`range_1_max`] to the numerical range [`range_2_min`-`range_2_max`]
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
 * Use this to add color to your console output
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


/**
 * @typedef {Object} MenuPromptMenuOption
 * @prop {String} key The key(s) that need(s) to be pressed to select this option
 * @prop {String} description The description of this option
 */

/**
 * @typedef {Object} MenuPropmtMenu
 * @prop {String} title The title of this menu
 * @prop {Array<MenuPromptMenuOption>} options An array of options for this menu
 */

/**
 * @typedef {Object} MenuPromptOptions The options of the menu prompt
 * @prop {String} [exitKey="x"] The key or keys that need to be entered to exit the prompt
 * @prop {String} [optionSeparator=")"] The separator character(s) between the option key and the option description
 * @prop {String} [cursorPrefix="─►"] Character(s) that should be prefixed to the cursor. Will default to this arrow: "─►"
 * @prop {Boolean} [retryOnInvalid=true] Whether the menu should be retried if the user entered a wrong option - if false, continues to next menu
 * @prop {Function} [onOptionSelected] A function that gets called whenever the user selects an option. The only passed parameter is the `key` value of the option
 * @prop {Function} [onFinished] A function that gets called when the user is done with all of the menus of the prompt or entered the exit key(s). The only passed parameter is an array containing all selected option keys
 */

/**
 * @typedef {Array<String>} MenuPromptResult The results of the menu prompt
 */

const MenuPrompt = class {
    /**
     * Creates an interactive prompt with one or many menus
     * @param {MenuPromptOptions} options The options for the prompt
     * @param {Array<MenuPromptMenus>} menus An array of menus
     * @returns {(Boolean|String)} Returns true, if the menu was successfully created, a string containing the error message, if not
     * @since 1.8.0
     */
    constructor(options, menus)
    {
        if(isEmpty(options))
        {
            options = {
                exitKey: "x",
                optionSeparator: ")",
                cursorPrefix: "─►",
                retryOnInvalid: true,
                onOptionSelected: () => {},
                onFinished: () => {},
            };
        }
        else
        {
            if(isEmpty(options.exitKey)) options.exitKey = "";
            if(isEmpty(options.optionSeparator)) options.optionSeparator = ")";
            if(options.cursorPrefix !== "" && isEmpty(options.cursorPrefix)) options.cursorPrefix = "─►";
            if(isEmpty(options.retryOnInvalid)) options.retryOnInvalid = true;
            if(isEmpty(options.onOptionSelected)) options.onOptionSelected = () => {};
            if(isEmpty(options.onFinished)) options.onFinished = () => {};
        }
        this._options = options;

        this._menus = menus;

        this._currentMenu = -1;

        this._rl = null;

        this._oldStdout = process.stdout.write;
        this._oldStderr = process.stderr.write;

        return true;
    }

    /**
     * Opens the menu
     * 
     * Warning ⚠️
     * This suppresses the processes' `stdout` and `stderr` streams.
     * This means you can't print something to the console while the menu is opened.
     * Use `MenuPrompt.close()` or wait until the user is done with the prompt to restore `stdout`'s and `stderr`'s function and be able to use the console normally again.
     * @returns {Boolean} Returns true, if the menu could be opened or a string containing an error message, if not
     * @since 1.8.0
     */
    open()
    {
        this._active = true;

        this._oldStdout = process.stdout.write;
        this._oldStderr = process.stderr.write;

        process.stdout.write = x => {};
        process.stderr.write = x => {};


        let openMenu = idx => {
            if(idx >= this._menus.length)
            {
                this._currentMenu = -1;
                return this._options.onFinished();
            }
            else
            {
                this._currentMenu = idx;

                // TODO: all of this shit

                // ... async shit ...
                // on option selected:

                // if option valid OR this._options.retryOnInvalid === false:
                return openMenu(++idx);

                // else (option invalid):
                userFeedback();
                return openMenu(idx);
            }
        }

        openMenu(0);
    }

    /**
     * Closes the menu and returns the chosen options up to this point
     * @returns {MenuPromptResult} Returns the results of the menu prompt
     * @since 1.8.0
     */
    close()
    {
        process.stdout.write = this._oldStdout;
        process.stderr.write = this._oldStderr;

        this._active = false;
        this._rl.close();
        console.clear();
    }

    /**
     * Adds a new menu to the menu prompt
     * You can even call this method while the menu is opened
     * @param {MenuPropmtMenu} menu
     * @returns {(Boolean|String)} Returns true, if the menu could be added or a string containing an error message, if not
     * @since 1.8.0
     */
    addMenu(menu)
    {
        // TODO: validate menu

        try {
            this._menus.push(menu);
        }
        catch(err)
        {
            return err;
        }
        return true;
    }

    /**
     * Returns the (zero-based) index of the current menu
     * @returns {Number} The zero-based index of the current menu or `-1` if the menu hasn't been opened yet
     * @since 1.8.0
     */
    currentMenu()
    {
        return this._currentMenu;
    }

    /**
     * Returns the current results of the menu prompt.
     * Does NOT close the menu prompt.
     * @returns {MenuPromptResult} Returns the results of the menu prompt or null, if there aren't any results yet
     * @since 1.8.0
     */
    result()
    {
        if(!isEmpty(this._result))
            return this._result;
        else return null;
    }
}
module.exports.MenuPrompt = MenuPrompt;