import express from 'express';

import UsuariosOficinaController from "../../controllers/usuariosOficinaController.js";

const router = express.Router();

const usuariosOficinaController = new UsuariosOficinaController();

router.get('/', usuariosOficinaController.buscarTodos);
//router.get('/:idUsuarioOficina', usuariosOficinaController.buscarPorId);
//router.post('/', usuariosOficinaController.crear);
//router.patch('/:idUsuarioOficina', usuariosOficinaController.modificar);




export {router};