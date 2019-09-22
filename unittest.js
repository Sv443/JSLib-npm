const jsl = require("./JSLib");
var test = {};
const logOk = (name, ok, res) => console.log(`    ${ok.length == res.length ? "\x1b[32m\x1b[1m✓ \x1b[0m" : "\x1b[31m\x1b[1m✗ \x1b[0m"}${name}: ${ok.length == res.length ? "\x1b[32m\x1b[1m" : "\x1b[31m\x1b[1m"}(${ok.length} / ${res.length})\x1b[0m ${ok.length == res.length ? "" : `- (${ok})`}`);

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

    res.forEach((r, i) => r === true ? ok.push(i) : null);

    logOk("isEmpty", ok, res);
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

    res.forEach((r, i) => r === true ? ok.push(i) : null);

    logOk("isArrayEmpty", ok, res);
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

    res.forEach((r, i) => r === true ? ok.push(i) : null);

    logOk("allEqual", ok, res);
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

    res.forEach((r, i) => r === true ? ok.push(i) : null);

    logOk("readableArray", ok, res);
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

    res.forEach((r, i) => r === true ? ok.push(i) : null);

    logOk("mapRange", ok, res);
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

    res.forEach((r, i) => r === true ? ok.push(i) : null);

    logOk("unused", ok, res);
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

    res.forEach((r, i) => r === true ? ok.push(i) : null);

    logOk("replaceAt", ok, res);
}
test.replaceAt();






//#MARKER Classes
console.log(`\n\n\x1b[33m\x1b[1m> Classes:\x1b[0m\n`);










//#MARKER Objects
console.log(`\n\n\x1b[33m\x1b[1m> Objects:\x1b[0m\n`);











console.log(`\n\x1b[36m\x1b[1m==================================\x1b[0m`);