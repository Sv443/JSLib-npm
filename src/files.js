/**
 * 🔹 Logs a string to a specified log file 🔹
 * @param {string} path Relative path to the log file
 * @param {string} content Content that should be written to the log file
 * @param {Object} [options] Additional options
 * @param {boolean} [options.append_bottom=true] true to append content to the bottom of a file, false to just override the file's contents
 * @param {boolean} [options.timestamp=false] true to add a timestamp to the logged content
 * @since 1.5.0
 */
function logger(path, content, options) {
    let fs = require("fs");
    let isEmpty = require("./misc").isEmpty;

    if(isEmpty(path) || isEmpty(content) || typeof path != "string" || typeof content != "string")
        return console.log("path and/or content are empty or of the wrong type");

    let timestamp = new Date().toString();

    if(options.timestamp)
        content = `[${timestamp}]  ${content}`

    if(!options.append_bottom)
        fs.writeFileSync(path, content);
    else fs.appendFileSync(path, content + "\n");
}
module.exports.logger = logger;

/**
 * 🔹 Reads a folder asynchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback - Warning! Large amounts of files (like letting it run on "C:/") can freeze the process completely or exceed the maximum possible index of a JS array 🔹
 * @param {String} folder The folder that should be recursively read
 * @param {Function} callback The function that gets called after the folder has been read - has two arguments: error and result
 * @async
 * @since 1.7.0
 */
function readdirRecursive(folder, callback) { // modified version of https://stackoverflow.com/a/5827895/8602926
    let fs = require("fs");
    let path = require("path");
    let walk = function(dir, done) {
        let results = [];
        fs.readdir(dir, function(err, list) {
            if(err)
                return done(err);
            let pending = list.length;
            if(!pending)
                return done(null, results);
            list.forEach(function(file) {
                file = path.resolve(dir, file);
                fs.stat(file, function(err, stat) {
                    if(stat && stat.isDirectory()) {
                        walk(file, function(err, res) {
                            results = results.concat(res);
                            if(!--pending) done(null, results);
                        });
                    } else {
                        results.push(file);
                        if(!--pending) done(null, results);
                    }
                });
            });
        });
    };
    walk(folder, callback);
}
module.exports.readdirRecursive = readdirRecursive;

/**
 * 🔹 Reads a folder synchronously and recursively and returns all absolute file paths (starting at the drive letter (eg. "C:/Users/...")) in the callback - Warning! Large amounts of files (like letting it run on "C:/") can freeze the process completely or exceed the maximum possible index of a JS array 🔹
 * @param {String} folder The folder that should be recursively read
 * @since 1.7.0
 */
function readdirRecursiveSync(folder) { // from https://stackoverflow.com/a/16684530/8602926
    let fs = require("fs");
    let walk = function(dir) {
        let results = [];
        let list = fs.readdirSync(dir);
        list.forEach(function(file) {
            file = dir + '/' + file;
            let stat = fs.statSync(file);
            if (stat && stat.isDirectory())
                results = results.concat(walk(file));
            else results.push(file);
        });
        return results;
    }
    return walk(folder);
}
module.exports.readdirRecursiveSync = readdirRecursiveSync;