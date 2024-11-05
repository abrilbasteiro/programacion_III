import express from 'express';
import ReclamosController from '../../controllers/reclamosController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const reclamosController = new ReclamosController();

router.get('/', autorizarUsuarios([1]), reclamosController.buscarTodos);
router.get('/:idReclamo', autorizarUsuarios([3, 2, 1]), reclamosController.buscarPorId);
router.post('/', autorizarUsuarios([3, 1]), reclamosController.crear);
router.patch('/:idReclamo', autorizarUsuarios([1]), reclamosController.modificar);

export {router};