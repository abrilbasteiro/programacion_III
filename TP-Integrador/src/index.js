import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';

// middlewares
import validateContentType from './middlewares/validateContentType.js';

// rutas
import { router as  v1ReclamosEstadoRouter } from './v1/routes/reclamosEstadosRoutes.js';
import { router as v1ReclamosRouter } from './v1/routes/reclamosRoutes.js';
import { router as v1UsuariosTipoRouter} from './v1/routes/usuariosTipoRoutes.js';
import { router as v1reclamosTipoRouter} from './v1/routes/reclamosTipoRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(validateContentType);

app.get('/', (req, res) => {
    res.json({'estado':true});
});

app.use('/reclamos-estados', v1ReclamosEstadoRouter);
app.use('/reclamos', v1ReclamosRouter);
app.use('/usuarios-tipo', v1UsuariosTipoRouter);
app.use('/reclamos-tipo', v1reclamosTipoRouter);



const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
