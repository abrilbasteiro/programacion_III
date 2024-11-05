import express from 'express';

import EstadisticaController from '../../controllers/estadisticaController.js';

const router = express.Router();
const estadisticaController = new EstadisticaController();

router.get('/', estadisticaController.estadisticaReclamos);

export{router};
