// These are the unit tests for JSLib
// You can run them with "npm test" in the root of JSLib
// As with most things, red means bad and green means good
// The parentheses tell you how many checks were successful - Example: (3 / 4) means 3 out of 4 checks for this function / class or object were successful
// The result shows the same thing, but adds up all the checks
// If you are colorblind, set the property "colorblind" of the below object to true (this will turn green into blue and red into purple)


const options = {
    colorblind: false,
    readdirRecursiveSync: {
        path: "." // if this project is opened from a slow drive, this path can be changed to a faster drive to speed up the unit tests - setting this to "." or ".." will make the unit tests always work but also slow them down a lot
    }
}


//#MARKER Init
const jsl = require("../JSLib");

var test = {seededRNG:{},generateUUID:{}};
var asyncTest = {};
var allResults = [];

const getColorblindColor = col => "\x1b[1m" + (options.colorblind ? (col == "green" ? "\x1b[34m" : "\x1b[33m") : (col == "green" ? "\x1b[32m" : "\x1b[31m"));

const logOk = (name, ok, res, indent) => {

console.log(`    ${indent === true ? "    " : ""}${ok.length == res.length ? getColorblindColor("green") : getColorblindColor("red")}\x1b[1m■\x1b[0m \
${name}: ${ok.length == res.length ? getColorblindColor("green") + "\x1b[1m" : getColorblindColor("red") + "\x1b[1m"}(${ok.length} / ${res.length})\x1b[0m \
${(ok.length != res.length && ok.length > 0) ? `- (${ok} ${ok.length == 1 ? "is" : "are"} ok)` : ""}`);

};


process.stdout.cursorTo = () => {};
process.stdout.clearLine = () => {};

console.clear();

console.log(`\n\n\x1b[36m\x1b[1mJSLib-npm - Unit Tests:\x1b[0m`);












//#MARKER Functions
console.log(`\x1b[33m\x1b[1m> Functions:\x1b[0m\n`);
test.isEmpty = () => {
    let res = [];
    let ok = [];
    if(jsl.isEmpty("") === true) // 0
        res.push(true);
    else res.push(false);
    if(jsl.isEmpty(NaN) === false) // 1
        res.push(true);
    else res.push(false);
    if(jsl.isEmpty(0) === false) // 2
        res.push(true);
    else res.push(false);
    if(jsl.isEmpty([]) === true) // 3
        res.push(true);
    else res.push(false);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("isEmpty", ok, res);
    allResults.push(...res);
}
test.isEmpty();


test.isArrayEmpty = () => {
    let res = [];
    let ok = [];
    if(jsl.isArrayEmpty([]) === true) // 0
        res.push(true);
    else res.push(false);

    if(jsl.isArrayEmpty([1, "", 3]) === 1) // 1
        res.push(true);
    else res.push(false);

    if(jsl.isArrayEmpty(["", ""]) === true) // 2
        res.push(true);
    else res.push(false);

    if(jsl.isArrayEmpty([1, 2, Symbol(), ["test"]]) === false) // 3
        res.push(true);
    else res.push(false);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("isArrayEmpty", ok, res);
    allResults.push(...res);
}
test.isArrayEmpty();


test.error = () => {
    let fs = require("fs");

    let res = [];
    let ok = [];
    

    try // 0
    {
        jsl.error(null);
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }

    jsl.error("1234", "./unittest-error-1.log", false, 0, false);
    if(fs.existsSync("./unittest-error-1.log")) // 1
    {
        res.push(true);
        fs.unlinkSync("./unittest-error-1.log");
    }
    else res.push(false);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("error", ok, res);
    allResults.push(...res);
}
test.error();


