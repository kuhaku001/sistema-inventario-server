const express = require('express');
const conectionDB = require('./database/mongooseConection');

const app = express();

conectionDB.connection;

app.listen(3000, () => {
    console.log("Servidor esta funcionando")
})