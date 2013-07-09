var http = require('http');
var url = require('url');

function start(route, handle) {
	function onRequest(req, res) {
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");		
		route(handle, pathname, res, req);

	}
	var port = process.env.PORT || 8888
	http.createServer(onRequest).listen(port);
	console.log("Server has started on " + port);

}

exports.start = start;

