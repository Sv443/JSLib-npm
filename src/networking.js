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
 * @typedef {Object} DownloadOptions
 * @prop {String} fileName The name that the downloaded file should be saved as
 * @prop {String} fileType The file type / extension - for example: ""
 */
let downloadOpts = {
    fileName: "[filename from website]",
    fileType: "txt",
    progressCallback: () => {},
    finishedCallback: () => {}
}

/**
 * Downloads a file from the specified URL, to the specified destination path, according to the specified options
 * @param {String} url The URL to the file you want to download
 * @param {String} [destPath] Can be absolute or relative - If left empty, it will default to "./"
 * @param {DownloadOptions} [options]
 */
const downloadFile = (url, destPath = "./", options) => {
    if(isEmpty(options))
    {

    }
    else
    {
        if(isEmpty(options.fileName)) options.fileName = 
    }

    let lastM = false;

    let dest = `${destPath}${destPath.endsWith("/") ? "" : "/"}${options.fileName}${options.fileType}`;
    let file = fs.createWriteStream(dest);

    let req = https.get(url, res => {
        let totalSize = (res.headers["content-length"] / 1e+6).toFixed(2);
        let sizeUpdateIv = setInterval(() => {
            if(!isEmpty(options) && !isEmpty(options.progressCallback))
                options.progressCallback({
                    current: (fs.statSync(dest).size / 1e+6).toFixed(2),
                    total: totalSize
                });
        }, 100);
        res.pipe(file);

        file.on("finish", () => {
            clearInterval(sizeUpdateIv);
            if((fs.statSync(dest).size / 1e+6).toFixed(2) == totalSize && !lastM)
            {
                lastM = true;
                fileSizeUpd(totalSize, totalSize);
            }

            let cb = () => setTimeout(() => {
                resolve();
            }, 300);
            file.close(cb);
        });
    });

    req.on("error", err => {
        fs.unlink(dest, () => reject(`Couldn't download file due to error: ${err}`));
    });
}