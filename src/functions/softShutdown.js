/**
 * 🔹 Executes a synchronous function before the process gets shut down (on SIGINT or SIGTERM). 
 * This can be used to close files, abort connections or just to print a console message before shutdown. 🔹 
 * ⚠️ Asynchronous function execution is not supported (yet) ⚠️
 * @param {Function} funct This function will get executed before process shutdown
 * @param {Number} [code=0] The exit code with which the process should be closed. Defaults to 0
 * @since 1.5.0
 * @version 1.8.0 Added "code" parameter to specify an exit code
 */
module.exports.softShutdown = (funct, code) => {
    let isEmpty = require("./isEmpty");

    code = parseInt(code);

    if(isNaN(code) || code < 0)
        code = 0;

    let onbeforeshutdown = exitCode => {
        if(!process.jsl.noShutdown)
        {
            if(!isEmpty(funct) && typeof funct == "function")
                funct();
            process.exit(exitCode);
        }
    }
    process.on("SIGINT", ()=>onbeforeshutdown(code));
    process.on("SIGTERM", ()=>onbeforeshutdown(code));
    process.on("SIGKILL", ()=>onbeforeshutdown(code));
}