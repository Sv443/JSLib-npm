
# <img src="https://raw.githubusercontent.com/Sv443/JSLib/master/icon_v1.png" style="width: 5vw;height: 5vw;">&nbsp;&nbsp;JSLib-npm (v1.7.0) by [Sv443](https://www.sv443.net/) <br> [![](https://img.shields.io/github/license/Sv443/JSLib-npm.svg?style=flat-square)](https://github.com/Sv443/JSLib-npm/blob/master/LICENSE) ![](https://img.shields.io/badge/documentation-full-green.svg?style=flat-square) [![dependencies Status](https://david-dm.org/sv443/jslib-npm/status.svg?style=flat-square)](https://david-dm.org/sv443/jslib-npm) [![](https://img.shields.io/badge/JSDoc-supported-green.svg?style=flat-square)](http://usejsdoc.org/) [![](https://img.shields.io/github/issues/Sv443/JSLib-npm.svg?style=flat-square)](https://github.com/Sv443/JSLib-npm/issues) [![](https://img.shields.io/github/stars/Sv443/JSLib-npm.svg?style=flat-square)](https://github.com/Sv443/JSLib-npm/)
## A fairly lightweight JavaScript library that makes coding a bit faster by taking away some of the complicated / complex functions


<br><br><br>


---
## <span style="color:orange;">Menu:</span> [Dependencies](#dependencies)  -  [Installation](#installation) -  [Functions](#functions) -  [Useful Objects](#useful-json-ojects) - [Deprecated Functions](#deprecated-functions)
---

<br><br><br><br><br><br><br><br><br>

# Dependencies:
- fs
- http
- https
- execution-time
    - pretty-hrtime

<br><br><br><br><br>

# Installation:
```
$ npm i --save svjsl
```

Importing it in the script:
```javascript
const jsl = require("svjsl");
```
<br><br><br><br><br>
# Functions:

## <span style="color:orange;">Note: All arguments that are prefixed with a question mark are optional and will be set to a default value if left empty</span>
## <span style="color:orange;">Note 2: This documentation uses TypeScript type declarations to let you know of what type the variable can be (variable&lt;type&gt;)</span>

## Get all available functions
```javascript
jsl.help(); // this logs all available functions to the console (this is just the result of module.exports)
```

## Get JSLib's version:
```javascript
jsl.version(); // returns -> version of JSLib (as string)
```

## Check if a variable is empty:
```javascript
jsl.isEmpty(variable<Any>); // returns true, if the variable is empty and false if not. This function can NOT check a JSON object - please stringify it first
// alias: jsl.isempty(variable<Any>)

// examples:
jsl.isEmpty("");        // returns -> true
jsl.isEmpty(5);         // returns -> false
jsl.isEmpty([]);        // returns -> true
jsl.isEmpty(undefined); // returns -> true
jsl.isEmpty(null);      // returns -> true
jsl.isEmpty(NaN);       // returns -> false (NaN is not considered empty!)
jsl.isEmpty("foo");     // returns -> false
jsl.isEmpty(0);         // returns -> true (0 will also count as empty!)
```

## Check how many values in an array are empty:
```javascript
jsl.isArrayEmpty(array<Array>); // returns true if all values in array are empty, false if none are empty. If only some are empty, will return integer value of how many they are - note: the number 0 will also count as empty

// examples:
jsl.isArrayEmpty(["", "", undefined, [], null, ""]); // returns -> true     (all are empty)
jsl.isArrayEmpty(["", "test", undefined, null]);     // returns -> 3        (three are empty)
jsl.isArrayEmpty([1, "test", [1, 2, 3]]);            // returns -> false    (none are empty)
```

## Log something to a file:
```javascript
jsl.logger(path<String>, content<String>, ?options<Object>); // logs the content to the file specified with path

// options (optional):
{
    append_bottom: true/false,    // true = appends to the bottom of the file, false = overwrites whole file content (default: true)
    timestamp: true/false         // true = adds timestamp to the content, false = doesn't add timestamp (default: false)
}

// examples:
jsl.logger("./logs/error.log", "XY error was encountered");     // appends the content "XY error was encountered" to the file at "./logs/error.log" and doesn't include a timestamp

jsl.logger("./logs/error.log", "XY error was encountered", {    //  ─┐
    append_bottom: false,                                       //  ─┤
    timestamp: true                                             //   V
});                                                             // overwrites the content of the file at "./logs/error.log" to "XY error was encountered" and includes a timestamp
```

