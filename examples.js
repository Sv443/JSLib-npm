
// this is a script containing examples for JSLib. You can run it and see how everything works.


const jsl = require("jslib");

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
jsl.error("error: address is in use!");
jsl.error("error: address is in use!", "error.log");



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



setInterval(()=>{}, 500);
jsl.softShutdown(()=>{
    console.log("\n\nGracefully shutting down running processes...\n\n");
});



console.log("\nSettings.json:");
try{
    console.log(jsl.settings.httpconnection.url);
}
catch(x){
    console.log("Couldn't find settings.json");
}



console.log("\nRandRange:");
console.log(jsl.randRange(40, 50, false));