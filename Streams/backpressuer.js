const http = require("https");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  let count = 10000; // Large enough to fill the buffer
  let i = 0;

  function writeChunk() {
    let canContinue = true;

    while (i < count && canContinue) {
      const chunk = `Chunk ${i}\n`;
      canContinue = res.write(chunk); // false means backpressure

      i++;
    }

    if (i < count) {
      // Buffer is full, wait for 'drain' before writing more
      console.log("Backpressure detected, waiting for drain...");
      res.once("drain", () => {
        console.log("Drain event fired, resuming write...");
        writeChunk();
      });
    } else {
      res.end("All chunks sent\n");
    }
  }

  writeChunk();

  res.on("finish", () => {
    console.log("All data flushed to the socket");
  });
});

server.listen(5005, () => {
  console.log("Server listening on port 5005");
});