## Log a red error message to the console and optionally to a file:
```javascript
jsl.error(error_message<String>, ?log_file_path<String>, ?shutdown<Boolean>, ?status<Number>); // will log a red error message to the console and shut down the process if argument shutdown is set to true. Can also log the error message to a specified log file (also optional)

// examples:
jsl.error("Couldn't start listener. Trying again...");                             // just logs error message. Script keeps running
jsl.error("Couldn't start listener after 3 attempts. Shutting down.", true, 0);    // logs error message to console and shuts down script with status code 0 (normal shutdown)
jsl.error("Fatal error encountered.", true, 1);                                    // logs error message to console and shuts down script with status code 1 (crashed)
jsl.error("Fatal error encountered.", "./error.log", true, 1);                     // logs error message to console, logs error message to log file and shuts down script with status code 1 (crashed)
```

## Highly random UUID generator:
```javascript
jsl.generateUUID(uuid_format<String>); // generates a highly randomized UUID in the specified format (x's and y's are being replaced with random numbers or characters) - the used RNG gets manipulated by the system time and is therefor extremely random - the charset of the UUID is hexadecimal (0-9 and a-f)

// examples:
jsl.generateUUID("xxxx-yyyy");    // returns -> 5a7f-ca19    (this is just an example, as normally the output is random)
jsl.generateUUID("x");            // returns -> 3            (can be scaled up and down how much you like)
jsl.generateUUID("$%?_x##");      // returns -> $%?_5##      (only x and y will be replaced)
```

## Test if all values in an array are equal:
```javascript
jsl.allEqual(array<Array>); // returns -> true if all values of the array are equal and false if not

// examples:
jsl.allEqual([1, 1, 1, 1, 9, 1]));    // returns -> false
jsl.allEqual([1, 1, 1, 1, 1, 1]));    // returns -> true
jsl.allEqual(["a", "b", "c"]));       // returns -> false
jsl.allEqual(["a", "a", "a"]));       // returns -> true
```

## Soft shutdown:
```javascript
jsl.softShutdown(funct<Function>); // funct gets executed before the script shuts down. This is useful to terminate connections or services gracefully or starting another script before shutting down.
// note: funct gets executed synchronously! (I don't know how to implement it correctly. If you know how to, please make a pull request on GitHub)

// example:
jsl.softShutdown(()=>{
    http_server.close();
    mysql_connection.end();
    console.log("Goodbye!");
});
```

## Prevent shutdown on `CTRL + C`:
```javascript
jsl.noShutdown(); // this completely removes the ability to shut down the script with CTRL + C. It has to be killed within the script (using process.exit()) or with the task manager
```

## Re-enable shutdown on `CTRL + C`:
```javascript
jsl.yesShutdown(); // this re-enables the ability to shut down the script with CTRL + C if it has been disabled before with jsl.noShutdown()
// note: this function also prevents jsl.softShutdown() from shutting down the script
```

## Random Range:
```javascript
jsl.randRange(min<Number>, max<Number>); // returns a highly randomized number between the two specified boundaries
```

## Ping:
```javascript
jsl.ping(URL<String>, ?timeout<Number>); // pings the specified URL and returns an object through a promise. This contains the status code (for example 200 or 404), the response time and also the status message - also has an optional timeout value

// example (HTTP):
jsl.ping("http://sv443.ddns.net/", 5000).then(res => {
    // success:
    console.log("HTTP - status: " + res.statusCode + " - time: " + res.responseTime + " - message: " + res.statusMessage); // logs to console: HTTP - status: 200 - time: 342.620033 - message: OK
}, res => {
    // error:
    console.log("HTTP - Error: " + res);
});

// example (HTTPS):
jsl.ping("https://www.google.com/", 5000).then(res => {
    // success:
    console.log("HTTPS - status: " + res.statusCode + " - time: " + res.responseTime + " - message: " + res.statusMessage); // logs to console: HTTPS - status: 200 - time: 385.460315 - message: OK
}, res => {
    // error:
    console.log("HTTPS - Error: " + res);
});
```

<br><br><br><br><br><br>

# Useful JSON objects:

## JSLib information:
```javascript
jsl.info; // this object has some info stored about JSLib
```
This is how it looks like:
```json
{
    "version": "x.x.x",
    "name": "JSLib",
    "desc": "JavaScript simplified",
    "authors": "Sv443",
    "license": "MIT"
}
```

<br><br><br><br><br><br>

# Deprecated Functions:

## jsl.isempty (since 1.6.5):
```javascript
// this is the all lowercase alias of jsl.isEmpty() (which still exists)
jsl.isempty(variable);
// use this instead:
jsl.isEmpty(variable);
```

## Settings (since 1.6.0):
```javascript
// this function used to create a JSON object from a settings.json file but due to it not working correctly it was removed
jsl.settings.your_setting; // would have returned the value of that setting
```

<br><br><br><br><br><br>

## Disclaimer:
I don't claim any legal responsibility if this library is used in a malicious manner or if this library breaks your project. Please create a backup before using this library and report any issues to the [GitHub issue tracker](https://github.com/Sv443/JSLib-npm/issues) and I will try my best to fix it ASAP.
