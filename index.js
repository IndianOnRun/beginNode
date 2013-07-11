var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs');

app.listen(8888);

function handler (req, res) {
  fs.readFile('./welcome.html',
  function (err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error loading index.html');
    }

    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(data);
 });
}

io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'Welcome to the Chat' });
  socket.on('send', function (data) {
      io.sockets.emit('message', data);
  });
});
