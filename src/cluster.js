const cluster = require('cluster');
const os = require('os');
const http = require('http');
const httpProxy = require('http-proxy');
const express = require('express');
const app = express();
const { connect } = require('./db/connect.js');
const users = require('./routes/users.js');
app.use(express.json());
require('dotenv').config();

const numCPUs = os.cpus().length;

if (cluster.isMaster) {
  const proxy = httpProxy.createProxyServer();
  http.createServer((req, res) => {
    const worker = Object.values(cluster.workers)[0];
    proxy.web(req, res, { target: `http://localhost:4001` });
    const keys = Object.keys(cluster.workers);
    const nextIndex = keys.indexOf(String(worker.id)) + 1;
    const nextWorker = cluster.workers[keys[nextIndex] || keys[0]];
    nextWorker && nextWorker.send('activate');
  }).listen(4000);

  console.log(`Primary ${process.pid} is running`);

  for (let i = 1; i < numCPUs; i++) {
    const worker = cluster.fork({ PORT: parseInt(process.env.PORT) + i });
    worker.on('message', (msg) => {
      if (msg === 'activate') {
        worker.isReady = true;
      }
    });
  }

  cluster.on('message', (worker, msg) => {
    if (msg === 'ready') {
      worker.isReady = true;
    }
  });

  let intervalId = setInterval(() => {
    const workers = Object.values(cluster.workers);
    if (workers.every(worker => worker.isReady)) {
      console.log(`All ${numCPUs-1} workers are ready to receive requests`);
      clearInterval(intervalId);
    }
  }, 1000);
} else {
  const port = process.env.PORT;
  app.set('port', port);
  app.listen(port, () => {
    console.log(`Worker ${cluster.worker.id} listening on port ${port}`);
    cluster.worker.send('ready');
    cluster.worker.port=port
  });

  connect();

  app.use('/api/users', users);

  app.use('*', (req, res) => res.status(404).json("Resource doesn't exist"));
}
