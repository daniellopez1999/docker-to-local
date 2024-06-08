const express = require('express');
const zmq = require('zeromq');
const app = express();
const port = 4000;

app.listen(port, async () => {
  console.log(`Second backend server running on port ${port}`);
  const sock = new zmq.Subscriber();

  sock.connect('tcp://localhost:3500');
  sock.subscribe('kitty cats');
  console.log('Subscriber connected to port 3500');

  for await (const [topic, msg] of sock) {
    console.log(
      'received a message related to:',
      Buffer.from(topic).toString(),
      'containing message:',
      Buffer.from(msg).toString()
    );
  }
});
