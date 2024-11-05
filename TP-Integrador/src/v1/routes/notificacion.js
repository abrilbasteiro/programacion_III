import express from 'express';
import NotificacionController from '../../controllers/notificacionController.js';
import autorizarUsuarios from '../../middlewares/autorizarUsuarios.js';

const router = express.Router();

const notificacionController = new NotificacionController();

router.post('/', autorizarUsuarios([3]), notificacionController.enviar);

export {router};