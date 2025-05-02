const fs = require("fs");
const http = require("http");

http
  .createServer((req, res) => {
    for (let i = 0; i < 5; i++) {
      fs.readFileSync("./big.txt");
    }
    res.end("Finishing synchronous file reads");
  })
  .listen(3000, () => console.log("Blocking server on port 3000"));
