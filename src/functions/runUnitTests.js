/**
 * 🔹 This runs JSLib's unit tests. You can use this function to ensure JSLib is working correctly. 🔹
 * ⚠️ Calling this function will exit the process and it will write the unit test results into the stdout (console) ⚠️
 * @param {Boolean} [colorblind=false] Set this to true to change green to blue and red to yellow
 * @since 1.8.0
 */
const runUnitTests = colorblind => {
    if(colorblind === true)
        module.exports.colorblind = true;
    require("../../unittest");
}
module.exports = runUnitTests;