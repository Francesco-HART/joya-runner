const path = require("path");
const { createRequire } = require("./moduleSystem");
const { EventLoop } = require("./eventLoop");

class Joya {
  constructor() {
    this.loop = new EventLoop();
  }

  run(code, entryPath = "") {
    const wrappedCode = `(function(exports, require, module, __filename, __dirname, joya) { ${code} \n})`;

    const scriptFunction = eval(wrappedCode); // eval use V8 to compile the code into a function.
    const module = { exports: {} };
    globalThis.queueMicrotask = (cb) => this.loop.queueMicrotask(cb); // Global this is a reference to the global object in Node.js, which is `global`.

    const require = createRequire(path.dirname(entryPath), this);

    scriptFunction(
      module.exports,
      require,
      module,
      entryPath,
      path.dirname(entryPath),
      this
    );

    // Donne à fs.readFile une chance d'ajouter une tâche
    setTimeout(() => {
      console.log(
        "Joya is running with entry point:",
        {
          task: this.loop.tasks.length,
          microTask: this.loop.microtasks.length,
          timer: this.loop.timer.timers.length,
        },
        "tasks in queue"
      );
      this.loop.run();
    }, 1000);
  }
}

module.exports = { Joya };
