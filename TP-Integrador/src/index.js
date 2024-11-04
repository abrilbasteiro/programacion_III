import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';

//import morgan from 'morgan';
import passport from 'passport';

import { estrategia, validacion } from './config/passport.js';


// middlewares
import validateContentType from './middlewares/validateContentType.js';

// rutas
import { router as v1AuthRouter } from './v1/routes/authRoutes.js';
import { router as  v1ReclamosEstadoRouter } from './v1/routes/reclamosEstadosRoutes.js';
import { router as v1ReclamosRouter } from './v1/routes/reclamosRoutes.js';
import { router as v1UsuariosTipoRouter} from './v1/routes/usuariosTipoRoutes.js';
import { router as v1reclamosTipoRouter} from './v1/routes/reclamosTipoRoutes.js';
import { router as v1oficinasRouter} from './v1/routes/oficinasRoutes.js';
import { router as v1usuariosRouter} from './v1/routes/usuariosRoutes.js';
import { router as v1usuariosOficina} from './v1/routes/usuariosOficinaRoutes.js';




dotenv.config();

const app = express();

app.use(express.json());
app.use(validateContentType);

app.get('/', (req, res) => {
    res.json({'estado':true});
});

passport.use(estrategia);
passport.use(validacion);
app.use(passport.initialize());

app.use('/auth', v1AuthRouter);
app.use('/reclamos-estados', v1ReclamosEstadoRouter);
app.use('/reclamos', passport.authenticate( 'jwt', { session:false }), v1ReclamosRouter);
app.use('/usuarios-tipo', v1UsuariosTipoRouter);
app.use('/reclamos-tipo', v1reclamosTipoRouter);
app.use('/oficinas', v1oficinasRouter);
app.use('/usuarios', v1usuariosRouter);
app.use('/usuarios-oficina', v1usuariosOficina);






const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