test.allEqual = () => {
    let res = [];
    let ok = [];


    if(jsl.allEqual([1, 1, 1, 1]) === true) // 0
        res.push(true);
    else res.push(false);

    if(jsl.allEqual([1, 2, 5]) === false) // 1
        res.push(true);
    else res.push(false);

    if(jsl.allEqual(["", "", Symbol()]) === false) // 2
        res.push(true);
    else res.push(false);

    try // 3
    {
        jsl.allEqual("I'm a teapot");
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("allEqual", ok, res);
    allResults.push(...res);
}
test.allEqual();


test.noShutdown = () => {
    let res = [];
    let ok = [];


    jsl.noShutdown();

    if(process.jsl && process.jsl.noShutdown === true) // 0
        res.push(true);
    else res.push(false);

    try // 1
    {
        jsl.noShutdown();
        res.push(true);
    }
    catch(err) // expected to succeed
    {
        res.push(false);
    }


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("noShutdown", ok, res);
    allResults.push(...res);
}
test.noShutdown();


test.yesShutdown = () => {
    let res = [];
    let ok = [];


    jsl.yesShutdown();

    process.jsl = undefined;
    jsl.yesShutdown();

    process.jsl = {};
    process.jsl.noShutdown = false;
    jsl.yesShutdown();

    if(process.jsl && process.jsl.noShutdown === false) // 0
        res.push(true);
    else res.push(false);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("yesShutdown", ok, res);
    allResults.push(...res);
}
test.yesShutdown();


test.readableArray = () => {
    let res = [];
    let ok = [];
    if(jsl.readableArray([1, 1, 1, 1]) === "1, 1, 1 and 1") // 0
        res.push(true);
    else res.push(false);

    if(jsl.readableArray(["foo", "bar"]) === `foo and bar`) // 1
        res.push(true);
    else res.push(false);

    if(jsl.readableArray(["foo", "bar", "baz"], "% ", "#") === `foo% bar#baz`) // 2
        res.push(true);
    else res.push(false);

    if(jsl.readableArray(["foo"], "|", "_") === `foo`) // 3
        res.push(true);
    else res.push(false);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("readableArray", ok, res);
    allResults.push(...res);
}
test.readableArray();


test.mapRange = () => {
    let res = [];
    let ok = [];


    if(jsl.mapRange(5, 0, 10, 0, 20) === 10) // 0
        res.push(true);
    else res.push(false);

    if(jsl.mapRange(70, 0, 100, 0, 20) === 14) // 1
        res.push(true);
    else res.push(false);

    if(jsl.mapRange(7, 5, 10, 0, 20) === 8) // 2
        res.push(true);
    else res.push(false);

    if(jsl.mapRange(3, 0, 4, 0, 10).toFixed(1) === 7.5.toFixed(1)) // 3
        res.push(true);
    else res.push(false);

    try // 4
    {
        jsl.mapRange(NaN, NaN, NaN, NaN, NaN);
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }

    try // 5
    {
        jsl.mapRange(0, 0, 0, 0, 0);
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("mapRange", ok, res);
    allResults.push(...res);
}
test.mapRange();


test.unused = () => {
    let res = [];
    let ok = [];


    let x = "test";
    let prevType = typeof x;

    jsl.unused(x);

    if(x === x && typeof x === prevType) // 0
        res.push(true);
    else res.push(false);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("unused", ok, res);
    allResults.push(...res);
}
test.unused();


test.replaceAt = () => {
    let res = [];
    let ok = [];

    if(jsl.replaceAt("foo", 1, "bar") === "fbaro") // 0
        res.push(true);
    else res.push(false);

    if(jsl.replaceAt("foo bar baz", 4, "test") === "foo testar baz") // 0
        res.push(true);
    else res.push(false);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("replaceAt", ok, res);
    allResults.push(...res);
}
test.replaceAt();


test.randRange = () => {
    let res = [];
    let ok = [];

    let randNums = [];

    for(let i = 0; i < 25; i++)
        randNums.push(jsl.randRange(0, 100000));
    
    let allEqual = true;
    randNums.forEach(n => {
        if(n != randNums[0])
            allEqual = false;
    });

    if(allEqual === false) // 0
        res.push(true);
    else res.push(false);

    try // 1
    {
        jsl.randRange(5, 4);
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }

    try // 2
    {
        jsl.randRange("Hello", "World");
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("randRange", ok, res);
    allResults.push(...res);
}
test.randRange();

test.randomizeArray = () => {
    let res = [];
    let ok = [];

    let initialArray = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
    let randomizedArray1 = jsl.randomizeArray(initialArray);
    let randomizedArray2 = jsl.randomizeArray(initialArray);


    if(initialArray != randomizedArray1) // 0
        res.push(true);
    else res.push(false);

    if(initialArray != randomizedArray2) // 1
        res.push(true);
    else res.push(false);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("randomizeArray", ok, res);
    allResults.push(...res);
}
test.randomizeArray();

test.removeDuplicates = () => {
    let res = [];
    let ok = [];

    let rdArray1 = jsl.removeDuplicates(["test", "foo", "bar", "test", "baz", 1, 2, 1, 3, 2]);
    let rdArray1expected = ["test", "foo", "bar", "baz", 1, 2, 3];
    
    let rdArray2 = jsl.removeDuplicates(["test", null, undefined, 1, 2, 3, "test"]);
    let rdArray2expected = ["test", null, undefined, 1, 2, 3, "test"]; // check is expected to fail


    if(rdArray1.length === rdArray1expected.length && rdArray1.every((u, i) => u === rdArray1expected[i])) // 0
        res.push(true);
    else res.push(false);

    if(rdArray2.length === rdArray2expected.length && rdArray2.every((u, i) => u === rdArray2expected[i])) // 1 - should fail
        res.push(false);
    else res.push(true);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("removeDuplicates", ok, res);
    allResults.push(...res);
}
test.removeDuplicates();


test.seededRNG.generateSeededNumbers = () => {
    let res = [];
    let ok = [];

    let seed1 = 1234567890;
    let expected1 = 8738205151;
    let seededNums1 = jsl.seededRNG.generateSeededNumbers(10, seed1).integer;

    let seed2 = 9876543210;
    let expected2 = 4105684652;
    let seededNums2 = jsl.seededRNG.generateSeededNumbers(10, seed2).integer;

    let seed3 = "invalid_seed";

    let seed4 = 20; // seed 20 causes special behavior since the generated seed starts with the number 0 so this needs to be tested here too
    let expected4 = 1340628001;
    let seededNums4 = jsl.seededRNG.generateSeededNumbers(10, seed4).integer;


    if(seededNums1 === expected1) // 0
        res.push(true);
    else res.push(false);

    if(seededNums2 === expected2) // 1
        res.push(true);
    else res.push(false);

    try // 2 - expected to fail
    {
        jsl.seededRNG.generateSeededNumbers(10, seed3);
        res.push(false);
    }
    catch(err)
    {
        res.push(true);
    }

    if(seededNums4 === expected4) // 3
        res.push(true);
    else res.push(false);

    // if default seed length of generateRandomSeed() is changed, remember to also change it here:
    if(jsl.seededRNG.generateSeededNumbers(1).seed.toString().length === 10) // 4
        res.push(true);
    else res.push(false);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("seededRNG.generateSeededNumbers", ok, res);
    allResults.push(...res);
}
test.seededRNG.generateSeededNumbers();


test.seededRNG.generateRandomSeed = () => {
    let res = [];
    let ok = [];

    let seed1 = jsl.seededRNG.generateRandomSeed(10).toString();
    let seed2 = jsl.seededRNG.generateRandomSeed(5).toString();


    if(seed1.toString().length == 10 && seed1.match(/[0-9]/g)) // 0
        res.push(true);
    else res.push(false);

    if(seed2.toString().length == 5 && seed2.match(/[0-9]/g)) // 1
        res.push(true);
    else res.push(false);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("seededRNG.generateRandomSeed", ok, res);
    allResults.push(...res);
}
test.seededRNG.generateRandomSeed();


test.seededRNG.validateSeed = () => {
    let res = [];
    let ok = [];

    let seeds = ["1234567890", "ab7d5fghij", "!ac5i.#", "182659182601825"];


    if(jsl.seededRNG.validateSeed(seeds[0]) === true) // 0
        res.push(true);
    else res.push(false);

    if(jsl.seededRNG.validateSeed(seeds[1]) === false) // 1
        res.push(true);
    else res.push(false);

    if(jsl.seededRNG.validateSeed(seeds[2]) === false) // 2
        res.push(true);
    else res.push(false);

    if(jsl.seededRNG.validateSeed(seeds[3]) === true) // 3
        res.push(true);
    else res.push(false);

    try // 4
    {
        jsl.seededRNG.validateSeed(null);
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("seededRNG.validateSeed", ok, res);
    allResults.push(...res);
}
test.seededRNG.validateSeed();


test.generateUUID.hexadecimal = () => {
    let res = [];
    let ok = [];

    let regex = /[a-fA-F0-9]/g;


    if(regex.test(jsl.generateUUID.hexadecimal("xxxxyyyyxxxxyyyy")) === true) // 0
        res.push(true);
    else res.push(false);

    if(jsl.generateUUID.hexadecimal("xxxxyyyy-^x-test").substr(8) === "-x-test") // 1
        res.push(true);
    else res.push(false);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("generateUUID.hexadecimal", ok, res);
    allResults.push(...res);
}
test.generateUUID.hexadecimal();


test.generateUUID.decimal = () => {
    let res = [];
    let ok = [];

    let regex = /[0-9]/g;


    if(regex.test(jsl.generateUUID.decimal("xxxxyyyyxxxxyyyy")) === true) // 0
        res.push(true);
    else res.push(false);

    if(jsl.generateUUID.decimal("xxxxyyyy-^x-test").substr(8) === "-x-test") // 1
        res.push(true);
    else res.push(false);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("generateUUID.decimal", ok, res);
    allResults.push(...res);
}
test.generateUUID.decimal();


test.generateUUID.alphanumerical = () => {
    let res = [];
    let ok = [];

    let regex = /[0-9A-Za-z]/g;


    if(regex.test(jsl.generateUUID.alphanumerical("xxxxyyyyxxxxyyyy")) === true) // 0
        res.push(true);
    else res.push(false);

    if(jsl.generateUUID.alphanumerical("xxxxyyyy-^x-test").substr(8) === "-x-test") // 1
        res.push(true);
    else res.push(false);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("generateUUID.alphanumerical", ok, res);
    allResults.push(...res);
}
test.generateUUID.alphanumerical();


test.generateUUID.binary = () => {
    let res = [];
    let ok = [];

    let regex = /[0-1]/g;


    if(regex.test(jsl.generateUUID.binary("xxxxyyyyxxxxyyyy")) === true) // 0
        res.push(true);
    else res.push(false);

    if(jsl.generateUUID.binary("xxxxyyyy-^x-test").substr(8) === "-x-test") // 1
        res.push(true);
    else res.push(false);

    try // 2
    {
        jsl.generateUUID.binary(null);
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }

    let valid3 = true;
    jsl.generateUUID.binary("xxxxyyyy", true).forEach(itm => {
        if(typeof itm !== "boolean")
            valid3 = false;
    });

    if(!valid3) // 3
        res.push(false);
    else res.push(true);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("generateUUID.binary", ok, res);
    allResults.push(...res);
}
test.generateUUID.binary();


test.generateUUID.custom = () => {
    let res = [];
    let ok = [];

    let regex = /[A-H0-4#+]/g;


    if(regex.test(jsl.generateUUID.custom("xxxxyyyyxxxxyyyy", "ABCDEFGH01234#+")) === true) // 0
        res.push(true);
    else res.push(false);

    if(jsl.generateUUID.custom("xxxxyyyy-^x-test", "ABCDEFGH01234#+").substr(8) === "-x-test") // 1
        res.push(true);
    else res.push(false);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("generateUUID.custom", ok, res);
    allResults.push(...res);
}
test.generateUUID.custom();


test.logger = () => {
    let fs = require("fs");

    let res = [];
    let ok = [];

    
    jsl.logger("./unittest-logger-1.log", "1234", {
        append_bottom: false,
        timestamp: false
    });

    if(fs.existsSync("./unittest-logger-1.log"))
    {
        if(fs.readFileSync("./unittest-logger-1.log").toString() == "1234") // 0
            res.push(true);
        else res.push(false);

        fs.unlinkSync("./unittest-logger-1.log");
    }
    else res.push(false);

    try // 1
    {
        jsl.logger("./unittest-logger-2.log", null);
        res.push(false);
    }
    catch(err) // expected to throw an error
    {
        res.push(true);
    }

    jsl.logger("./unittest-logger-3.log", "Hello, World!", {
        timestamp: true,
        append_bottom: true
    });

    if(fs.existsSync("./unittest-logger-3.log"))
    {
        res.push(true);

        fs.unlinkSync("./unittest-logger-3.log");
    }
    else res.push(false);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("logger", ok, res);
    allResults.push(...res);
}
test.logger();


test.readdirRecursiveSync = () => {
    let fs = require("fs");

    let res = [];
    let ok = [];

    if(!fs.existsSync(options.readdirRecursiveSync.path))
    {
        console.warn(`        \x1b[33m\x1b[1m>>> Warning: Path for "jsl.readdirRecursiveSync()" not found. Skipping...\x1b[0m`);
        res.push(true);
    }
    else
    {
        if(typeof jsl.readdirRecursiveSync(options.readdirRecursiveSync.path).length == "number" && jsl.readdirRecursiveSync("./").length > 0) // 0
            res.push(true);
        else res.push(false);
    }

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("readdirRecursiveSync", ok, res);
    allResults.push(...res);
}
test.readdirRecursiveSync();


test.inDebugger = () => {
    let res = [];
    let ok = [];

    if(jsl.inDebugger()) // 0
        res.push(false);
    else res.push(true);

    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });

    logOk("inDebugger", ok, res);
    allResults.push(...res);
}
test.inDebugger();













//#MARKER Classes
console.log(`\n\n\x1b[33m\x1b[1m> Classes:\x1b[0m\n`);


test.ProgressBar = () => {
    let res = [];
    let ok = [];


    let oldStdoutWrite = process.stdout.write;
    process.stdout.write = () => {};


    let pb = new jsl.ProgressBar(5, "b");
    pb.next("c");

    if(pb.getProgress() === 0.2) // 0
        res.push(true);
    else res.push(false);

    pb.next("d");

    if(pb.getRemainingIncrements() === 2) // 1
        res.push(true);
    else res.push(false);

    if(pb.progressDisplay === "■■───") // 2
        res.push(true);
    else res.push(false);

    pb.filledChar = "*";
    pb.next("e");

    if(pb.progressDisplay === "***──") // 3
        res.push(true);
    else res.push(false);

    pb.next("f");

    if(pb.iteration === 5) // 4
        res.push(true);
    else res.push(false);

    let onFinishWorks = false;
    pb.onFinish(() => {
        onFinishWorks = true;
    });
    
    pb.next("");

    if(pb.progressDisplay === "*****") // 5
        res.push(true);
    else res.push(false);

    if(pb.progressDisplay === "*****") // 6
        res.push(true);
    else res.push(false);

    if(onFinishWorks === true) // 7
        res.push(true);
    else res.push(false);

    try // 8
    {
        pb.onFinish();
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }


    process.stdout.write = oldStdoutWrite;


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });
    logOk("ProgressBar", ok, res);
    allResults.push(...res);
}
test.ProgressBar();



test.MenuPrompt = () => {
    let res = [];
    let ok = [];


    let oldStdoutWrite = process.stdout.write;
    process.stdout.write = () => {};


    let mp = new jsl.MenuPrompt({
        exitKey: "x",
        retryOnInvalid: true,
        autoSubmit: true
    });

    mp.localization.wrongOption = "unittest_xyz";

    mp.addMenu({
        title: "Hello World!",
        options: [
            {
                key: "1",
                description: "foo"
            },
            {
                key: "2",
                description: "bar"
            }
        ]
    });
    mp.open();

    mp.addMenu({
        title: "test",
        options: [
            {
                key: "1",
                description: "foo"
            }
        ]
    });

    mp.open();


    let mpres = mp.close();

    if(mp._active === false) // 0
        res.push(true);
    else res.push(false);

    if(mp._results === mpres) // 1
        res.push(true);
    else res.push(false);

    let m1 = {title: "test", options: [{key: "t", description: "g"}]};

    if(mp.addMenu(m1).startsWith("MenuPrompt was already closed")) // 2
        res.push(true);
    else res.push(false);

    if(mp.localization.wrongOption === "unittest_xyz") // 3
        res.push(true);
    else res.push(false);

    let invalidValidation = mp.validateMenu({
        title: null,
        options: [
            {
                key: undefined,
                description: Infinity
            },
            []
        ]
    });
    if(Array.isArray(invalidValidation) && invalidValidation.length === 6) // 4
        res.push(true);
    else res.push(false);

    try // 5
    {
        mp.validateMenu();
        res.push(false);
    }
    catch(err) // expected to fail
    {
        res.push(true);
    }

    try // 6
    {
        mp.result();
        res.push(true);
    }
    catch(err) // not expected to fail
    {
        res.push(false);
    }

    if(typeof mp.addMenu(null) === "string") // 7
        res.push(true);
    else res.push(false);


    process.stdout.write = oldStdoutWrite;


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });
    logOk("MenuPrompt", ok, res);
    allResults.push(...res);
}
test.MenuPrompt();













