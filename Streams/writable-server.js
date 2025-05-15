const http = require("http");

const server = http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });

  let count = Math.floor(Math.random() * 25);

  const interval = setInterval(() => {
    if (count <= 0) {
      clearInterval(interval);
      res.end("I'm done testing\n");
      return;
    }

    res.write(`Testing count ${count}\n`);
    count--;
  }, 200);

  res.on("finish", () => {
    console.log("Everything has been flushed to to the socket");
  });
});

server.listen(5005, () => {
  console.log("Server listening on port 8080");
});
