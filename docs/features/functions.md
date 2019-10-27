# isEmpty()
> Checks whether or not a variable is considered "empty" (equal to null, undefined, an empty String or an object with length = 0).  
> This is especially useful for checking for empty user input.  
> ```js
> jsl.isEmpty(input: Any) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.isEmpty("");        // true
> jsl.isEmpty(5);         // false
> jsl.isEmpty([]);        // true
> jsl.isEmpty(undefined); // true
> jsl.isEmpty(null);      // true
> jsl.isEmpty(NaN);       // false (NaN is not considered empty!)
> jsl.isEmpty("foo");     // false
> jsl.isEmpty(0);         // false (0 is also not considered empty!)
> ```
> 
> </details>

<br><br><br><br>



# isArrayEmpty()
> Does the check that [isEmpty()](#isempty) does but on each item of an array.  
> Returns the "emptiness" of the array (true, if all items are empty, false if none are empty and a Number, if only some of the items are empty).  
> ```js
> jsl.isArrayEmpty(array: Array<Any>) -> (Boolean|Number)
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.isArrayEmpty(["", "", undefined, [], null, ""]); // true   (all are empty)
> jsl.isArrayEmpty(["", "test", undefined, null]);     // 3      (three are empty)
> jsl.isArrayEmpty([1, "test", [1, 2, 3]]);            // false  (none are empty)
> ```
> 
> </details>

<br><br><br><br>



# error()
> Logs a red error message to the console and optionally to a log file. Can also shut down the process if specified.  
> ```js
> jsl.error(cause: String, [log_file_path: String], [shutdown: Boolean], [status: Number]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> let options = {
>     append_bottom: true,  // true = appends to the bottom of the file, false = overwrites whole file content (default: true)
>     timestamp: true       // true = adds timestamp to the content, false = doesn't add timestamp (default: false)
> }
> 
> jsl.error("Fatal error encountered.", "./error.log", true, 1); // logs error message to console, logs error message to log file and shuts down script with status code 1 (crashed)
> jsl.error("Couldn't start listener. Trying again...");         // just logs error message. Script keeps running
> ```
> 
> </details>

<br><br><br><br>



# allEqual()
> Checks whether or not all items of an array are equal.  
> ```js
> jsl.allEqual(array: Array<Any>) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.allEqual([1, 1, 1, 1, 9, 1]); // false
> jsl.allEqual([1, 1, 1, 1, 1, 1]); // true
> jsl.allEqual(["a", "b", "c"]);    // false
> jsl.allEqual(["a", "a", "a"]);    // true
> ```
> 
> </details>

<br><br><br><br>



# softShutdown()
> Synchronously executes a function before the process shuts down. Triggers on the signals "SIGINT", "SIGTERM" and "SIGKILL".  
> Exit code will default to 0 if left empty.  
> ```js
> jsl.softShutdown(funct: Function, [code: Number]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.softShutdown(()=>{
>     fs.writeFileSync("./logs/shutdown.log", `[${new Date().getTime()}] Process was shut down\n`);
>     console.log("\n\nGoodbye!\n");
> });
> ```
> 
> </details>

<br><br><br><br>



# noShutdown()
> Prevents the process from being shut down. Triggers on the "SIGINT" and "SIGTERM" signals.  
> Use [yesShutdown()](#yesshutdown) to remove the shutdown prevention.  
> ```js
> jsl.noShutdown() -> void
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.noShutdown();
> ```
> Then, try exiting the process with `^C` (CTRL + C).
> 
> </details>

<br><br><br><br>



# yesShutdown()
> Removes the shutdown prevention that has been set up with [noShutdown()](#noshutdown).  
> ```js
> jsl.yesShutdown() -> void
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.yesShutdown();
> ```
> Then, try exiting the process with `^C` (CTRL + C).
> 
> </details>

<br><br><br><br>



# readableArray()
> Turns an array into a better readable one, with customizable separators.  
> The `separators` parameter defaults to `, ` and the `lastSeparator` parameter defaults to ` and `.  
> ```js
> jsl.readableArray(array: Array<Any>, [separators: String, lastSeparator: String]) -> String
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var array = [1, 2, 3, 4, 5, 6];
> 
> jsl.readableArray(array);           // 1, 2, 3, 4, 5 and 6
> jsl.readableArray(array, "|", "*"); // 1|2|3|4|5*6
> ```
> 
> </details>

<br><br><br><br>



# mapRange()
> Transforms a value of one numerical range to a value of another numerical range.  
> ```js
> jsl.mapRange(value: Number, range_1_min: Number, range_1_max: Number, range_2_min: Number, range_2_max: Number) -> Number
> ```
> 
> **<details><summary>Example</summary>**
> 
> Turn any value with a known minimum and maximum value into a percentage:
> ```js
> var inputValue = 1926;
> var result = jsl.mapRange(inputValue, 0, 4600, 0, 100);
> 
> console.log(result);                   // 41.869565217391305
> console.log(Math.round(result) + "%"); // 42%
> ```
> 
> </details>

<br><br><br><br>



# unused()
> Indicates an unused variable to a linter without modifying the variable.  
> ```js
> jsl.unused(any_var: Any) -> void
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var foo = "I am an unused variable";
> jsl.unused(foo);
> ```
> 
> </details>

<br><br><br><br>



# replaceAt()
> Replaces a character at the specified index of a string with another string.  
> ```js
> jsl.replaceAt(input: String, index: Number, replacement: String) -> String
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.replaceAt("Hello World!", 5, " foo "); // Hello foo World!
> jsl.replaceAt("012345", 3, "_");           // 012_45
> ```
> 
> </details>

<br><br><br><br>



# randRange()
> Generates highly randomized numbers from a passed numerical range.  
> ```js
> jsl.randRange(min: Number, max: Number) -> Number
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.randRange(5, 10); // 8
> jsl.randRange(1, 10); // 4
> jsl.randRange(9, 10); // 10
> jsl.randRange(-7, 0); // -4
> ```
> 
> </details>

<br><br><br><br>



# randomizeArray()
> Randomizes the items inside an array and returns it.  
> ```js
> jsl.randomizeArray(array: Array<Any>) -> Array
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var array = [1, 2, 3, 4, 5, 6];
> jsl.randomizeArray(array); // [ 5, 2, 1, 6, 3, 4 ]
> ```
> 
> </details>

<br><br><br><br>



# seededRNG.generateSeededNumbers()
> Generates a set of numbers based on a seed. As long as the seed stays the same, the random numbers will be the same, no matter when and how the function is executed.  
> If no `seed` parameter is provided, a random seed will be generated using [seededRNG.generateRandomSeed()](#seededrng-generaterandomseed) and passed in the returned object. The seed needs to be a number that can't start with the digit `0`.  
> The `count` parameter dictates how many numbers will be generated (defaults to 16).  
> ```js
> jsl.seededRNG.generateSeededNumbers([count: Number, seed: Number]) -> Object
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var foo = jsl.seededRNG.generateSeededNumbers(5, 12345);
> var bar = jsl.seededRNG.generateSeededNumbers(5, 12345);
>
> console.log(JSON.stringify(foo) === JSON.stringify(bar)); // true
> 
> console.log(foo); // (see below)
> ```
>
> This is how the returned object might look like:
> ```json
> {
>     "numbers": [ 8, 3, 1, 7, 3 ],
>     "stringified": "83173",
>     "integer": 83173,
>     "seed": 12345
> }
> ```
> 
> </details>

<br><br><br><br>



# seededRNG.generateRandomSeed()
> Generates a random seed to be used in [seededRNG.generateSeededNumbers()](#seededrng.generateseedednumbers).  
> This function also enforces that the seed doesn't start with the digit `0`, which is necessary in [seededRNG.generateSeededNumbers()](#seededrng.generateseedednumbers).  
> ```js
> jsl.seededRNG.generateRandomSeed(digitCount: Number) -> Number
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var seed = jsl.seededRNG.generateRandomSeed(5);
> 
> console.log(seed); // 35091
> ```
> 
> </details>

<br><br><br><br>



# seededRNG.validateSeed()
> Checks whether or not a seed is valid. This can be used for validating user entered seeds.  
> A seed has to start with a digit that is not `0` and has to be numerical but can also be of type `string`.  
> (The seed has to match this regex: `/^[0-9]{SEED_DIGIT_COUNT}/gm` and can't contain newline characters).  
> ```js
> jsl.seededRNG.validateSeed(seed: Number|String) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var foo = jsl.seededRNG.validateSeed(35091);
> var bar = jsl.seededRNG.validateSeed("35091");
> var baz = jsl.seededRNG.validateSeed("hello I am a string");
>
> console.log(foo); // true
> console.log(bar); // true
> console.log(baz); // false
> ```
> 
> </details>

<br><br><br><br>



# generateUUID.hexadecimal()
> Generates a hexadecimal `[0-9,a-f/A-F]` UUID based on a format string.  
> The UUID will be generated from the format string, where all `x` and `y` characters will be replaced by a hexadecimal digit.  
> To have a `x` or `y` character not be replaced, prefix it with `^`.  
> If you want the alphabetical characters to be in upper case, set the `upperCase` parameter to `true`. It will default to `false`.  
> ```js
> jsl.generateUUID.hexadecimal(uuidFormat: String, [upperCase: Boolean]) -> String
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var foo = jsl.generateUUID.hexadecimal("xxxx-yyyy-^x^x^y^y");
> var bar = jsl.generateUUID.hexadecimal("HELLOWORLD^x^xxxxxyyyy", true);
> 
> console.log(foo); // 9b9f-7a1c-xxyy
> console.log(bar); // HELLOWORLDxx06BB367E
> ```
> 
> </details>

<br><br><br><br>



# generateUUID.decimal()
> Generates a decimal `[0-9]` UUID based on a format string.  
> The UUID will be generated from the format string, where all `x` and `y` characters will be replaced by a decimal digit.  
> To have a `x` or `y` character not be replaced, prefix it with `^`.  
> ```js
> jsl.generateUUID.decimal(uuidFormat: String) -> String
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var uuid = jsl.generateUUID.decimal("xxxx-yyyy-^x^y");
> 
> console.log(uuid); // 7131-5969-xy
> ```
> 
> </details>

<br><br><br><br>



# generateUUID.alphanumerical()
> Generates an alphanumerical `[0-9,a-z/A-Z]` UUID based on a format string.  
> The UUID will be generated from the format string, where all `x` and `y` characters will be replaced by an alphanumerical digit.  
> To have a `x` or `y` character not be replaced, prefix it with `^`.  
> ```js
> jsl.generateUUID.alphanumerical(uuidFormat: String, [upperCase: Boolean]) -> String
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var foo = jsl.generateUUID.alphanumerical("xxxx-yyyy-^x^y");
> var bar = jsl.generateUUID.alphanumerical("test-xxxx-yyyy-^x^y", true);
> 
> console.log(foo); // z7jd-6efb-xy
> console.log(bar); // test-HR91-NUQ7-xy
> ```
> 
> </details>

<br><br><br><br>



# generateUUID.binary()
> Generates a binary `[0-1]` UUID based on a format string.  
> The UUID will be generated from the format string, where all `x` and `y` characters will be replaced by a binary digit.  
> To have a `x` or `y` character not be replaced, prefix it with `^`.  
> ```js
> jsl.generateUUID.binary(uuidFormat: String) -> String
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var uuid = jsl.generateUUID.binary("xxxx-yyyy-^x^y");
> 
> console.log(uuid); // 1101-0011-xy
> ```
> 
> </details>

<br><br><br><br>



# generateUUID.custom()
> Generates a UUID with a custom charset based on a format string.  
> The UUID will be generated from the format string, where all `x` and `y` characters will be replaced by a random digit of the `possibleValues` string.  
> To have a `x` or `y` character not be replaced, prefix it with `^`.  
> ```js
> jsl.generateUUID.custom(uuidFormat: String, possibleValues: String) -> String
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var foo = jsl.generateUUID.custom("xxxxyyyyxxxxyyyy-^x^y", "ABab!?_#*");
> var bar = jsl.generateUUID.custom("xxxxyyyyxxxxyyyy-^x^y", "12"); // why not create a new binary system using 1 and 2 👀
>
> console.log(foo); // ?a#_#bA*?a#b!*A#-xy
> console.log(bar); // 2121222121212121-xy
> ```
> 
> </details>

<br><br><br><br>



# ping()
> Pings a URL and returns the status code, MIME type, content encoding and response time.  
> `timeout` is the maximum time (in milliseconds) after which a request will be canceled.  
> ```js
> jsl.ping(url: String, [timeout: Number]) -> Promise<Object>
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.ping("https://example.org/", 10000).then(res => {
>     console.log(res); // (see below)
> }).catch(err => {
>     console.log(err); // this should only happen in the rarest of cases - a request with status 4xx or 5xx is still considered a successful request
> });
> ```
> This is how the resulting object might look like:
> ```json
> {
>     "statusCode": 200,
>     "statusMessage": "OK",
>     "responseTime": 498,
>     "contentType": "text/html; charset=UTF-8"
> }
> ```
> 
> </details>

<br><br><br><br>



# downloadFile()
> Downloads a file from a URL. This can download absolutely anything, from an HTML website to a ZIP file.  
> This function uses callbacks to inform you of the download progress (every 50 milliseconds) and once the download is finished.  
> This download process is very efficient and doesn't cost a lot of RAM.  
> The passed object (in the progress callback) will contain the current and total sizes, each in bytes, kilobytes and megabytes.  
> A small file paired with a good internet connection will not trigger a progress callback, but the finished callback will always be triggered at the end of the download process, no matter what.  
> The `destPath` parameter will default to `./` (root directory of the process) if left empty.  
> I recommend using [mapRange()](#maprange) here to convert the current and total sizes into a percentage value, like shown in the example below.  
> ⚠️ WARNING ⚠️ If the webserver didn't respond with a content size, the total size properties will not exist on the progress callback object.  
> ```js
> jsl.downloadFile(url: String, [destPath: String, options: Object]) -> void
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var options = {
>     fileName: "download.html",
>     finishedCallback: (err) => {
>         // will be called when the download is finished or got canceled
>         if(!err)
>             console.log("Finished");
>         else
>             console.log(`Error! ${err}`);
>     },
>     progressCallback: (progress) => {
>         // this will be called every 50 milliseconds
>         console.log(`Downloading [${progress.currentMB}MB / ${progress.totalMB}MB] - (${jsl.mapRange(progress.currentMB, 0, progress.totalMB, 0, 100).toFixed(1)}%)`);
>     }
> };
>
> jsl.downloadFile("https://example.org/", "./", options);
> ```
> The object that's passed in `progressCallback` might look something like this:
> ```json
> {
>     "currentB": 1013,
>     "currentKB": 1.013,
>     "currentMB": 0.001,
>     "totalB": 1256,
>     "totalKB": 1.256,
>     "totalMB": 0.001
> }
> ```
> ⚠️ Like stated above, if the webserver doesn't provide a content size, the `totalB`, `totalKB` and `totalMB` properties will not be present in this object. ⚠️
> 
> </details>

<br><br><br><br>



# logger()
> Logs a string to a file with an optional timestamp.  
> Make sure beforehand that the file you're logging to exists, else an error will be thrown.  
> ```js
> jsl.logger(path: String, content: String [options: Object]) -> void
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var path = "./logs/error.log";
> var error = "Error XY was encountered";
> var options = {
>     append_bottom: false, // true = just append to the file's bottom - false = overwrite the entire file
>     timestamp: true       // true = prefix a timestamp to each line - false = don't prefix a timestamp
> };
>
> jsl.logger(path, error);          // Appends the error message to the file and doesn't include a timestamp
> jsl.logger(path, error, options); // Overwrites the entire file with the error message but includes a timestamp
> ```
> 
> </details>

<br><br><br><br>



# readdirRecursive()
> Asynchronously and recursively reads a directory, calling a callback function with an array of all subdirectories and files that were found in that directory.  
> Note that the resulting array is not sorted in any way and the files could be randomly indexed.  
> ```js
> jsl.readdirRecursive(folder: String, callback: Function) -> void
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.readdirRecursive("C:/Users/Sv443/Desktop/test", (err, res) => {
>     if(!err)
>         console.log(res); // (see below)
>     else
>         console.log(`Error! ${err}`);
> });
> ```
> The resulting array might look something like this:
> ```json
> [
>     "C:\\Users\\Sv443\\Desktop\\test\\folder1\\foo.txt",
>     "C:\\Users\\Sv443\\Desktop\\test\\folder1\\bar.zip",
>     "C:\\Users\\Sv443\\Desktop\\test\\folder2\\baz.bin",
>     "C:\\Users\\Sv443\\Desktop\\test\\hello world.txt"
> ]
> ```
> 
> </details>

<br><br><br><br>



# readdirRecursiveSync()
> Does the same thing as [readdirRecursive](#readdirrecursive), but synchronously.  
> ⚠️ I recommend using the [asynchronous approach](#readdirrecursive) as this function can halt your process for quite a while depending on the directory size ⚠️  
>   
> Synchronously and recursively reads a directory, returning an array of all subdirectories and files that were found in that directory.  
> Note that the resulting array is not sorted in any way and the files could be randomly indexed.  
>
> ```js
> jsl.readdirRecursiveSync(folder: String) -> Array<String>
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> var result = jsl.readdirRecursiveSync("C:/Users/Sv443/Desktop/test");
> 
> console.log(result); // (see below)
> ```
> The resulting array might look something like this:
> ```json
> [
>     "C:\\Users\\Sv443\\Desktop\\test\\folder1\\bar.zip",
>     "C:\\Users\\Sv443\\Desktop\\test\\folder1\\foo.txt",
>     "C:\\Users\\Sv443\\Desktop\\test\\folder2\\baz.bin",
>     "C:\\Users\\Sv443\\Desktop\\test\\hello world.txt"
> ]
> ```
> 
> </details>

<br><br><br><br>



