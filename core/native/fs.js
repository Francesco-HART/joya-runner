const nodeFs = require("fs"); // We use Node but it's inject in Joya

function createFsModule(eventLoop) {
  return {
    readFile(path, encoding, callback) {
      console.log("Starting readFile operation");
      eventLoop.startOp(); // Add queue operation
      nodeFs.readFile(path, encoding, (err, data) => {
        eventLoop.queueTask(() => {
          eventLoop.endOp(); // Remove One Queued operation
          callback(err, data);
        });
      });
    },
  };
}

module.exports = { createFsModule };
