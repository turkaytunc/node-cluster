// process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

if (cluster.isMaster) {
  cluster.fork();
  cluster.fork();
} else {
  const crypto = require('crypto');
  const express = require('express');

  const app = express();
  const start = new Date();
  app.get('/slow', (req, res) => {
    crypto.pbkdf2('x', 'y', 200000, 512, 'sha512', () => {
      res.json({ message: 'Hashing done in ' + (new Date() - start) / 1000 });
    });
  });

  app.get('/fast', (req, res) => {
    res.json({ message: 'this is a fast route' });
  });

  app.listen(5000, console.log('http://localhost:5000'));
}
