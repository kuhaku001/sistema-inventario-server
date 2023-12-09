const express = require('express');
const conectionDB = require('./database/mongooseConection');
const morgan = require('morgan')
const cors = require('cors')
const path = require('path')
require('dotenv').config();

const app = express();

conectionDB.connection;

app.use(morgan('dev'));
app.use(cors());
app.use(express.json());

// esta carpeta sera de uso publico (imagenes de los productos)
app.use('/uploads', express.static(path.resolve('uploads')));

app.use('/api/cliente', require('./routes/cliente'));
app.use('/api/materiales', require('./routes/materiales'));
app.use('/api/pedidos', require('./routes/pedidos'));
app.use('/api/etiqueta', require('./routes/etiqueta'));
app.use('/api/productos', require('./routes/productos'));
app.use('/api/usuario', require('./routes/usuario'));
app.use('/api/cajas', require('./routes/caja'));
app.use('/api/lista', require('./routes/listaCompras'));
app.use('/api/reserva', require('./routes/reservas'));

app.listen(process.env.PORT || 3000, () => {
    console.log("Servidor esta funcionando")
})

