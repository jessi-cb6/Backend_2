require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const http = require('http');
const cors = require('cors'); //  importar CORS

const app = express();

// Usar CORS
app.use(cors()); 

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended:false }));

app.get('/', (req, res) => res.status(200).send({
    message: 'Bienvenido a la API REST de compras.',
}));

// Rutas
require('./routes/route_categorias')(app);
require('./routes/route_usuarios')(app);
require('./routes/route_productos')(app);
require('./routes/route_carrito')(app);
require('./routes/route_carrito_detalle')(app);

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

module.exports = app;