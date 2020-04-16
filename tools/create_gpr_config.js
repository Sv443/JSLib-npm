// 1. renames "package.json" to "package-npm.json"
// 2. sets the needed properties for GPR to accept the publish
// 3. writes the modified properties to "package.json"

const fs = require("fs");
const packageJSON = Object.freeze(require("../package.json"));

function createGprConfig()
{
    let pkgGpr = JSON.parse(JSON.stringify(packageJSON));

    pkgGpr["name"] = `@sv443/${packageJSON.name}`; // scoped package name (from "svjsl" to "@sv443/svjsl")
    pkgGpr["publishConfig"] = {
        registry: "https://npm.pkg.github.com/@Sv443" // switch to GitHub registry instead of default (NPM)
    };

    let errored = error => {
        console.log(`\n\n\x1b[31m\x1b[1mError: ${error}\x1b[0m\n`);
        process.exit(1);
    };

    fs.copyFile("./package.json", "./package-npm.json", (err) => { // rename "package.json" to "package-npm.json" #1
        if(err)
            errored(err);
        fs.unlink("./package.json", (err) => { // rename "package.json" to "package-npm.json" #2
            if(err)
                errored(err);
            fs.writeFile("./package.json", JSON.stringify(pkgGpr, null, 2), (err) => { // write modified properties to "package.json"
                if(err)
                    errored(err);
                console.log(`\n\nSuccessfully created GPR-compatible package.json file.\nThe NPM-compatible version can be found at "./package-npm.json"\n`);
                return process.exit(0); // exit 0 (success)
            });
        });
    });
}

createGprConfig();
