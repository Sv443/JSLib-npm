function logger(path, content, options) {
    let fs = require("fs");
    let isEmpty = require("./misc").isEmpty;

    if(isEmpty(path) || isEmpty(content) || typeof path != "string" || typeof content != "string"){console.log("path and/or content are empty or of the wrong type");return;}

    let timestamp = new Date();

    if(options.timestamp) content = "[" + timestamp + "]  " + content;

    if(!options.append_bottom) fs.writeFileSync(path, content);
    else fs.appendFileSync(path, content + "\n");
}

module.exports.logger = logger;






function readdirRecursive(folder, callback) { // modified version of https://stackoverflow.com/a/5827895/8602926
    let fs = require("fs");
    let path = require("path");
    let walk = function(dir, done) {
        let results = [];
        fs.readdir(dir, function(err, list) {
            if(err) return done(err);
            let pending = list.length;
            if(!pending) return done(null, results);
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