//#MARKER Objects
console.log(`\n\n\x1b[33m\x1b[1m> Objects:\x1b[0m\n`);


test.info = () => {
    let packageJSON = require("../package.json");

    let res = [];
    let ok = [];


    if(jsl.info.intVersion.length === 3) // 0
        res.push(true);
    else res.push(false);

    if(typeof jsl.info.contributors === "object" && Array.isArray(jsl.info.contributors)) // 1
        res.push(true);
    else res.push(false);

    if(jsl.info.license.startsWith(packageJSON.license.split(" ")[0])) // 2
        res.push(true);
    else res.push(false);

    if(jsl.info.author.startsWith(packageJSON.author.name)) // 3
        res.push(true);
    else res.push(false);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });
    logOk("info", ok, res);
    allResults.push(...res);
}
test.info();


test.colors = () => {
    let res = [];
    let ok = [];


    if(jsl.colors.rst === "\x1b[0m") // 0
        res.push(true);
    else res.push(false);

    if(Object.keys(jsl.colors.fg).length != 0) // 1
        res.push(true);
    else res.push(false);

    if(Object.keys(jsl.colors.bg).length != 0) // 2
        res.push(true);
    else res.push(false);


    res.forEach((r, i) =>{
        if(r) ok.push(i);
    });
    logOk("colors", ok, res);
    allResults.push(...res);
}
test.colors();













