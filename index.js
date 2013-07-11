var app = require('http').createServer(handler)
  , io = require('socket.io').listen(app)
  , fs = require('fs'), url = require('url');

app.listen(8888);

function handler (req, res) {
  var pathname = url.parse(req.url).pathname.toString();
  if( pathname === '/') {
    fs.readFile('./welcome.html', function (err, data) {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading index.html');
      }
      res.writeHead(200);//, {'Content-Type':'text/html'});
      res.end(data);
    });
  } else if (pathname === '/chatbox.js') {
      fs.readFile('./chatbox.js', function(err, data) {
        if (err) throw (err);
        res.writeHead(200);
        res.end(data);
      });
  } else {
    res.writeHead(200, {'content-type':'text/html'});
    res.end("NO! Head back to <a href = '/'> the main page. </a>");
  }   
}

io.sockets.on('connection', function (socket) {
  socket.emit('message', { message: 'Welcome to the Chat' });
  socket.on('send', function (data) {
      io.sockets.emit('message', data);
  });
});
