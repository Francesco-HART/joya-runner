class Joya {
  run(code) {
    const wrappedCode = `(function(exports, require, module, __filename, __dirname) { ${code} \n})`;

    const scriptFunction = eval(wrappedCode);

    const fakeModule = { exports: {} };
    scriptFunction(
      fakeModule.exports,
      require,
      fakeModule,
      __filename,
      __dirname
    );
  }
}

module.exports = { Joya };
