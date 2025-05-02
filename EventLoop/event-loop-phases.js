const fs = require("fs");
// setTimeout(() => {
//   console.log("first");

//   process.nextTick(console.log, "First next tick");
//   setTimeout(() => {
//     console.log("2nd set timeout");
//   }, 0);

//   setImmediate(() => {
//     console.log("Immediate");
//   });

//   fs.readFile("./index.html", (err, data) => {
//     if (err) {
//       console.error(err);
//       return;
//     }
//     console.log("File read");
//   });

//   Promise.resolve("From the promise").then(console.log);
// }, 0);

console.log("Start");

setTimeout(() => {
  console.log("setTimeout"); // Timer phase
}, 0);

setImmediate(() => {
  console.log("setImmediate"); // Check phase
});

process.nextTick(() => {
  console.log("process.nextTick"); // Microtask, runs before any other async tasks
});

Promise.resolve().then(() => {
  console.log("Promise.then"); // Also a microtask
});

fs.readFile(__filename, () => {
  console.log("fs.readFile"); // Poll phase
});

console.log("End");
