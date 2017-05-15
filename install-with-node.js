/*global process,require,System*/

global.babel = require("./deps/babel.min.js");
require("./deps/system.src.js");
require("./deps/lively.modules.js");

// System.debug = true;
var installDir = process.argv[2],
    dependenciesDir = require("path").join(installDir, "lively.next-node_modules"),
    verbose = false;

if (!installDir) {
  console.error("No installation dir specified!")
  process.exit(1);
}

installDir = require('path').resolve(installDir);

console.log("Installing lively.system packages into %s", installDir);

lively.modules.importPackage(".")
  .then(() => lively.modules.importPackage("../flatn"))
  .then(() => System.import("./install.js"))
  .then(installer => installer.install(installDir, dependenciesDir, verbose))
  .catch(err => { console.error("Error!" + err); process.exit(2); })
