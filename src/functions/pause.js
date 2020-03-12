/**
 * 🔹 Waits for the user to press a key and then resolves a Promise 🔹
 * @param {String} text The text to display
 * @returns {Promise} Passes the pressed key in the resolution or the error message in the rejection
 * @since 1.9.0
 */
function pause(text = "Press any key to continue... ")
{
    if(!process.stdin.isRaw)
        process.stdin.setRawMode(true);

    return new Promise((resolve, reject) => {
        process.stdout.write(`${text} `);
        process.stdin.resume();

        process.stdin.on("data", chunk => {
            process.stdout.write("\n");
            process.stdin.pause();

            return resolve(chunk.toString());
        });

        process.stdin.on("error", err => {
            return reject(err);
        });
    });
}
module.exports = pause;
