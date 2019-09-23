/**
 * 🔹 Removes the script shut down prevention that was previously enabled with noShutdown() 🔹
 * (Sorry for the name, I saw an opportunity and I took it, don't judge me)
 * @since 1.6.0
 */
const yesShutdown = () => {
    if(process.jsl != undefined && !process.jsl.noShutdown) return;

    if(process.jsl == undefined)
        process.jsl = {};

    process.jsl.noShutdown = false;
    process.on("SIGINT", ()=>process.exit());
    process.on("SIGTERM", ()=>process.exit());
}
module.exports = yesShutdown;