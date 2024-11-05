import ReclamosEstadosService from "../services/reclamosEstadosService.js";

export default class ReclamosEstadosController {
  constructor() {
    this.service = new ReclamosEstadosService();
  }

  buscarTodos = async (req, res) => {
    try {
      const reclamosEstados = await this.service.buscarTodos();
      res.status(200).send(reclamosEstados);
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
      const idReclamosEstado = req.params.idReclamosEstado;
      const reclamoEstado = await this.service.buscarPorId(idReclamosEstado);
      if (!reclamoEstado) {
        return res.status(404).send({
          estado: "Falla",
          mensaje: "No se encontró el estado.",
        });
      }

      res.status(200).send(reclamoEstado);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  crear = async (req, res) => {
    const { descripcion, activo } = req.body;

    if (!descripcion) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Se requiere el campo descripción.",
      });
    }

    if (activo === undefined || activo === null) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Se requiere el campo activo.",
      });
    }

    try {
      const reclamoEstado = { descripcion, activo };
      const nuevoReclamoEstado = await this.service.crear(reclamoEstado);
      res.status(201).send({
        estado: "OK",
        data: nuevoReclamoEstado,
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
      const { descripcion, activo } = req.body;

      if (!descripcion) {
        return res.status(400).json({
          estado: "Falla",
          mensaje: "Se requiere el campo descripción.",
        });
      }

      if (activo === undefined || activo === null) {
        return res.status(400).json({
          estado: "Falla",
          mensaje: "Se requiere el campo activo.",
        });
      }

      const idReclamosEstado = req.params.idReclamosEstado;

      const reclamoModificado = await this.service.modificar(idReclamosEstado, {
        descripcion,
        activo,
      });

      if (reclamoModificado.affectedRows === 0) {
        return res.status(404).json({
          estado: "Falla",
          mensaje: "No se pudo modificar.",
        });
      }

      res.status(200).json({
        estado: "OK",
        mensaje: "Reclamo modificado.",
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({
        estado: "Falla",
        mensaje: "Error interno.",
      });
    }
  };
}
