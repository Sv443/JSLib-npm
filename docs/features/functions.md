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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



# softShutdown()
> Synchronously executes a function before the process shuts down. Triggers on the signals "SIGINT", "SIGTERM" and "SIGKILL". Exit code will default to 0 if left empty.  
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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>



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

<br><br><br><br><br><br><br><br><br><br><br>


<!-- TODO: -->
# seededRNG.generateSeededNumbers()
> Generates a set of numbers based on a seed. As long as the seed stays the same, the random numbers will be the same, no matter when and how the function is executed.  
> ```js
> jsl.seededRNG.generateSeededNumbers(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.seededRNG.generateSeededNumbers();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# func()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# func()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# func()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# func()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# func()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# func()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# generateUUID.custom()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# func()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# downloadFile()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# func()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# func()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



# readdirRecursiveSync()
> Description  
> ```js
> jsl.func(param: Number, [param2: String]) -> Boolean
> ```
> 
> **<details><summary>Example</summary>**
> 
> ```js
> jsl.foo();
> ```
> 
> </details>

<br><br><br><br><br><br><br><br><br><br><br>



