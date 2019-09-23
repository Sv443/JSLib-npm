// These are the unit tests for JSLib
// You can run them with "npm run test" in the root of JSLib

const jsl = require("./JSLib");
var test = {seededRNG:{},generateUUID:{}};
var allResults = [];
const logOk = (name, ok, res, indent) => console.log(`    ${indent === true ? "    " : ""}${ok.length == res.length ? "\x1b[32m\x1b[1m█ \x1b[0m" : "\x1b[31m\x1b[1m█ \x1b[0m"}${name}: ${ok.length == res.length ? "\x1b[32m\x1b[1m" : "\x1b[31m\x1b[1m"}(${ok.length} / ${res.length})\x1b[0m ${(ok.length != res.length && ok.length > 0) ? `- (${ok} ${ok.length == 1 ? "is" : "are"} ok)` : ""}`);
const doNothing = () => {};



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


test.noShutdown = () => {
    let res = [];
    let ok = [];
    

    jsl.noShutdown();

    if(process.jsl != undefined && process.jsl.noShutdown === true) // 0
        res.push(true);
    else res.push(false);


    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

    logOk("noShutdown", ok, res);
    allResults.push(...res);
}
test.noShutdown();


test.yesShutdown = () => {
    let res = [];
    let ok = [];
    

    jsl.yesShutdown();
    
    if(process.jsl != undefined && process.jsl.noShutdown === false) // 0
        res.push(true);
    else res.push(false);


    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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


test.randRange = () => {
    let res = [];
    let ok = [];

    let randNums = [];

    for(let i = 0; i < 25; i++)
        randNums.push(jsl.randRange(0, 10000));
    
    let allEqual = true;
    randNums.forEach(n => {
        if(n != randNums[0])
            allEqual = false;
    });

    if(allEqual === false) // 0
        res.push(true);
    else res.push(false);

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

    logOk("randRange", ok, res);
    allResults.push(...res);
}
test.randRange();


test.randomizeArray = () => {
    let res = [];
    let ok = [];

    let initialArray = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
    let randomizedArray = jsl.randomizeArray(initialArray);
    
    let allEqual = true;
    initialArray.forEach((n, i) => {
        if(n != randomizedArray[i])
            allEqual = false;
    });

    if(allEqual === false) // 0
        res.push(true);
    else res.push(false);

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

    logOk("randomizeArray", ok, res);
    allResults.push(...res);
}
test.randomizeArray();


test.seededRNG.generateSeededNumbers = () => {
    let res = [];
    let ok = [];

    let seed1 = 1234567890;
    let expected1 = 8738205151;
    let seededNums1 = jsl.seededRNG.generateSeededNumbers(10, seed1).integer;

    let seed2 = 9876543210;
    let expected2 = 4105684652;
    let seededNums2 = jsl.seededRNG.generateSeededNumbers(10, seed2).integer;


    if(seededNums1 === expected1) // 0
        res.push(true);
    else res.push(false);

    if(seededNums2 === expected2) // 1
        res.push(true);
    else res.push(false);

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

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

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

    logOk("generateUUID.custom", ok, res);
    allResults.push(...res);
}
test.generateUUID.custom();


test.readdirRecursiveSync = () => {
    let res = [];
    let ok = [];


    if(typeof jsl.readdirRecursiveSync("./src/objects").length == "number" && jsl.readdirRecursiveSync("./").length > 0) // 0
        res.push(true);
    else res.push(false);

    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());

    logOk("readdirRecursiveSync", ok, res);
    allResults.push(...res);
}
test.readdirRecursiveSync();





//#MARKER Classes
console.log(`\n\n\x1b[33m\x1b[1m> Classes:\x1b[0m\n`);


class ProgressBarUnitTest extends jsl.ProgressBar {
    constructor(a, b) {super(a, b);}
    _update(){return;}
}

test.ProgressBar = () => {
    let res = [];
    let ok = [];


    let pb = new ProgressBarUnitTest(5, "b");
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

    pb.next("g");

    if(pb.progressDisplay === "*****") // 5
        res.push(true);
    else res.push(false);

    if(pb.progressDisplay === "*****") // 6
        res.push(true);
    else res.push(false);


    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());
    logOk("ProgressBar", ok, res);
    allResults.push(...res);
}
test.ProgressBar();


