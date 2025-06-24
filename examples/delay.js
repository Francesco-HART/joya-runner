const timers = require("../core/timers");

const manager = new timers.TimerManager();

manager.setTimeout(() => {
  console.log("Executed after 10 second");
}, 10000);

manager.setTimeout(() => {
  console.log("Executed after 1 second");
}, 1000);

manager.setTimeout(() => {
  console.log("Executed after 0.5 second");
}, 500);

manager.runLoop();