//#MARKER async
asyncTest.ping = () => {
    return new Promise((resolve) => {
        let res = [];
        let ok = [];

        try // 0
        {
            jsl.ping(null);
            res.push(false);
        }
        catch(err) // expected to fail
        {
            res.push(true);
        }

        let pingURLmalformatted = `http:example org`;
        try // 1
        {
            jsl.ping(pingURLmalformatted);
            res.push(false);
        }
        catch(err) // expected to fail
        {
            res.push(true);
        }

        let pingURLsuccess = "http://www.example.org/";
        let pingURLfail = `https://www.sv443.net/i_should_return_404`;

        jsl.ping(pingURLsuccess, 10).then(retV => {
            if(retV.statusCode < 400) // 2
                res.push(true);
            else res.push(false);

            jsl.ping(pingURLfail).then(retV2 => {
                if(retV2.statusCode >= 400) // 3
                    res.push(true);
                else res.push(false);

                res.forEach((r, i) =>{
                    if(r) ok.push(i);
                });
            
                logOk("ping", ok, res);
                allResults.push(...res);
    
                return resolve();
            });
        });
    });
}


asyncTest.downloadFile = () => {
    return new Promise((resolve) => {
        let res = [];
        let ok = [];

        let finishDL = () => {
            res.forEach((r, i) =>{
                if(r) ok.push(i);
            });
        
            logOk("downloadFile", ok, res);
            allResults.push(...res);

            let fs = require("fs");
            if(fs.existsSync("./example.html"))
                fs.unlinkSync("./example.html");

            return resolve();
        };

        let downloadFileUrl = "https://www.example.org/";

        jsl.downloadFile(downloadFileUrl, "./", {
            fileName: "example.html",
            finishedCallback: (err) => {
                if(err) // 0
                    res.push(false);
                else res.push(true);

                let continueWith2 = () => {
                    jsl.downloadFile("https://google.com/", "./", { // URL is a 301 redirect
                        fileName: "example.html",
                        finishedCallback: (err) => {
                            if(err) // 2
                                res.push(false);
                            else res.push(true);

                            jsl.downloadFile("https://www.google.com/this-page-doesnt-exist-jslunittests-1234567", "./", { // URL is a 301 redirect
                                fileName: "example.html",
                                finishedCallback: (err) => {
                                    if(err) // 2
                                        res.push(true);
                                    else res.push(false);

                                    return finishDL();
                                }
                            });
                        }
                    });
                };

                // 1
                jsl.downloadFile(downloadFileUrl, "./i-do-not-exist-1234567/", {
                    fileName: "example.html",
                    finishedCallback: () => {
                        res.push(false);
                        continueWith2();
                    }
                }).catch(() => {
                    res.push(true); // expected to fail
                    continueWith2();
                });
            }
        });
    });
}


