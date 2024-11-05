import express from 'express';

import UsuariosTipoController from '../../controllers/usuariosTipoController.js';

const router = express.Router();
const usuariosTipoController = new UsuariosTipoController();

router.get('/', usuariosTipoController.buscarTodos);
router.get('/:idUsuariosTipo', usuariosTipoController.buscarPorId);
router.post('/', usuariosTipoController.crear);
router.patch('/:idUsuariosTipo', usuariosTipoController.modificar);


export{router};
