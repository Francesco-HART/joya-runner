joya.loop.setTimeout(() => {
  console.log("Waiting done!");
}, 500);

joya.loop.writeFile("./examples/hello.txt", "Hello, world!", "utf-8", (err) => {
  if (err) {
    console.error("Error writing file:", err);
    return;
  }
  console.log("File written successfully!");
});

joya.loop.readFile("./examples/hello.txt", "utf-8", (err, data) => {
  if (err) {
    console.error("Error reading file:", err);
    return;
  }
  console.log("File content:", data);
});
