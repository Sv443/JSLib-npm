/**
 * 🔹 Waits for the user to press a key and then resolves a Promise 🔹
 * @param {String} text The text to display
 * @returns {Promise<String>} Passes the pressed key in the resolution or the error message in the rejection
 * @since 1.9.0
 * @version 1.9.1 Events are now being correctly unregistered
 */
function pause(text = "Press any key to continue...")
{
    if(!process.stdin.isRaw)
        process.stdin.setRawMode(true);

    return new Promise((resolve, reject) => {
        process.stdout.write(`${text} `);
        process.stdin.resume();

        let onError = err => {
            return reject(err);
        }

        let onData = chunk => {
            if(/\u0003/gu.test(chunk)) // eslint-disable-line no-control-regex
                process.exit(0);

            process.stdout.write("\n");
            process.stdin.pause();

            process.stdin.removeListener("data", onData);
            process.stdin.removeListener("error", onError);

            return resolve(chunk.toString());
        }

        process.stdin.on("data", onData);
        process.stdin.on("error", onError);
    });
}
module.exports = pause;
