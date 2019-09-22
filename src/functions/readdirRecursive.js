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
module.exports = readdirRecursive;