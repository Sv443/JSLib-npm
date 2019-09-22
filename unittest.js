// These are the unit tests for JSLib
// You can run them with "npm run test" in the root of JSLib

const jsl = require("./JSLib");
var test = {};
var allResults = [];
const logOk = (name, ok, res) => console.log(`    ${ok.length == res.length ? "\x1b[32m\x1b[1m█ \x1b[0m" : "\x1b[31m\x1b[1m█ \x1b[0m"}${name}: ${ok.length == res.length ? "\x1b[32m\x1b[1m" : "\x1b[31m\x1b[1m"}(${ok.length} / ${res.length})\x1b[0m ${(ok.length != res.length && ok.length > 0) ? `- (${ok} are ok)` : ""}`);
const doNothing = () => {};

console.log(`\x1b[36m\x1b[1mJSLib-npm - Unit Tests:\x1b[0m`);
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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

    logOk("isArrayEmpty", ok, res);
    allResults.push(...res);
}
test.isArrayEmpty();


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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

    logOk("allEqual", ok, res);
    allResults.push(...res);
}
test.allEqual();


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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

    logOk("mapRange", ok, res);
    allResults.push(...res);
}
test.mapRange();


test.unused = () => {
    let res = [];
    let ok = [];

    let x = "test";
    jsl.unused(x);
    if(x === x) // 0
        res.push(true);
    else res.push(false);

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

    logOk("replaceAt", ok, res);
    allResults.push(...res);
}
test.replaceAt();






//#MARKER Classes
console.log(`\n\n\x1b[33m\x1b[1m> Classes:\x1b[0m\n`);










//#MARKER Objects
console.log(`\n\n\x1b[33m\x1b[1m> Objects:\x1b[0m\n`);









let allTrue = 0;
let allFalse = 0;
allResults.forEach(res => {
    if(res) allTrue++;
    if(!res) allFalse++;
})
console.log(`\n\n\x1b[35m\x1b[1m>> Result:\x1b[0m ${allTrue} / ${allTrue + allFalse}${allFalse > 0 ? `  \x1b[31m\x1b[1m(${allFalse} false)\x1b[0m` : ""}`);
console.log(`\n\x1b[36m\x1b[1m==================================\x1b[0m`);