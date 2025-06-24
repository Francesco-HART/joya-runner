const fs = require("fs");
const { TimerManager } = require("./timers");

class EventLoop {
  constructor() {
    this.timer = new TimerManager();
    this.microtasks = [];
    this.tasks = [];
    this.nextId = 1;
    this.shouldStop = false; // Flag to control the event loop execution
  }

  setTimeout(callback, delay) {
    return this.timer.setTimeout(callback, delay);
  }

  queueMicrotask(callback) {
    this.microtasks.push({ id: this.nextId++, callback, done: false });
    return this.nextId - 1; // Return the ID of the microtask
  }

  clearTimeout(id) {
    this.timer.clearTimeout(id);
  }

  // Ajouter un événement immédiatement exécutable
  queueTask(callback) {
    this.tasks.push(callback);
  }

  exit() {
    this.shouldStop = true; // Flag to stop the event loop
  }

  run() {
    while (
      this.shouldStop ||
      this.timer.timers.length > 0 ||
      this.tasks.length > 0 ||
      this.microtasks.length > 0
    ) {
      this.timer.timerRun();

      while (this.tasks.length > 0) {
        const task = this.tasks.shift(); // Removes the first element from an array and returns it. If the array is empty, undefined is returned and the array is not modified.
        task();
      }

      while (this.microtasks.length > 0) {
        const micro = this.microtasks.shift(); // Retire la première microtâche de la liste
        micro(); // 👈 priorité après tasks (comme dans Node)
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
