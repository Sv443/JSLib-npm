/**
 * 🔹 Replaces a character from the specified `string` at the specified `index` with the value of `replacement` 🔹
 * @param {String} input
 * @param {Number} index 
 * @param {String} replacement 
 * @returns {String}
 * @since 1.8.0
 */
const replaceAt = (input, index, replacement) => input.substr(0, index) + replacement + input.substr(index + replacement.length);
// thanks to Cem Kalyoncu on Stackoverflow for this one (I was just to lazy to code it myself): https://stackoverflow.com/a/1431113/8602926
module.exports = replaceAt;