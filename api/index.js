const express = require('express');
const { status } = require('express/lib/response');
const res = require('express/lib/response');
const cors = require('cors');

// npm i cors --save
const config = require('../config.js');
const user = require('./components/user/network.js')

const app = express();  

//ROUTERS
app.use('/api/user', user);
app.use(cors({origin: true, credential: true}));

//Servidor activo
app.listen(config.api.port, () => {
    console.log('Servidor corriendo en el puerto en el puerto =>', config.api.port)
}
);