asyncTest.readdirRecursive = () => {
    return new Promise((resolve) => {
        let res = [];
        let ok = [];

        jsl.readdirRecursive("./", (err, result) => {
            if(err) // 0
                res.push(false);
            else res.push(true);

            if(!err && Array.isArray(result)) // 1
                res.push(true);
            else res.push(false);

            res.forEach((r, i) =>{
                if(r) ok.push(i);
            });
        
            logOk("readdirRecursive", ok, res);
            allResults.push(...res);

            return resolve();
        });
    });
}



let runAsyncTests = () => {
    return new Promise((resolve, reject) => {
        let promises = [];
        Object.keys(asyncTest).forEach(key => {
            promises.push(asyncTest[key]());
        });

        console.log(`\n\n\x1b[33m\x1b[1m> Async Tests:\x1b[0m\n`);
        Promise.all(promises).then(() => {
            return resolve();
        }).catch(err => {
            return reject(err);
        });
    });
};

runAsyncTests().then(() => {
    //#MARKER End
    let allTrue = 0;
    let allFalse = 0;
    allResults.forEach(res => {
        if(res) allTrue++;
        if(!res) allFalse++;
    });

    console.log(`\n\n\n\x1b[36m\x1b[1m════════════════════════════════════════════════\x1b[0m\n`);
    console.log(`${allTrue == allTrue + allFalse ? getColorblindColor("green") : getColorblindColor("red")}\x1b[1m►>\x1b[0m  Result:\x1b[0m ${allTrue == allTrue + allFalse ? getColorblindColor("green") + "\x1b[1m" : getColorblindColor("red") + "\x1b[1m"}${allTrue} / ${allTrue + allFalse}\x1b[0m${allFalse > 0 ? `  ${getColorblindColor("red")}\x1b[1m(${allFalse} failed)\x1b[0m` : `  ${getColorblindColor("green")}\x1b[1m(success)\x1b[0m`}`);
    console.log(`\n\x1b[36m\x1b[1m════════════════════════════════════════════════\x1b[0m`);

    if(allTrue < allFalse)
        process.exit(1);
    else process.exit(0);
});
