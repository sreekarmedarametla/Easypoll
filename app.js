require('./api/data/db.js');
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var session=require('client-sessions');
var routes = require('./api/routes');

// Define the port to run on
app.set('port', 3000);


app.use(session({

  cookieName: 'session',
  secret: 'mscloud_secret_key',
  duration: 150 * 60 * 1000,    //setting the time for active session
  activeDuration: 30 * 60 * 1000,  })); // setting time for the session to be active when the window is open //



// Add middleware to console log every request
app.use(function(req, res, next) {
  console.log(req.method, req.url);
  next();
});

// Set static directory before defining routes
app.use(express.static(path.join(__dirname, 'public')));
app.use('/node_modules', express.static(__dirname + '/node_modules'));
app.use('/fonts', express.static(__dirname + '/fonts'));

// Enable parsing of posted forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Add some routing
app.use('/api', routes);

// Listen for requests
var server = app.listen(app.get('port'), function() {
  var port = server.address().port;
  console.log('Magic happens on port ' + port);
});

