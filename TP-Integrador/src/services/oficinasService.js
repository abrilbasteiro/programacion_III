import Oficinas from "../database/oficinas.js";

export default class OficinasService {
  constructor() {
    this.oficinas = new Oficinas();
  }

  buscarTodos = () => {
    return this.oficinas.buscarTodos();
  };

  buscarPorId = (idOficina) => {
    return this.oficinas.buscarPorId(idOficina);
  };

  crear = (oficina) => {
    return this.oficinas.crear(oficina);
  };

  modificar = (idOficina, datos) => {
    return this.oficinas.modificar(idOficina, datos);
  };
}
