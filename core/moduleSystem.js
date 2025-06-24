const fs = require("fs");
const path = require("path");

function createRequire(currentDir) {
  return function require(modulePath) {
    const resolvedPath = resolveModulePath(
      path.resolve(currentDir, modulePath)
    );
    const code = fs.readFileSync(resolvedPath, "utf-8");

    const module = { exports: {} };
    const wrappedCode = `(function(exports, require, module, __filename, __dirname) { ${code} \n})`;

    const scriptFunction = eval(wrappedCode);
    const localRequire = createRequire(path.dirname(resolvedPath));
    scriptFunction(
      module.exports,
      localRequire,
      module,
      resolvedPath,
      path.dirname(resolvedPath)
    );

    return module.exports;
  };
}

const tryExtensions = [".js", ".json"];

function resolveModulePath(modulePath) {
  for (const ext of tryExtensions) {
    const full = modulePath.endsWith(ext) ? modulePath : modulePath + ext;
    if (fs.existsSync(full)) return full;
  }
  throw new Error(`Module not found: ${modulePath}`);
}

module.exports = { createRequire, resolveModulePath };
