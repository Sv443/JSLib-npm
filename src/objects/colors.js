/**
 * 🔹 Use this to add color to your console output 🔹
 * ⚠️ "jsl.consoleColor()" will soon be deprecated - please use this object instead!
 * @prop {String} rst
 * @prop {String} reset
 * @prop {String} fat
 * @prop {Object} fg Foreground / font color
 * @prop {String} fg.black
 * @prop {String} fg.red
 * @prop {String} fg.green
 * @prop {String} fg.yellow
 * @prop {String} fg.blue
 * @prop {String} fg.magenta
 * @prop {String} fg.cyan
 * @prop {String} fg.white
 * @prop {Object} bg Background color
 * @prop {String} bg.black
 * @prop {String} bg.red
 * @prop {String} bg.green
 * @prop {String} bg.yellow
 * @prop {String} bg.blue
 * @prop {String} bg.magenta
 * @prop {String} bg.cyan
 * @prop {String} bg.white
 * @since 1.8.0
 */
const colors = {
    rst:   "\x1b[0m",
    reset: "\x1b[0m",
    fat:   "\x1b[37m",
    blink: "\x1b[5m",
    fg: {
        black:   "\x1b[30m\x1b[1m",
        red:     "\x1b[31m\x1b[1m",
        green:   "\x1b[32m\x1b[1m",
        yellow:  "\x1b[33m\x1b[1m",
        blue:    "\x1b[34m\x1b[1m",
        magenta: "\x1b[35m\x1b[1m",
        cyan:    "\x1b[36m\x1b[1m",
        white:   "\x1b[37m\x1b[1m"
    },
    bg: {
        black:   "\x1b[40m\x1b[1m",
        red:     "\x1b[41m\x1b[1m",
        green:   "\x1b[42m\x1b[1m",
        yellow:  "\x1b[43m\x1b[1m",
        blue:    "\x1b[44m\x1b[1m",
        magenta: "\x1b[45m\x1b[1m",
        cyan:    "\x1b[46m\x1b[1m",
        white:   "\x1b[47m\x1b[1m"
    }
}
module.exports = colors;