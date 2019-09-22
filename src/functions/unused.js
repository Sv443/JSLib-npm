/**
 * 🔹 Use this if you are using a linter that complains about unused vars.
 * As this function basically does nothing, you can even leave it in once the variable is used again and nothing will break. 🔹
 * @param {*} [any_var] Any variable of any type
 * @returns {void}
 * @since 1.8.0
 */
const unused = any_var => {
    try
    {
        this.x=any_var;
        return;
    }
    catch(e)
    {
        return;
    }
};
module.exports = unused;