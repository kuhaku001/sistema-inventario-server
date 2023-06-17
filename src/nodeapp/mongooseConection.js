const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1/unicorn");

var connection = mongoose.connection;
var disconnect = mongoose.disconnect;

connection.on('connected', function() {
    console.log('database is connected successfully');
});

connection.on('disconnected',function(){
    console.log('database is disconnected successfully');
})

connection.on('error', console.error.bind(console, 'connection error:'));


module.exports = {connection, disconnect};