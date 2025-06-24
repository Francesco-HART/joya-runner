const fs = require("fs");
const { TimerManager } = require("./timers");

class EventLoop {
  constructor() {
    this.timer = new TimerManager();
    this.tasks = [];
    this.nextId = 1;
  }

  setTimeout(callback, delay) {
    return this.timer.setTimeout(callback, delay);
  }

  clearTimeout(id) {
    this.timer.clearTimeout(id);
  }

  // Ajouter un événement immédiatement exécutable
  queueTask(callback) {
    this.tasks.push(callback);
  }

  run() {
    while (this.timer.timers.length > 0 || this.tasks.length > 0) {
      this.timer.timerRun();

      while (this.tasks.length > 0) {
        const task = this.tasks.shift(); // Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
        task();
      }

      this.timer.timerSleep();
    }
  }

  readFile(path, encoding, callback) {
    fs.readFile(path, encoding, (err, data) => {
      this.queueTask(() => callback(err, data));
    });
  }

  writeFile(path, data, encoding, callback) {
    fs.writeFile(path, data, encoding, (err) => {
      this.queueTask(() => callback(err));
    });
  }
}

module.exports = { EventLoop };
