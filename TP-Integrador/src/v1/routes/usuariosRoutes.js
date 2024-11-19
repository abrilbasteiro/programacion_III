import Express from "express";
import UsuariosController from "../../controllers/usuariosController.js";
import autorizarUsuarios from "../../middlewares/autorizarUsuarios.js";

const router = Express.Router();
const usuariosController = new UsuariosController();

router.get("/", autorizarUsuarios([1]), usuariosController.buscarTodos);
router.get(
  "/:idUsuario",
  autorizarUsuarios([1]),
  usuariosController.buscarPorId,
);
router.post("/", autorizarUsuarios([1]), usuariosController.crear);
router.patch(
  "/:idUsuario",
  autorizarUsuarios([3]),
  usuariosController.modificar,
);

router.post("/registrar", usuariosController.registrar);

export { router };
