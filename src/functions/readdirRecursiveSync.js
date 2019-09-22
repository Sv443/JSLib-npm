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
module.exports = readdirRecursiveSync;