class MenuPromptUnitTest extends jsl.MenuPrompt {
    constructor(a, b) {super(a, b);}
    _clearConsole() {return;}
    open()
    {
        let isEmpty = require("./src/functions/isEmpty");
        let col = require("./src/objects/colors");

        if(isEmpty(this._menus))
            return `No menus were added to the MenuPrompt object. Please use the method "MenuPrompt.addMenu()" or supply the menu(s) in the construction of the MenuPrompt object before calling "MenuPrompt.open()"`;

        this._active = true;


        let openMenu = (idx) => {
            if(idx >= this._menus.length || !this._active)
            {
                // this.close();
                // this._options.onFinished(this._results);
                return;
            }
            else
            {
                this._currentMenu = idx;

                // this._clearConsole();

                let currentMenu = {
                    title: "",
                    options: ""
                }

                currentMenu.title = this._menus[idx].title;

                let titleUL = "";
                currentMenu.title.split("").forEach(() => titleUL += "‾");

                let longestOption = 0;
                this._menus[idx].options.forEach(option => longestOption = option.key.length > longestOption ? option.key.length : longestOption);

                this._menus[idx].options.forEach(option => {
                    let optionSpacer = "  ";
                    let neededSpaces = longestOption - option.key.length;
                    for(let i = 0; i < neededSpaces; i++)
                        optionSpacer += " ";
                    
                    currentMenu.options += `${col.fg.green}${option.key}${col.rst}${this._options.optionSeparator}${optionSpacer}${option.description}\n`;
                });

                if(!isEmpty(this._options.exitKey))
                {
                    let exitSpacer = "  ";
                    let neededExitSpaces = longestOption - this._options.exitKey.length;
                    for(let i = 0; i < neededExitSpaces; i++)
                        exitSpacer += " ";
                
                    currentMenu.options += `\n${col.fg.red}${this._options.exitKey}${col.rst}${this._options.optionSeparator}${exitSpacer}Exit\n`;
                }

// let menuText = `\
// ${isEmpty(userFeedback) ? "\n\n\n" : `${col.fg.red}❗️ > ${userFeedback}${col.rst}\n\n\n`}${col.fat}${col.fg.cyan}${currentMenu.title}${col.rst}
// ${col.fg.cyan}${titleUL}${col.rst}
// ${currentMenu.options}

// ${this._options.cursorPrefix} \
// `;

                // this._rl.resume();
                // this._rl.question(menuText, answer => {
                //     this._rl.pause();

                    let answer = "1";
                    if(!isEmpty(this._options.exitKey) && answer == this._options.exitKey)
                        return openMenu(++idx);
                    
                    if(isEmpty(answer) && this._options.retryOnInvalid !== false)
                    {
                        return openMenu(idx, "Please type one of the green options and press enter");
                    }
                    else
                    {
                        let currentOptions = this._menus[idx].options;
                        let selectedOption = null;
                        currentOptions.forEach((opt, i) => {
                            if(opt.key == answer)
                            {
                                selectedOption = opt;
                                selectedOption["menuTitle"] = this._menus[idx].title;
                                selectedOption["optionIndex"] = i;
                                selectedOption["menuIndex"] = idx;
                            }
                        });

                        if(selectedOption != null)
                        {
                            if(typeof this._results != "object" || isNaN(parseInt(this._results.length)))
                                this._results = [selectedOption];
                            else this._results.push(selectedOption);

                            return openMenu(++idx);
                        }
                        else return openMenu(idx, `Invalid option "${answer}" selected`);
                    }
                // });
            }
        }

        openMenu(0);
        return true;
    }
}

test.MenuPrompt = () => {
    let res = [];
    let ok = [];


    let mp = new MenuPromptUnitTest({
        exitKey: "x",
        retryOnInvalid: true
    });

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



    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());
    logOk("MenuPrompt", ok, res);
    allResults.push(...res);
}
test.MenuPrompt();







//#MARKER Objects
console.log(`\n\n\x1b[33m\x1b[1m> Objects:\x1b[0m\n`);


test.info = () => {
    let res = [];
    let ok = [];


    if(jsl.info.intVersion.length === 3) // 0
        res.push(true);
    else res.push(false);

    if(typeof jsl.info.contributors === "object" && !isNaN(parseInt(jsl.info.contributors.length))) // 1
        res.push(true);
    else res.push(false);

    if(jsl.info.license.startsWith("MIT")) // 2
        res.push(true);
    else res.push(false);

    if(jsl.info.author.startsWith("Sv443")) // 3
        res.push(true);
    else res.push(false);


    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());
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

    if(jsl.colors.fg != undefined) // 1
        res.push(true);
    else res.push(false);

    if(jsl.colors.bg != undefined) // 2
        res.push(true);
    else res.push(false);


    res.forEach((r, i) => r === true ? ok.push(i) : doNothing());
    logOk("colors", ok, res);
    allResults.push(...res);
}
test.colors();







let allTrue = 0;
let allFalse = 0;
allResults.forEach(res => {
    if(res) allTrue++;
    if(!res) allFalse++;
})
console.log(`\n\n\x1b[35m\x1b[1m>> Result:\x1b[0m ${allTrue} / ${allTrue + allFalse}${allFalse > 0 ? `  \x1b[31m\x1b[1m(${allFalse} false)\x1b[0m` : ""}`);
console.log(`\n\x1b[36m\x1b[1m==================================\x1b[0m`);

if(allTrue < allFalse)
    process.exit(1);
else process.exit(0);