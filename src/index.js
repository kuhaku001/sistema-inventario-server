const express = require('express');
const conectionDB = require('./database/mongooseConection');
const morgan = require('morgan')

const app = express();

conectionDB.connection;

app.use(morgan('dev'));

app.use(express.json());

app.use(require('./routes/autentificarUsuario'))

app.listen(3000, () => {
    console.log("Servidor esta funcionando")
})

