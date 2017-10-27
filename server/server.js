const express = require('express');
const bodyParser = require('body-parser');
const env = require('./config/development');
const routes = require('./routes');
// const socketIo = require('./utils/socketio');
const app = express();
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Request-Headers', '*')
  res.header("Access-Control-Allow-Credentials", "true")
  res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,OPTIONS');
  res.header('Access-Control-Allow-Headers','Origin, X-Requested-With, Content-Type, Accept, Authorization');
  next();});

const http = require('http').Server(app);

// Bring Mongoose into the app 
var mongoose = require( 'mongoose' ); 

// Build the connection string 
var dbURI = 'mongodb://localhost/gag-mongo'; 

// Create the database connection 
mongoose.connect(dbURI); 

// CONNECTION EVENTS
// When successfully connected
mongoose.connection.on('connected', function () {  
  console.log('Mongoose default connection open to ' + dbURI);
}); 

// If the connection throws an error
mongoose.connection.on('error',function (err) {  
  console.log('Mongoose default connection error: ' + err);
}); 

// When the connection is disconnected
mongoose.connection.on('disconnected', function () {  
  console.log('Mongoose default connection disconnected'); 
});



// const io = require('socket.io')(http);
routes(app);
// socketIo(io);
// require('./services/connect');
http.listen(env.port);