import UsuariosTipo from "../database/usuariosTipo.js";

export default class UsuariosTipoService {
  constructor() {
    this.usuariosTipo = new UsuariosTipo();
  }

  buscarTodos = () => {
    return this.usuariosTipo.buscarTodos();
  };

  buscarPorId = (idUsuariosTipo) => {
    return this.usuariosTipo.buscarPorId(idUsuariosTipo);
  };

  crear = (usuariosTipo) => {
    return this.usuariosTipo.crear(usuariosTipo);
  };

  modificar = (idUsuariosTipo, datos) => {
    return this.usuariosTipo.modificar(idUsuariosTipo, datos);
  };
}
