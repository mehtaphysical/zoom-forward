const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const { EventEmitter } = require('events');
const ee = new EventEmitter();

app.use(express.json());
app.use(express.static('public'));

app.post('/event', (req, res) => {
  res.end('ok');
  ee.emit('INCOMING', req.body);
});

const urls = {};
io.on('connection', socket => {
  socket.on('URL', url => {
    urls[socket.id] = url;
  });

  ee.on('INCOMING', event => {
    socket.emit('INCOMING', event);
  });
});

server.listen(process.env.PORT || 7890, () => {
  console.log('STARTED');
});
