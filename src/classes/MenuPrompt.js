/**
 * @typedef {Object} MenuPromptMenuOption
 * @prop {String} key The key(s) that need(s) to be pressed to select this option
 * @prop {String} description The description of this option
 */

/**
 * @typedef {Object} MenuPropmtMenu
 * @prop {String} title The title of this menu
 * @prop {Array<MenuPromptMenuOption>} options An array of options for this menu
 */

/**
 * @typedef {Object} MenuPromptOptions The options of the menu prompt
 * @prop {String} [exitKey="x"] The key or keys that need to be entered to exit the prompt
 * @prop {String} [optionSeparator=")"] The separator character(s) between the option key and the option description
 * @prop {String} [cursorPrefix="─►"] Character(s) that should be prefixed to the cursor. Will default to this arrow: "─►"
 * @prop {Boolean} [retryOnInvalid=true] Whether the menu should be retried if the user entered a wrong option - if false, continues to next menu
 * @prop {Function} [onOptionSelected] A function that gets called whenever the user selects an option. The only passed parameter is the `key` value of the option
 * @prop {Function} [onFinished] A function that gets called when the user is done with all of the menus of the prompt or entered the exit key(s). The only passed parameter is an array containing all selected option keys
 */

/**
 * @typedef {Array<String>} MenuPromptResult The results of the menu prompt
 */

const MenuPrompt = class {
    /**
     * 🔹 Creates an interactive prompt with one or many menus 🔹
     * @param {MenuPromptOptions} options The options for the prompt
     * @param {Array<MenuPromptMenus>} menus An array of menus
     * @returns {(Boolean|String)} Returns true, if the menu was successfully created, a string containing the error message, if not
     * @since 1.8.0
     */
    constructor(options, menus)
    {
        let isEmpty = require("../misc").isEmpty;
        let readline = require("readline");
        this._rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });

        if(isEmpty(options))
        {
            options = {
                exitKey: "x",
                optionSeparator: ")",
                cursorPrefix: "─►",
                retryOnInvalid: true,
                onOptionSelected: () => {},
                onFinished: () => {},
            };
        }
        else
        {
            if(isEmpty(options.exitKey)) options.exitKey = "";
            if(isEmpty(options.optionSeparator)) options.optionSeparator = ")";
            if(options.cursorPrefix !== "" && isEmpty(options.cursorPrefix)) options.cursorPrefix = "─►";
            if(isEmpty(options.retryOnInvalid)) options.retryOnInvalid = true;
            if(isEmpty(options.onOptionSelected)) options.onOptionSelected = () => {};
            if(isEmpty(options.onFinished)) options.onFinished = () => {};
        }
        this._options = options;

        // TODO: validate menus
        let invalidMenus = [];
        menus.forEach((menu, i) => {
            if(!this._validateMenu(menu))
                invalidMenus.push(i);
        });

        if(!isEmpty(invalidMenus))
            throw new Error(`Invalid menu${invalidMenus.length == 1 ? "" : "s"} provided in the construction of a MenuPrompt object. The index${invalidMenus.length == 1 ? "" : "es"} of the invalid menu${invalidMenus.length == 1 ? "" : "s"} ${invalidMenus.length == 1 ? "is" : "are"}: ${invalidMenus.length == 1 ? invalidMenus[0] : require("../misc").readableArray(invalidMenus)}`);
        
        this._menus = menus;

        this._currentMenu = -1;

        this._oldStdout = process.stdout.write;
        this._oldStderr = process.stderr.write;

        return true;
    }

    /**
     * Opens the menu
     * 
     * Warning ⚠️
     * This suppresses the processes' `stdout` and `stderr` streams.
     * This means you can't print something to the console while the menu is opened.
     * Use `MenuPrompt.close()` or wait until the user is done with the prompt to restore `stdout`'s and `stderr`'s function and be able to use the console normally again.
     * @returns {Boolean} Returns true, if the menu could be opened or a string containing an error message, if not
     * @since 1.8.0
     */
    open()
    {
        this._active = true;

        this._oldStdout = process.stdout.write;
        this._oldStderr = process.stderr.write;

        process.stdout.write = () => {};
        process.stderr.write = () => {};


        let openMenu = idx => {
            if(idx >= this._menus.length)
            {
                this._currentMenu = -1;
                return this._options.onFinished();
            }
            else
            {
                this._currentMenu = idx;

                // TODO: all of this shit

                // ... async shit ...
                // on option selected:

                // if option valid OR this._options.retryOnInvalid === false:
                return openMenu(++idx);

                // else (option invalid):
                // userFeedback();
                // return openMenu(idx);
            }
        }

        openMenu(0);
    }

    /**
     * Closes the menu and returns the chosen options up to this point
     * @returns {MenuPromptResult} Returns the results of the menu prompt
     * @since 1.8.0
     */
    close()
    {
        process.stdout.write = this._oldStdout;
        process.stderr.write = this._oldStderr;

        this._active = false;
        this._rl.close();
        console.clear();
    }

    /**
     * Adds a new menu to the menu prompt
     * You can even call this method while the menu is opened
     * @param {MenuPropmtMenu} menu
     * @returns {(Boolean|String)} Returns true, if the menu could be added or a string containing an error message, if not
     * @since 1.8.0
     */
    addMenu(menu)
    {
        // TODO: validate menu

        try {
            this._menus.push(menu);
        }
        catch(err)
        {
            return err;
        }
        return true;
    }

    /**
     * Returns the (zero-based) index of the current menu
     * @returns {Number} The zero-based index of the current menu or `-1` if the menu hasn't been opened yet
     * @since 1.8.0
     */
    currentMenu()
    {
        return this._currentMenu;
    }

    /**
     * Returns the current results of the menu prompt.
     * Does NOT close the menu prompt.
     * @returns {MenuPromptResult} Returns the results of the menu prompt or null, if there aren't any results yet
     * @since 1.8.0
     */
    result()
    {
        let isEmpty = require("../misc").isEmpty;

        if(!isEmpty(this._result))
            return this._result;
        else return null;
    }

    _validateMenu(menu)
    {
        menu.toString();
    }
}
module.exports.MenuPrompt = MenuPrompt;