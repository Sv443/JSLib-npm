// JSLib-npm by Sv443 - licensed under the MIT license
// For more information, please read the `README.md` file or go to https://github.com/Sv443/JSLib-npm

module.exports = {
    //#MARKER functions
    isEmpty: require("./src/functions/isEmpty"),
    isArrayEmpty: require("./src/functions/isArrayEmpty"),
    error: require("./src/functions/error"),
    allEqual: require("./src/functions/allEqual"),
    softShutdown: require("./src/functions/softShutdown"),
    noShutdown: require("./src/functions/noShutdown"),
    yesShutdown: require("./src/functions/yesShutdown"),
    readableArray: require("./src/functions/readableArray"),
    mapRange: require("./src/functions/mapRange"),
    unused: require("./src/functions/unused"),
    replaceAt: require("./src/functions/replaceAt"),
    randRange: require("./src/functions/randRange"),
    randomizeArray: require("./src/functions/randomizeArray"),
    removeDuplicates: require("./src/functions/removeDuplicates"),
    seededRNG: {
        generateSeededNumbers: require("./src/functions/seededRNG/generateSeededNumbers"),
        generateRandomSeed: require("./src/functions/seededRNG/generateRandomSeed"),
        validateSeed: require("./src/functions/seededRNG/validateSeed"),
    },
    generateUUID: {
        hexadecimal: require("./src/functions/generateUUID/hexadecimal"),
        decimal: require("./src/functions/generateUUID/decimal"),
        alphanumerical: require("./src/functions/generateUUID/alphanumerical"),
        binary: require("./src/functions/generateUUID/binary"),
        custom: require("./src/functions/generateUUID/custom"),
    },
    ping: require("./src/functions/ping"),
    downloadFile: require("./src/functions/downloadFile"),
    logger: require("./src/functions/logger"),
    readdirRecursive: require("./src/functions/readdirRecursive"),
    readdirRecursiveSync: require("./src/functions/readdirRecursiveSync"),
    pause: require("./src/functions/pause"),

    //#MARKER classes
    ProgressBar: require("./src/classes/ProgressBar"),
    MenuPrompt: require("./src/classes/MenuPrompt"),


    //#MARKER objects
    info: require("./src/objects/info"),
    colors: require("./src/objects/colors"),

    //#MARKER deprecated
    version: require("./src/deprecated").version,
    consoleColor: require("./src/deprecated").consoleColor,
};
