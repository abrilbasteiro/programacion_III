import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
app.use(express.json());

app.get('/', (req,res) =>{
    res.status(200).send({'estado':true});
});

app.post('/notificacion', (req, res) => {
    const correoDestino = req.body.correoElectronico;
    console.log(correoDestino);
    
    const filename = fileURLToPath(import.meta.url);
    const dir = path.dirname(`${filename}`);
    
    const plantilla = fs.readFileSync(path.join(dir+'/utiles/handlebars/plantilla.hbs'), 'utf-8');

    const templete = handlebars.compile(plantilla);

    const datos = {
        nombre: 'Carlos',
        reclamo: '1212'
    }

    const correoHtml = templete(datos);

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth:{
            user: process.env.CORREO,
            pass: process.env.CLAVE
        }
    });

    const mailOptions = {
        to: correoDestino,
        subject: "NOTIFICACION",
        html: correoHtml,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if(error){
            console.error("Error sending email: ", error);
        }else{
            console.log("Email sent: ", info.response)
            res.send(true);
        }
        
    });

})

const puerto = process.env.PUERTO;
app.listen(puerto, () =>{
    console.log(`Estoy escuchando en el puerto ${puerto}`);
});