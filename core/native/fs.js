const nodeFs = require("fs"); // on utilise Node pour faire la lecture, mais on injecte dans ta loop

function createFsModule(eventLoop) {
  return {
    readFile(path, encoding, callback) {
      nodeFs.readFile(path, encoding, (err, data) => {
        eventLoop.queueTask(() => {
          callback(err, data);
        });
      });
    },
  };
}

module.exports = { createFsModule };
