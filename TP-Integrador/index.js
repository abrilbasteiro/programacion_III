import express from 'express';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';
import handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { conexion } from './db/conexion.js';

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


//get
app.get('/reclamos-estados', async (req, res) => {
try{

    const sql = "SELECT * FROM reclamos_ WHERE activo = 1;";

    const [result] = await conexion.query(sql);

    res.status(200).json(result);

} catch(err){

    res.status(500).json({
        mensaje: "Error interno."
    })

}
})

//get id

app.get('/reclamos-estados/:idReclamosEstado', async (req, res) => {
    try{
        const idReclamosEstado = req.params.idReclamosEstado;
        const sql = 'SELECT * FROM reclamos_ WHERE activo = 1 AND idReclamosEstado = ?';
    
        const [result] = await conexion.query(sql, [idReclamosEstado]);

        if(result.length === 0){
        return res.status(404).json({
            mensaje: "No se encontro el estado."
        })
        }
    
        res.status(200).json(result);
    
    } catch(err){
    
        res.status(500).json({
            mensaje: "Error interno."
        })
    
    }
    })

// update patch

app.patch('/reclamos-estados/:idReclamosEstado', async (req, res) => {
    try{

    const {descripcion, activo} = req.body;
    if (!descripcion){
        return res.status(404).json({
            mensaje: "Se requiere el campo descripcion."
        })
    }

    if (!activo){
        return res.status(404).json({
            mensaje: "Se requiere el campo activo."
        })
    }

    const datos = {
        descripcion,
        activo
    }

    const idReclamosEstado = req.params.idReclamosEstado;

    const sql = 'UPDATE reclamos_estado SET ? WHERE idReclamosEstado = ?'
    const result = await conexion.query(sql, [datos, idReclamosEstado]);

    if(result.affectedRows === 0){
        return res.status(404).json({
            mensaje: "No se pudo modificar."    
        })
    }

    res.status(200).json({
        mensaje: "Reclamo modificado."
    })

    }catch(err){
    
        res.status(500).json({
            mensaje: "Error interno."
        })
    
    }
})

//post                     hay que probarlo y mejorarlo

app.post('/reclamos-estados', async (req, res) => {
    try{

    const {descripcion, activo} = req.body;
    if (!descripcion){
        return res.status(404).json({
            mensaje: "Se requiere el campo descripcion."
        })
    }

    if (!activo){
        return res.status(404).json({
            mensaje: "Se requiere el campo activo."
        })
    }

    const datos = {
        descripcion,
        activo
    }

    const idReclamosEstado = req.params.idReclamosEstado;

    const sql = 'INSERT INTO reclamos_estado VALUES (?)'
    const result = await conexion.query(sql, [datos]);


    res.status(200).json({
        mensaje: "Reclamo creado."
    })

    }catch(err){
    
        res.status(500).json({
            mensaje: "Error interno."
        })
    
    }})

const puerto = process.env.PUERTO;
app.listen(puerto, () =>{
    console.log(`Estoy escuchando en el puerto ${puerto}`);
});