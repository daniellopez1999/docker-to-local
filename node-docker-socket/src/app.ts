import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';

const zmq = require('zeromq');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

const sock = new zmq.Publisher();
app.use(express.json());

app.get('/getData', async (_req, res) => {
  await sock.send(['kitty cats', 'meow!']);
  res.status(200).json({ Status: 'Message Sent' });
});

app.listen(port, async () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);

  await sock.bind('tcp://0.0.0.0:3500');
  console.log('Publisher bound to port 3500');
});
