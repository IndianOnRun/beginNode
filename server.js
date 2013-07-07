var http = require('http');
var url = require('url');

function start(route, handle) {
	function onRequest(req, res) {
		var postData = "";
		var pathname = url.parse(req.url).pathname;
		console.log("Request for " + pathname + " received.");		
		req.setEncoding("utf8");

		req.addListener("data", function(postDataChunk) {
			postData += postDataChunk;
			console.log("Receive POST data chunk '" +
			postDataChunk + "'.");
		)	
		};
		
		req.addListener("end", funtion() {
			route(handle, pathname, res, postData);
		});

	}

	http.createServer(onRequest).listen(8888);
	console.log("Server has started!");

}

exports.start = start;
