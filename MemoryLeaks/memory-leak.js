const { createServer } = require("http");
const { Buffer } = require("buffer");

const memory = [];

const server = createServer((req, res) => {
  const buffer = Buffer.alloc(1000000);

  memory.push(buffer);
  res.end("1GB buffer pushed to memory");
});

server.listen(5005, () => {
  console.log("Server listening on port 5005");
});
