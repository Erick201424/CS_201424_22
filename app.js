import express from 'express';
import cors from 'cors';

import { api } from './config/config.js';
import user from './router/user.js';
import parent from './router/parent.js';
import child from './router/child.js';
import image from './router/image.js';


const app = express();

//ROUTERS
app.use('/api/user', user);
app.use('/api/parent', parent);
app.use('/api/child', child);
app.use('/api/image', image);

app.use(cors({
    origin: '*'
}));

//SERVIDOR ACTIVO
app.listen(api.port, () => {
    console.log('Servidor corriendo en el puerto: ', api.port)
})