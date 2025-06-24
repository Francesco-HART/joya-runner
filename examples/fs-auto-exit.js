const fs = require("fs");
console.log("cwd =", process.cwd());
console.log("__dirname =", __dirname);
fs.readFile("./examples/hello.txt", "utf-8", (err, content) => {
  if (err) {
    console.error("Erreur de lecture :", err);
    return;
  }

  console.log("Contenu lu :", content);
});
