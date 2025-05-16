const { Readable } = require("stream");
const { Buffer } = require("buffer");

class StringBuffer extends Readable {
  constructor(str, options) {
    super(options);
    this.buffer = new Buffer.from(str);
    this.offset = 0;
  }

  _read(size) {
    if (this.offset >= this.buffer.length) {
      this.push(null); // end stream
      return;
    }

    // create chunk of length size
    const chunk = this.buffer.subarray(this.offset, this.offset + size);
    this.push(chunk); // push chunk to the internal buffer
    this.offset = this.offset + size;
  }
}

const euphoriaBuffer = new StringBuffer(
  `Them superpowers getting neutralized, I can only watch in silence
The famous actor we once knew is lookin' paranoid and now spiralin'
You're movin' just like a degenerate, every antic is feelin' distasteful
I calculate you're not as calculated, I can even predict your angle
Fabricating stories on the family front 'cause you heard Mr. Morale
A pathetic master manipulator, I can smell the tales on you now
You're not a rap artist, you a scam artist with the hopes of being accepted
Tommy Hilfiger stood out, but FUBU never had been your collection
I make music that electrify 'em, you make music that pacify 'em
I can double down on that line, but spare you this time, that's random acts of kindness
Know you a master manipulator and habitual liar too
But don't tell no lie about me and I won't tell truths 'bout you`,
  { highWaterMark: 256 }
);

euphoriaBuffer.on("data", (chunk) => {
  console.log(`Chunk received: chunk size - ${chunk.length} bytes 
    value - ${chunk.toString()}\n`);
});

euphoriaBuffer.on("end", () => {
  console.log("string is read. This is the end of the stream");
});
