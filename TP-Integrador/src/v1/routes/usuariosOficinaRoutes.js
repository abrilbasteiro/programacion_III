import express from 'express';
import UsuariosOficinaController from "../../controllers/usuariosOficinaController.js";
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const usuariosOficinaController = new UsuariosOficinaController();

router.get('/', autorizarUsuarios([1]), usuariosOficinaController.buscarTodos);
router.get('/:idUsuarioOficina', autorizarUsuarios([2, 1]), usuariosOficinaController.buscarPorId);
router.post('/', autorizarUsuarios([1]), usuariosOficinaController.crear);
router.patch('/:idUsuarioOficina', autorizarUsuarios([1]), usuariosOficinaController.modificar);

export {router};