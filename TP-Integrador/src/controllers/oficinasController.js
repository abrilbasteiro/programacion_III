import OficinasService from "../services/oficinasService.js";

export default class OficinasController {
  constructor() {
    this.service = new OficinasService();
  }

  buscarTodos = async (req, res) => {
    try {
      const oficinas = await this.service.buscarTodos();
      res.status(200).send(oficinas);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const idOficina = req.params.idOficina;
      const oficina = await this.service.buscarPorId(idOficina);
      if (!oficina) {
        return res.status(404).send({
          estado: "Falla",
          mensaje: "No se encontró la oficina.",
        });
      }
      res.status(200).send(oficina);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  crear = async (req, res) => {
    const { nombre, idReclamoTipo, activo } = req.body;

    if (
      nombre === undefined ||
      idReclamoTipo === undefined ||
      activo === undefined
    ) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Faltan datos obligatorios.",
      });
    }

    try {
      const oficina = {
        nombre,
        idReclamoTipo,
        activo,
      };

      const nuevaOficina = await this.service.crear(oficina);
      res.status(201).send({
        estado: "OK",
        data: nuevaOficina,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  modificar = async (req, res) => {
    try {
      const idOficina = req.params.idOficina;
      const { nombre, idReclamoTipo, activo } = req.body;

      if (
        nombre === undefined ||
        idReclamoTipo === undefined ||
        activo === undefined
      ) {
        return res.status(400).send({
          estado: "Falla",
          mensaje: "Faltan datos obligatorios.",
        });
      }

      const oficinaActualizada = await this.service.modificar(idOficina, {
        nombre,
        idReclamoTipo,
        activo,
      });

      if (!oficinaActualizada) {
        return res.status(404).send({
          estado: "Falla",
          mensaje: "No se encontró la oficina para actualizar.",
        });
      }

      res.status(200).send({
        estado: "OK",
        data: "Oficina Actualizada",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };
}
