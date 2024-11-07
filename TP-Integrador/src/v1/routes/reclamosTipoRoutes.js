import express from "express";
import ReclamosTipoController from "../../controllers/reclamosTipoController.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();

const reclamosTipoController = new ReclamosTipoController();

router.get("/", autorizarUsuarios([1]), reclamosTipoController.buscarTodos);
router.get("/:idReclamosTipo", autorizarUsuarios([1]), reclamosTipoController.buscarPorId);
router.post("/", autorizarUsuarios([1]), reclamosTipoController.crear);
router.patch("/:idReclamosTipo", autorizarUsuarios([1]), reclamosTipoController.modificar);

export { router };
