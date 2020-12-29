const child_process = require("child_process")
const fs = require("fs")
const Path = require("path")


const package_json = require("../package.json")

// 2. Copy 'package.json'
fs.writeFileSync("./lib/package.json", JSON.stringify({
  name: package_json.name,
  version: package_json.version,
  dependencies: package_json.dependencies,
  peerDependencies : package_json.peerDependencies,
  license: package_json.license,
  main: "./index.js",
}, null, 2))


// 4. Generate js files
child_process.execSync("tsc")