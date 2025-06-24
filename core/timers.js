class TimerManager {
  constructor() {
    this.timers = [];
  }

  setTimeout(callback, delay) {
    const id = this.nextId++;
    const executeAt = Date.now() + delay;
    this.timers.push({ id, callback, executeAt });
    return id;
  }

  clearTimeout(id) {
    this.timers = this.timers.filter((timer) => timer.id !== id);
  }

  timerSleep() {
    if (this.timers.length > 0) {
      const nextTimerIn =
        Math.min(...this.timers.map((t) => t.executeAt)) - Date.now();
      Atomics.wait(
        new Int32Array(new SharedArrayBuffer(4)),
        0,
        0,
        Math.max(nextTimerIn, 1)
      );
    }
  }

  timerRun() {
    const now = Date.now();

    const ready = this.timers.filter((t) => t.executeAt <= now);
    const pending = this.timers.filter((t) => t.executeAt > now);

    this.timers = pending;

    for (const timer of ready) {
      timer.callback();
    }
  }

  runLoop() {
    while (this.timers.length > 0) {
      this.timerRun();
      this.timerSleep();
    }
  }
}

module.exports = { TimerManager };
