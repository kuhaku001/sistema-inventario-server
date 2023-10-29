const { configDotenv } = require('dotenv');
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect(process.env.DB_MONGO_URL);

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