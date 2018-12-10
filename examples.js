
// this is a script containing examples for JSLib. You can run it and see how everything works.


const jsl = require("jslib");
//const jsl = require("./index.js");

console.log("JSLib v" + jsl.version());

console.log("\nIs empty");
console.log(jsl.isEmpty([]));
console.log(jsl.isEmpty(""));
console.log(jsl.isEmpty(undefined));
console.log(jsl.isEmpty(null));



console.log("\nIs array empty");
console.log(jsl.isArrayEmpty(["", "", undefined, [], null, ""]));
console.log(jsl.isArrayEmpty(["", "test", undefined, null]));
console.log(jsl.isArrayEmpty([1, "test", [1, 2, 3]]));



console.log("\nError log:");
jsl.error("error 158: I am an example error!");
jsl.error("error 158: I am an example error that gets logged to the error.log file!", "./error.log");



const error_log_file = "./error.log";
jsl.logger(error_log_file, "Error: xy", {
    append_bottom: true,
    timestamp: true
});



console.log("\nUUID:");
console.log(jsl.generateUUID("xxxx-yyyy"));



console.log("\nAll equal:");
console.log(jsl.allEqual([1, 1, 1, 1, 9, 1]));
console.log(jsl.allEqual([1, 1, 1, 1, 1, 1]));
console.log(jsl.allEqual(["a", "b", "c"]));
console.log(jsl.allEqual(["a", "a", "a"]));



console.log("\nRandRange:");
console.log(jsl.randRange(40, 50, false));



console.log("Console color:");
jsl.consoleColor("I am a text with color", "fggreen bgblue");
jsl.consoleColor("I am an error message", "fgred bright");
jsl.consoleColor("Underlined text", "bgyellow ul fgblack");



console.log("\nPing:");
jsl.ping("http", "sv443.ddns.net", "/", 5000).then(res => {
    // Success
    console.log("HTTP: " + res);
}, res => {
    // Error
    console.log("HTTP - Error: " + res);
});

jsl.ping("https", "www.google.com", "/", 5000).then(res => {
    // Success
    console.log("HTTPS: " + res);
}, res => {
    // Error
    console.log("HTTPS - Error: " + res);
});

jsl.ping("https", "www.google.com", "/succ", 5000).then(res => {
    // Success
    console.log("Invalid URL: " + res);
}, res => {
    // Error
    console.log("Invalid URL - Error: " + res);
});


setTimeout(()=>{
    console.log("\nNow the script can shut down gracefully");
    var running_process = setInterval(()=>{}, 500); // <- this is to simulate a running process
    jsl.softShutdown(()=>{
        clearInterval(running_process);
        console.log("\n\n\x1b[33mGracefully shutting down running processes...\x1b[0m\n\n");
    });
}, 3000);

setTimeout(()=>{
    console.log("\nShudown with CTRL+C is impossible now");
    jsl.noShutdown();
}, 6000);

setTimeout(()=> {
    console.log("\nShutdown is now possible again");
    jsl.yesShutdown();
}, 9000);