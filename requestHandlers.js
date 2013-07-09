//var exec = require('child_process').exec;
var qs = require("querystring"),
	fs = require("fs"),
	formidable = require("formidable"),
	HoldText = require("./memory").HoldText;

function start(response) {
	console.log("Request handler 'start' was called.");
	fs.readFile('getPost.html', function(err, data) {
			if (err) throw err;
			response.writeHead(200, {'content-type':'text/html'});
			response.write(data);
			response.end();
		});
};

function upload(response, request) {
	console.log("Request handler 'upload' was called");
	var holdText = new HoldText();
	var wallotext = '';
	request.on("data", function(data) {
		wallotext += data;
	});
	request.on("end", function() {
		cleanText =  qs.parse(wallotext).snippet;
		console.log("RECEIVED : "+ cleanText);
		holdText.save([{
			body: cleanText
		}] ,function(error, docs){
			response.writeHead(200, {'content-type':'text/html'});
			response.write('<html><body><a href = "/list">Thanks</a></body></html>');
			response.end();
		});

	});
};

function list(response, request) {
	console.log("Request for 'list' was called.");
	var holdText = new HoldText();
	holdText.findAll(function(error, texts){
		if (error) {
			 console.log("Bummer");
		}
		else {
			console.log("Into the findall block. Starting now.");
			response.writeHead(200, {'content-type':'text/plain'});
        		response.write("Received Text. Check log. <br /> " );
			console.log("Step 1 complete."+ texts);
			response.write(JSON.stringify(texts));
                	response.end();
		}
	});
	console.log("Stepped out of the block");
};

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
exports.list = list;
