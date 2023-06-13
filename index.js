const express = require("express");

const app = express();

app.use(express.static("public"));
app.use("/static", express.static("public"));


app.get('/', (req, res) => {
    res.sendFile(__dirname + "/index.html")
})

app.get('/menu', (req, res) => {
    res.sendFile(__dirname + "/menu.html") // no funciona
})

app.listen(3000)