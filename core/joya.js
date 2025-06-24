const path = require("path");
const { createRequire } = require("./moduleSystem");
class Joya {
  run(code, entryPath = "") {
    console.log(`Running Joya with entry path: ${entryPath}`);

    const wrappedCode = `(function(exports, require, module, __filename, __dirname) { ${code} \n})`;

    const scriptFunction = eval(wrappedCode);

    const fakeModule = { exports: {} };
    const require = createRequire(path.dirname(entryPath));

    scriptFunction(
      module.exports,
      require,
      module,
      entryPath,
      path.dirname(entryPath)
    );
  }
}

module.exports = { Joya };
