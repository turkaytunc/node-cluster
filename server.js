const cluster = require('cluster');

const express = require('express');

console.log(cluster.isMaster);

if (cluster.isMaster) {
  cluster.fork();
} else {
  const app = express();

  app.listen(5000, console.log('http://localhost:5000'));
}
