const express = require("express");

const app = express();

app.use(express.static("public"));
app.use("/static", express.static("public"));


app.get('/', (req, res) => {
    //res.sendFile(__dirname + "/index.html")
    userModel.find((err, docs) => {
        if (!err) {
            res.render("list", {
                data: docs
            });
        } else {
            console.log('Failed to retrieve the Course List: ' + err);
        }
    });
})

app.get('/menu', (req, res) => {
    res.sendFile(__dirname + "/menu.html") // no funciona
})

app.listen(3000)