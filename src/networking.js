// type and properties definition for the returned object of the ping function
/**
 * @typedef {Object} pingReturnValues An object containing the ping's results
 * @property {Number} statusCode The ping's returned status code (eg. 200 or 404)
 * @property {String} statusMessage The status message of the ping - Could be something like "Ok" for status 200 or "Not Found" for status 404
 * @property {Float} responseTime The response time in milliseconds as a float with two decimal places
 */

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
    var isEmpty = require("./misc").isEmpty;
    var http = require("http");
    var https = require("https");

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
                    let pingHR = process.hrtime();
                    https.get({
                        host: host,
                        path: path,
                        timeout: timeout
                    }, res => {
                        let measuredTime = (process.hrtime(pingHR)[1] / 1e6).toFixed(2);
                        res.on('data', d => {});
                        res.on('end', () => {
                            let returnval = {
                                "statusCode": parseInt(res.statusCode),
                                "statusMessage": res.statusMessage,
                                "responseTime": measuredTime
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
                    let pingHR = process.hrtime();
                    http.get({
                        host: host,
                        path: path,
                        timeout: timeout
                    }, res => {
                        let measuredTime = (process.hrtime(pingHR)[1] / 1e6).toFixed(2);
                        res.on('data', d => {});
                        res.on('end', () => {
                            let returnval = {
                                "statusCode": parseInt(res.statusCode),
                                "statusMessage": res.statusMessage,
                                "responseTime": measuredTime
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