const fs = require("fs");
const path = require("path");

function createRequire(currentDir) {
  return function require(modulePath) {
    const fullPath = path.resolve(currentDir, modulePath);
    const code = fs.readFileSync(fullPath + ".js", "utf-8");

    const module = { exports: {} };
    const wrappedCode = `(function(exports, require, module, __filename, __dirname) { ${code} \n})`;

    const scriptFunction = eval(wrappedCode);
    const localRequire = createRequire(path.dirname(fullPath));
    scriptFunction(
      module.exports,
      localRequire,
      module,
      fullPath,
      path.dirname(fullPath)
    );

    return module.exports;
  };
}

module.exports = { createRequire };
