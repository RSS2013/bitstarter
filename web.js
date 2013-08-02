
//Basic require statements
var fs = require('fs');
var infile = "index.html";
var out = "Takes stuff from index.html";
var filebuf= fs.readFileSync(infile);
var express = require('express');
var path = require('path');

//Create server with logger
var app = express.createServer(express.logger());

//Parses jquery content-type tags
app.use(express.bodyParser());

//Sets directory structure
app.use(express.static(path.join(__dirname, 'public')));

//Activates server on given port
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});

//Responds to a url visit with the contents of index.html
app.get('/', function(request, response) {
        
	response.send(filebuf.toString());
});

var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});

//Sets up a database to store usernames and emails
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/UserZ');

var Users = require('./models/user-model.js'); 

//Connects database and throws error to console if connection failed
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));

//After db connection succedes runs the nested code once (maybe run some diagnostics in this later)
db.once('open', function callback() {
	
	console.log("connected successfully to " + "Users DB");	

});

//This is the response generated for a signup submission
app.post('/success', function(request, response) {
	
	var newUser = true;
	email = request.body.email;
	password = request.body.passwd;
	newUser = HandleUserRegistration(email, password );
	console.log("new user is:"+ newUser);
	response.end();

});



//Handles User Registration
var HandleUserRegistration = function (email,pass){

	//flag to check if this email/pass should be added
	var addFlag = true;

	//check if email exists in the db
	Users.find({ email:email }, function(err, found) {

		//Were we able to connect?	
		if(err) {
	
			console.log("trouble reading from db");
	
		}
		//Did we find a matching email in db?
		else if (found.length > 0) {

			addFlag = false;
			
		}

		

		//if no send an email, add the record to the username database, and let user know that it was successful

		//create the User if no email was found
		if (addFlag == true){
			
			// Create a user following the compiled schema (model) from /models/user-model.js
			var User = new Users({email: email, password: pass});

		//Save user to the connected db using the custom middleware defined save in user-model.js (salty crypto)
		User.save( function (err, User) {
			
			if(err) {

				console.log("something bad happened when saving a User");

			}
			
			else {

				console.log("\n\n" + User + "\n\nRegistered");
				
				//Send an email to let user know that it was successful
			}
		
		});


	}

	return addFlag;
});

}
HandleUserSignIn(email, pass) {


