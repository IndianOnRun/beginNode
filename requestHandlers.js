//var exec = require('child_process').exec;
var querystring = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable"),
	mem = require("./memory").rememText;

function start(response) {
	console.log("Request handler 'start' was called.");
	fs.readFile('getPost.html', function(err, data) {
			if (err) throw err;
			response.writeHead(200, {'content-type':'text/html'});
			response.write(data);
			response.end();
		});
}

function upload(response, request) {
	console.log("Request handler 'upload' was called");
	var mem = new mem.rememText();
	var form = new formidable.IncomingForm();
	console.log("about to parse");
	form.parse(request, function(error, fields) {
		console.log("parsing done");
		console.log("Someone saved file called : " + fields['filename']);
		mem.save( fields );
	});
        response.writeHead(200, {'content-type':'text/html'});
        response.write("Received Text. Check log. <br /> " );
	//response.write("<img src = '/show' />");
	response.write("%j", mem);
        response.end();
}

function show(response, postData) {
	console.log("Request handler 'show' was called.");
	

	//fs.readFile("./tmp/test.png", "binary", function(error, file) {
	//	if (error) {
	//		response.writeHead(500, {'content-type' : 'text/plain'});
	//		response.write(error+ "\n");
	//		response.end();
	//	} else {
	//		response.writeHead(200, {'content-type':'text/plain'});
	//		response.write("Dict is %j", );
	//		response.end();
	//	}
	//});
}
exports.start = start;
exports.upload = upload;
exports.show = show;

