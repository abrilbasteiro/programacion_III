import express from 'express';

import ReclamosTipoController from "../../controllers/reclamosTipoController.js";

const router = express.Router();

const reclamosTipoController = new ReclamosTipoController();

router.get('/', reclamosTipoController.buscarTodos);
router.get('/:idReclamosTipo', reclamosTipoController.buscarPorId);
router.post('/', reclamosTipoController.crear);
router.patch('/:idReclamosTipo', reclamosTipoController.modificar);




export {router};
