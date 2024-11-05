import express from "express";
import UsuariosTipoController from "../../controllers/usuariosTipoController.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = express.Router();
const usuariosTipoController = new UsuariosTipoController();

router.get("/", autorizarUsuarios([1]), usuariosTipoController.buscarTodos);
router.get(
  "/:idUsuariosTipo",
  autorizarUsuarios([1]),
  usuariosTipoController.buscarPorId,
);
router.post("/", autorizarUsuarios([1]), usuariosTipoController.crear);
router.patch(
  "/:idUsuariosTipo",
  autorizarUsuarios([1]),
  usuariosTipoController.modificar,
);

export { router };
