const express = require("express");
const mongoose = require("mongoose");

var text = mongoose.connect('mongodb://localhost:27017/')

const app = express();

app.get('/', (req, res) => {
    res.send(text)
})

app.listen(3000)