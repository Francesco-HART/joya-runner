const path = require("path");
const { createRequire } = require("./moduleSystem");
const { EventLoop } = require("./eventLoop");
const { createWrappedPromise } = require("./native/promise-wrapper");

class Joya {
  constructor() {
    this.loop = new EventLoop();
  }

  run(code, entryPath = "") {
    const wrappedCode = `(function(exports, require, module, __filename, __dirname, joya) { ${code} \n})`;

    const scriptFunction = eval(wrappedCode); // eval use V8 to compile the code into a function.
    const module = { exports: {} };
    globalThis.queueMicrotask = (cb) => this.loop.queueMicrotask(cb); // Global this is a reference to the global object in Node.js, which is `global`.
    globalThis.Promise = createWrappedPromise(this.loop);

    const require = createRequire(path.dirname(entryPath), this);

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
