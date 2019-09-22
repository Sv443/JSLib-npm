const ProgressBar = class {
    /**
     * 🔹 Creates a dynamic progress bar with a percentage and custom message display 🔹
     * @param {Number} timesToUpdate How many times you will call ProgressBar.next() in total - example: 4 means you will need to call ProgressBar.next() exactly four times to reach 100% progress 
     * @param {String} [initialMessage=""] Initial message that appears at 0% progress
     * @since 1.7.0
     */
    constructor(timesToUpdate, initialMessage) {
        if(initialMessage == undefined) initialMessage = "";
        this.timesToUpdate = timesToUpdate;
        this.iteration = 1;
        this.progress = 0.0;
        this.progressDisplay = "";
        this.filledChar = "■";
        this.blankChar = "─";
        this.finishFunction = undefined;

        for(let i = 0; i < this.timesToUpdate; i++) this.progressDisplay += this.blankChar;

        this._update(initialMessage);
    }

    /**
     * Increment the progress bar. The amount of these functions should be known at the point of initially creating the ProgressBar object.
     * @param {String} message Message that should be displayed
     * @since 1.7.0
     */
    next(message) { // increments the progress bar
        this.progress = (1 / this.timesToUpdate) * this.iteration;

        let pt = "";
        for(let i = 0; i < this.iteration; i++) pt += this.filledChar;
        this.progressDisplay = pt + this.progressDisplay.substring(this.iteration);
        
        this._update(message);
        this.iteration++;
    }

    /**
     * ❌ Private method - please don't use ❌
     * @private
     */
    _update(message) { // private method to update the console message
        let isEmpty = require("../functions/isEmpty");

        if(this.iteration <= this.timesToUpdate) {
            if(!isEmpty(message))
                message = "- " + message;
            else message = "";

            process.stdout.cursorTo(0);
            process.stdout.clearLine();
            process.stdout.write(`${(this.progress != 1.0 ? "\x1b[33m" : "\x1b[32m")}\x1b[1m${Math.round(this.progress * 100)}%\x1b[0m ${(Math.round(this.progress * 100) < 10 ? "  " : (Math.round(this.progress * 100) < 100 ? " " : ""))}[${this.progressDisplay.replace(new RegExp(this.filledChar, "gm"), "\x1b[32m\x1b[1m" + this.filledChar + "\x1b[0m")}] ${message}${(this.progress != 1.0 ? "" : "\n")}`);
            if(this.progress == 1.0 && this.finishFunction != undefined) this.finishFunction();
        }
    }

    /**
     * Executes a function once the progress reaches 100%
     * @param {Function} callback Function
     * @since 1.7.0
     */
    onFinish(callback) {
        let isEmpty = require("../functions/isEmpty");
        if(typeof callback != "function" || isEmpty(callback))
            throw new Error("Wrong arguments provided for ProgressBar.onFinish() - (expected: \"Function\", got: \"" + typeof callback + "\")");
        this.finishFunction = callback;
    }

    /**
     * Get the current progress as a float value
     * @returns {Float}
     * @since 1.7.0
     */
    getProgress() {
        return this.progress;
    }

    /**
     * Get the amount of increments that are still needed to reach 100% progress
     * @returns {Number}
     * @since 1.7.0
     */
    getRemainingIncrements() {
        return (this.timesToUpdate - this.iteration >= 0 ? this.timesToUpdate - this.iteration : 0);
    }
}
module.exports.ProgressBar = ProgressBar;