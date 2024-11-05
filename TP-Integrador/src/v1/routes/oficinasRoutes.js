import express from "express";
import OficinasController from "../../controllers/oficinasController.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();

const oficinasController = new OficinasController();

router.get("/", autorizarUsuarios([1]), oficinasController.buscarTodos);
router.get(
  "/:idOficina",
  autorizarUsuarios([2, 1]),
  oficinasController.buscarPorId,
);
router.post("/", autorizarUsuarios([1]), oficinasController.crear);
router.patch(
  "/:idOficina",
  autorizarUsuarios([1]),
  oficinasController.modificar,
);

export { router };
