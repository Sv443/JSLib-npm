# JSLib (v1.5.0 - npm version) by Sv443
## A JavaScript library that makes coding a bit faster by taking away a bit of the workarounds and the resulting pain in the ass

# Dependencies:
- fs

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
# Features:

## Get all available functions
```javascript
jsl.help(); // this logs all available functions to the console
```

## Get JSLib's version:
```javascript
jsl.version(); // returns the version of JSLib
```

## Check if a variable is empty:
```javascript
jsl.isEmpty(variable); // returns true, if the variable is empty and false if not. This function can NOT check a JSON object - please stringify it first

// examples:
jsl.isEmpty("");        // true
jsl.isEmpty(5);         // false
jsl.isEmpty([]);        // true
jsl.isEmpty(undefined); // true
jsl.isEmpty(null);      // false
jsl.isEmpty(NaN);       // false
jsl.isEmpty("foo");     // false
```

## Check how many values in an array are empty:
```javascript
jsl.isArrayEmpty(array<Array>); // returns true if all values in array are empty, false if none are empty. If only some are empty, will return integer value of how many they are

// examples:
jsl.isArrayEmpty(["", "", undefined, [], null, ""]); // true     (all are empty)
jsl.isArrayEmpty(["", "test", undefined, null]);     // 3        (three are empty)
jsl.isArrayEmpty([1, "test", [1, 2, 3]]);            // false    (none are empty)
```

## Log something to a file:
```javascript
jsl.logger(path<String>, content<String>, options<Object>); // logs the content to the file specified with path

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
jsl.error(error_message<String>, log_file_path<String>, shutdown<Boolean>, status<Number>); // will log a red error message to the console and shut down the process if argument shutdown is set to true. Can also log the error message to a specified log file (also optional)

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
jsl.generateUUID("xxxx-yyyy");    // 5a7f-ca19    (this is just an example, as normally the output is random)
jsl.generateUUID("x");            // 3            (can be scaled up and down how much you like)
jsl.generateUUID("$%?_x##");      // $%?_5##      (only x and y will be replaced)
```

## Test if all values in an array are equal:
```javascript
jsl.allEqual(array<Array>); // returns true if all values of the array are equal and false if not

// examples:
jsl.allEqual([1, 1, 1, 1, 9, 1]));    // false
jsl.allEqual([1, 1, 1, 1, 1, 1]));    // true
jsl.allEqual(["a", "b", "c"]));       // false
jsl.allEqual(["a", "a", "a"]));       // true
```

## Soft shutdown:
```javascript
jsl.softShutdown(funct<Function>); // funct gets executed before the script shuts down. This is useful to terminate connections or services gracefully before shutting down.

// example:
jsl.softShutdown(()=>{
    http_server.close();
    mysql.connection.end();
    console.log("Goodbye!");
});
```

## Prevent shutdown on `CTRL + C`:
```javascript
jsl.preventShutdown(); // this completely removes the ability to shut down the script with CTRL + C. It has to be killed within the script (using process.exit()) or with the task manager
```

## Random Range:
```javascript
jsl.randRange(min<Number>, max<Number>);    // returns a highly randomized number between the two specified boundaries
```

<br><br><br><br><br><br>

# Useful JSON objects:

## Read settings from settings.json file:
```javascript
jsl.settings; // this is an object that gets assigned the content of the settings.json file at the root directory.
```
Example what settings.json might look like:
```json
{
    "http_connection": {
        "url": "http://example.org/"
    }
}
```
Example of pulling data from the above example:
```javascript
jsl.settings.http_connection.url;    // = "http://example.org"
```

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

### Disclaimer:
This is the "corrected" npm version of my JSLib. I published the first one while not knowing how Node.js even works.<br>
This version is **NOT cross-compatible with v1.4.0**
