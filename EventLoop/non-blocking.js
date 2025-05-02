const fs = require("fs");
const http = require("http");

http
  .createServer(async (req, res) => {
    for (let i = 0; i < 5; i++) {
      await fs.promises.readFile("./big.txt");
    }
    res.end("Finishing asynchronous file reads");
  })
  .listen(4000, () => console.log("Non-blocking server on port 4000"));
