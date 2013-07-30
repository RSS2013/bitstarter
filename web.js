var fs = require('fs');
var infile = "index.html";
var out = "Takes stuff from index.html";
var filebuf= fs.readFileSync(infile);
var express = require('express');
var path = require('path');

var app = express.createServer(express.logger());

//Sets up a database to store usernames and emails
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/Users');

var usersSchema = mongoose.Schema({ name: String, email: String, date: String });
var Users = mongoose.model('Users', usersSchema);
//err callback
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {

console.log("connected successfully to " + "Users DB");	



//Parses jquery content-type tags
app.use(express.bodyParser());


app.get('/', function(request, response) {
  response.send(filebuf.toString());
});

app.post('/success', function(request, response) {

	email = request.body.email;
	password = requesit.body.password;

	HandleUserRegistration(	email, password );
	console.log('email:' + request.body.email);
    console.log('password:' + request.body.passwd);
    console.log('confirmpassword:' + request.body.conpasswd);
	response.end();
});

app.use(express.static(path.join(__dirname, 'public')));
var port = process.env.PORT || 8080;
app.listen(port, function() {
  console.log("Listening on " + port);
});

});

var HandleUserRegistration = function (email,pass){
var addFlag = 1;
//Create user model

//check if email exists in the db
Users.find({ email:email }, function(err, found) {
	
	if(err) {
	
	console.log("trouble reading from db");
	
	}
	else if (found[0].email == email) {
	
	console.log(found);
	console.log("did you already register?");
	addFlag = 0;
	
	}
	console.log("\n the output of found was " + found);
});
	
	


//if yes let the user know and ask if they forgot their password

//if no send an email, add the record to the username database, and let user know that it was successful

//create the User
if (addFlag == 1){
	var User = new Users({email: email, password: pass, date: "7/29/2013"});

	//Save user to Users DB
	User.save( function (err, User) {
		
		if(err) {
			console.log("something bad happened when saving a User");
		}
});

}

}
