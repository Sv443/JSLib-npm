// type and properties definition for the returned object of the ping function
/**
 * @typedef {Object} pingReturnValues An object containing the ping's results
 * @property {Number} statusCode The ping's returned status code (eg. 200 or 404)
 * @property {String} statusMessage The status message of the ping - Could be something like "Ok" for status 200 or "Not Found" for status 404
 * @property {Float} responseTime The response time in milliseconds as an integer
 */

/**
 * Pings the specified URL and returns the status code
 * @param {String} URL the URL that should be pinged
 * @param {*} [timeout=5000] time in milliseconds after which the ping will time out and return a 404 error
 * @returns {Promise<pingReturnValues>} Promise gets passed the HTTP status code (for example 200 or 404), the status message and the response duration in ms; if errored returns a string with the error message
 * @since 1.6.0
 * @version 1.6.1 changed attributes
 * @version 1.6.5 changed time measurement dependency due to deprecation
 * @version 1.6.6 updated documentation for the resulting object
 * @version 1.8.0 changed time measurement method to be a much more accurate one
 */
module.exports.ping = (URL, timeout) => {
    let pingTimestamp = new Date().getTime();
    let isEmpty = require("./misc").isEmpty;

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

    let http = require("http");

    if(http_version == "https")
        http = require("https");

    try {
        return new Promise((resolve, reject) => {
            if(isEmpty(host)) return reject("URL is formatted incorrectly");
            try {
                http.get({
                    host: host,
                    path: path,
                    timeout: timeout
                }, res => {
                    let measuredTime = (new Date().getTime() - pingTimestamp).toFixed(0);
                    res.on('data', d => {});
                    res.on('end', () => {
                        let returnval = {
                            "statusCode": parseInt(res.statusCode),
                            "statusMessage": res.statusMessage,
                            "responseTime": parseInt(measuredTime),
                            "contentType": res.headers["content-type"]
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

/**
 * @typedef {Object} DownloadProgress
 * @prop {Number} current The current download progress in kilobytes
 * @prop {Number} total The total file size in kilobytes
 */

/**
 * @typedef {Function} ProgressCallback
 * @param {DownloadProgress} DownloadProgress
 */

 /**
 * @typedef {Function} FinishedCallback
 * @param {(String|undefined)} error This parameter is null if no error was encountered, or contains a string if an error was encountered
 */

/**
 * @typedef {Object} DownloadOptions
 * @prop {String} fileName The name that the downloaded file should be saved as including the file extension, for example: "image.png"
 * @prop {ProgressCallback} progressCallback A callback function that gets called every 50 milliseconds that gets passed an object containing info on the download progress
 * @prop {FinishedCallback} finishedCallback A callback function that gets passed an parameter that is null if no error was encountered, or contains a string if an error was encountered
 */

/**
 * Downloads a file from the specified URL, to the specified destination path, according to the specified options
 * @param {String} url The URL to the file you want to download
 * @param {String} [destPath] The path where the file should be saved to - can be absolute or relative - If left empty, it will default to "./"
 * @param {DownloadOptions} [options]
 * @since 1.8.0
 */
module.exports.downloadFile = (url, destPath = "./", options) => {
    let isEmpty = require("./misc").isEmpty;
    let fs = require("fs");
    let https = require("https");

    if(isEmpty(options))
    {
        options = {
            fileName: "download.txt",
            progressCallback: () => {},
            finishedCallback: () => {}
        }
    }
    else
    {
        if(isEmpty(options.fileName)) options.fileName = "download.txt";
        if(isEmpty(options.progressCallback)) options.progressCallback = () => {};
        if(isEmpty(options.finishedCallback)) options.finishedCallback = () => {};
    }

    let lastM = false;

    let dest = `${destPath}${destPath.endsWith("/") ? "" : "/"}${options.fileName}`;


    let urlCl = new URL(url);
    let opts = {
        hostname: urlCl.hostname,
        port: 443,
        path: urlCl.pathname,
        method: "HEAD"
    };

    let file = fs.createWriteStream(dest);
    
    let req2 = https.request(opts, res2 => {
        if(res2.statusCode >= 300 && res2.statusCode < 400)
            return this.downloadFile(res2.headers["location"], destPath, options);

        if(res2.statusCode >= 400)
            return options.finishedCallback("Status Code: " + res2.statusCode);

        let totalSize = null;
        if(!isEmpty(res2.headers) && !isEmpty(res2.headers["content-length"]))
            totalSize = parseInt(res2.headers["content-length"]);
            

        let req = https.get(url, res => {
            let sizeUpdateIv;
            if(!isEmpty(totalSize) && !isEmpty(options) && !isEmpty(options.progressCallback))
                sizeUpdateIv = setInterval(() => {
                    let curSize = fs.statSync(dest).size;
                    options.progressCallback({
                        currentB: curSize,
                        currentKB: (curSize / 1000).toFixed(3),
                        currentMB: (curSize / 1000000).toFixed(3),
                        totalB: totalSize,
                        totalKB: (totalSize / 1000).toFixed(3),
                        totalMB: (totalSize / 1000000).toFixed(3)
                    });
                }, 50);
            res.pipe(file);
    
            file.on("finish", () => {
                if(!isEmpty(options.progressCallback)) clearInterval(sizeUpdateIv);
                if(fs.statSync(dest).size == totalSize && !lastM)
                {
                    lastM = true;
                    if(!isEmpty(totalSize) && !isEmpty(options) && !isEmpty(options.progressCallback))
                        options.progressCallback({
                            currentB: totalSize,
                            currentKB: (totalSize / 1000).toFixed(3),
                            currentMB: (totalSize / 1000000).toFixed(3),
                            totalB: totalSize,
                            totalKB: (totalSize / 1000).toFixed(3),
                            totalMB: (totalSize / 1000000).toFixed(3)
                        });
                }
    
                let cb = () => {
                    if(!isEmpty(options) && !isEmpty(options.finishedCallback))
                        return options.finishedCallback(null);
                };
                file.close(cb);
            });
        });
    
        req.on("error", err => {
            fs.unlink(dest, () => {
                if(!isEmpty(options) && !isEmpty(options.finishedCallback))
                    return options.finishedCallback(err);
            });
        });

        req.end();
    });

    req2.on("error", (e) => {
        console.error(e);
    });

    req2.end();
}