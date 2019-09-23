/**
 * 🔹 Info about JSLib 🔹
 * @param {Object} jsli
 * @param {String} jsli.version The current version
 * @param {Array<Number>} jsli.intVersion The current version of JSLib, but as an array of numbers for easier manipulation
 * @param {String} jsli.name The name of JSLib
 * @param {String} jsli.desc A short description of JSLib
 * @param {String} jsli.author The author of JSLib - format: "name <email> (website)"
 * @param {Array<String>} jsli.contributors People that contributed to JSLib - format: "name <email> (website)"
 * @param {String} jsli.license The license of JSLib
 * @param {String} jsli.documentation The URL to JSLib's documentation
 * @since 1.5.0
 * @version 1.8.0 added "contributors" array
 */
const jslInfo = {
    version: "1.8.0",
    intVersion: [1, 8, 0],
    name: "JSLib",
    desc: "A multi-purpose, lightweight and dependency-free JavaScript library that makes coding a bit faster by providing many easy to use functions and classes",
    author: "Sv443 <sven.fehler@web.de> (https://sv443.net/)",
    contributors: ["none yet :("],
    license: "MIT (https://sv443.net/LICENSE)",
    documentation: "https://github.com/Sv443/JSLib-npm/wiki"
};
module.exports = jslInfo;