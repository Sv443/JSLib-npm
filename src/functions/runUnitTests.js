/**
 * 🔹 This runs JSLib's unit tests. You can use this function to ensure JSLib is working correctly. 🔹
 * ⚠️ Calling this function will exit the process and it will write the unit test results into the stdout (console) ⚠️
 * @since 1.8.0
 */
const runUnitTests = () => {
    require("../../unittest");
}
module.exports = runUnitTests;