import express from "express";
import ReclamosEstadosController from "../../controllers/reclamosEstadosController.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();

const reclamosEstadosController = new ReclamosEstadosController();

router.get("/", autorizarUsuarios([1, 2, 3]), reclamosEstadosController.buscarTodos);
router.get("/:idReclamosEstado", autorizarUsuarios([1, 2, 3]), reclamosEstadosController.buscarPorId);
router.post("/", autorizarUsuarios([1, 2]), reclamosEstadosController.crear);
router.patch(
  "/:idReclamosEstado",
  autorizarUsuarios([1, 2]),
  reclamosEstadosController.modificar,
);

export { router };
