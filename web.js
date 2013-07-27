var fs = require('fs');
var infile = "index.html";
var out = "Takes stuff from index.html";
var filebuf= fs.readFileSync(infile);
var express = require('express');
var path = require('path');

var app = express.createServer(express.logger());

app.use(express.bodyParser());


app.get('/', function(request, response) {
  response.send(filebuf.toString());
});

app.post('/success', function(request, response) {
	console.log(request.body.email);
	response.end();
});

app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
