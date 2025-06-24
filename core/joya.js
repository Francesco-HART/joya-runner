const path = require("path");
const { createRequire } = require("./moduleSystem");
const { EventLoop } = require("./eventLoop");

class Joya {
  constructor() {
    this.loop = new EventLoop();
  }

  run(code, entryPath = "") {
    const wrappedCode = `(function(exports, require, module, __filename, __dirname, joya) { ${code} \n})`;

    const scriptFunction = eval(wrappedCode);
    const module = { exports: {} };

    const require = createRequire(path.dirname(entryPath));

    scriptFunction(
      module.exports,
      require,
      module,
      entryPath,
      path.dirname(entryPath),
      this
    );

    this.loop.run();
  }
}

module.exports = { Joya };
