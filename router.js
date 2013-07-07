function route(handle, pathname, res) {
	console.log("About to route a request for " + pathname);
	if (typeof handle[pathname] == 'function') {
		handle[pathname](res);
	} else {
		console.log("No request handler found for " + pathname);
                res.writeHead(200, {'content-type':'text/plain'});
                res.write("404 Not Found.");
                res.end();			
	}
}

exports.route = route;
