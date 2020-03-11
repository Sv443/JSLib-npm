/**
 * 🔹 Removes duplicate items in an array 🔹
 * @param {Array<*>} array An array with any values
 * @returns {Array<*>}
 */
function removeDuplicates(array) {
    return array.filter((a, b) => array.indexOf(a) === b);
}
module.exports = removeDuplicates;
