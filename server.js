process.env.UV_THREADPOOL_SIZE = 1;
const cluster = require('cluster');

if (cluster.isMaster) {
  cluster.fork();
} else {
  const crypto = require('crypto');
  const express = require('express');

  const app = express();

  app.get('/slow', (req, res) => {
    crypto.pbkdf2('x', 'y', 100000, 512, 'sha512', () => {
      res.json({ message: 'Hashing done' });
    });
  });

  app.get('/fast', (req, res) => {
    res.json({ message: 'this is a fast route' });
  });

  app.listen(5000, console.log('http://localhost:5000'));
}
