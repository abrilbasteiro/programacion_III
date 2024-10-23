import Express from 'express';

import UsuariosController from "../../controllers/usuariosController.js";


const router = Express.Router();
const usuariosController = new UsuariosController();

router.get('/', usuariosController.buscarTodos);
router.get('/:idUsuario', usuariosController.buscarPorId);
router.post('/', usuariosController.crear);
router.patch('/:idUsuario', usuariosController.modificar);


export {router};