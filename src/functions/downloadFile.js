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
 * @prop {String} fileName The name that the downloaded file should be saved as, including the file extension - for example: "image.png" or "archive.zip" - defaults to "download.txt"
 * @prop {ProgressCallback} progressCallback A callback function that gets called every 50 milliseconds that gets passed an object containing info on the download progress - sometimes the download progress can't be gotten so this callback won't contain the total size or will not be called a final time on finish. This behavior is normal.
 * @prop {FinishedCallback} finishedCallback A callback function that gets called when the download finished and gets passed a parameter that is `null` if no error was encountered, or contains a string if an error was encountered
 */

/**
 * Downloads a file from the specified URL, to the specified destination path, according to the specified options
 * @param {String} url The URL to the file you want to download
 * @param {String} [destPath] The path where the file should be saved to - can be absolute or relative - If left empty, it will default to the root directory of the project
 * @param {DownloadOptions} [options]
 * @since 1.8.0
 */
const downloadFile = (url, destPath = "./", options) => {
    let isEmpty = require("./isEmpty");
    let fs = require("fs");
    let https = require("https");

    if(isEmpty(options))
        options = {
            fileName: "download.txt",
            progressCallback: () => {},
            finishedCallback: () => {}
        }
    else
    {
        if(isEmpty(options.fileName)) options.fileName = "download.txt";
        if(isEmpty(options.progressCallback)) options.progressCallback = () => {};
        if(isEmpty(options.finishedCallback)) options.finishedCallback = () => {};
    }

    let lastM = false;

    let dest = `${destPath}${destPath.endsWith("/") ? "" : "/"}${options.fileName}`;
    if(!fs.existsSync(destPath))
        throw new Error(`Error in jsl.downloadFile() - The directory / directories at the path "${destPath}" doesn't / don't exist. Please make sure this directory / these directories exist nd try again.`);

    let urlCl = new URL(url);
    let opts = {
        hostname: urlCl.hostname,
        port: urlCl.protocol === "https:" || urlCl.protocol.includes("https") ? 443 : 80,
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
            if(!isEmpty(options) && !isEmpty(options.progressCallback))
                sizeUpdateIv = setInterval(() => {
                    let curSize = fs.statSync(dest).size;
                    if(!isEmpty(totalSize))
                        options.progressCallback({
                            currentB: curSize,
                            currentKB: (curSize / 1000).toFixed(3),
                            currentMB: (curSize / 1000000).toFixed(3),
                            totalB: totalSize,
                            totalKB: (totalSize / 1000).toFixed(3),
                            totalMB: (totalSize / 1000000).toFixed(3)
                        });
                    else
                        options.progressCallback({
                            currentB: curSize,
                            currentKB: (curSize / 1000).toFixed(3),
                            currentMB: (curSize / 1000000).toFixed(3)
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

    req2.on("error", e => {
        throw new Error(`Error while reading file information: ${e}`);
    });

    req2.end();
}
module.exports = downloadFile;