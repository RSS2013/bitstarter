var fs = require('fs');
var infile = "index.html";
var out = "Takes stuff from index.html";
var filebuf= fs.readFileSync(infile);
var express = require('express');
var path = require('path');

var app = express.createServer(express.logger());

app.get('/', function(request, response) {
  response.send(filebuf.toString());
});

app.get('/success.html', function(request, response) {
	response.send("You have submitted a registration request. Thank you!");
});

app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});
