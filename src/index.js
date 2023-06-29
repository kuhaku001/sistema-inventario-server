const express = require('express');
const conectionDB = require('./database/mongooseConection');
const morgan = require('morgan')
const cors = require('cors')

const app = express();

conectionDB.connection;

app.use(morgan('dev'));



app.use(cors());


app.use(express.json());

app.use('/api/cliente', require('./routes/cliente'));

app.use('/api/materiales', require('./routes/materiales'));


app.use('/api/pedidos', require('./routes/pedidos'));

app.use(require('./routes/autentificarUsuario'))

app.listen(3000, () => {
    console.log("Servidor esta funcionando")
})

