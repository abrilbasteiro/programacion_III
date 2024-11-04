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

app.post('/notificacion', (req, res) => {
    const correoDestino = req.body.correoElectronico;
    const filename = fileURLToPath(import.meta.url)
    const dir = path.dirname(`${filename}`)
    const plantilla = fs.readFileSync(path.join(dir + '/utiles/handlebars/plantilla.hbs'), 'utf-8')
    const template = handlebars.compile(plantilla)

    const datos = {
        nombre: 'Juan',
        reclamo: '1234'
    }

    const correoHtml = template(datos);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.CORREO,
          pass: process.env.CLAVE,
        },
    });
    
    const mailOptions = {
        to: correoDestino,
        subject: 'Notificacion',
        html: correoHtml
    }
    
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error al enviar el correo: ', error)
        } else {
            console.log('Correo enviado correctamente', info.response)
            res.send(true)
        }
    })
})

app.use('/reclamos-estados', v1ReclamosEstadoRouter);
app.use('/reclamos', v1ReclamosRouter);
app.use('/usuarios-tipo', v1UsuariosTipoRouter);
app.use('/reclamos-tipo', v1reclamosTipoRouter);
app.use('/oficinas', v1oficinasRouter);
app.use('/usuarios', v1usuariosRouter);
app.use('/usuarios-oficina', v1usuariosOficina);

const puerto = process.env.PUERTO;
app.listen(puerto, () => {
    console.log(`Estoy escuchando en ${puerto}`);
});
