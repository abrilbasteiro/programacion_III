// import Notificacion from "../database/notificacion.js";
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path  from 'path';
import { fileURLToPath } from 'url';

export default class NotificacionService{

    enviar = async (correoDestino) => {
        const filename = fileURLToPath(import.meta.url);
        const dir = path.dirname(`${filename}`);
        const plantilla = fs.readFileSync(path.join(dir, '..', 'utiles', 'handlebars', 'plantilla.hbs'), 'utf-8');
        const template = handlebars.compile(plantilla);

        const datos = {
            nombre: 'Juan',
            reclamo: '1234'
        };

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
        };

        return new Promise((resolve, reject) => {
            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error('Error al enviar el correo: ', error);
                    reject(error);
                } else {
                    console.log('Correo enviado correctamente', info.response);
                    resolve(true);
                }
            });
        });
    }
}