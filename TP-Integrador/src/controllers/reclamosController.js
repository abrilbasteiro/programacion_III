import ReclamosService from "../services/reclamosService.js";

export default class ReclamosController {
  constructor() {
    this.service = new ReclamosService();
  }

  buscarTodos = async (req, res) => {
    try {
      const reclamos = await this.service.buscarTodos();
      res.status(200).send(reclamos);
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
      const idReclamo = req.params.idReclamo;
      const reclamo = await this.service.buscarPorId(idReclamo);
      if (!reclamo) {
        return res.status(404).send({
          estado: "Falla",
          mensaje: "No se encontró el reclamo.",
        });
      }
      res.status(200).send(reclamo);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  crear = async (req, res) => {
    const { asunto, idReclamoTipo, idUsuarioCreador } = req.body;

    if (
      asunto === undefined ||
      idReclamoTipo === undefined ||
      idUsuarioCreador === undefined
    ) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Faltan datos obligatorios.",
      });
    }

    try {
      const reclamo = {
        asunto,
        idReclamoTipo,
        idUsuarioCreador,
      };

      const nuevoReclamo = await this.service.crear(reclamo);
      res.status(201).send({
        estado: "OK",
        data: nuevoReclamo,
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
      const idReclamo = req.params.idReclamo;
      const { asunto, descripcion, idReclamoTipo, idReclamoEstado } = req.body;

      if (
        asunto === undefined ||
        descripcion === undefined ||
        idReclamoTipo === undefined ||
        idReclamoEstado === undefined
      ) {
        return res.status(400).send({
          estado: "Falla",
          mensaje: "Faltan datos obligatorios.",
        });
      }

      const reclamoActualizado = await this.service.modificar(idReclamo, {
        asunto,
        descripcion,
        idReclamoTipo,
        idReclamoEstado,
      });

      if (!reclamoActualizado) {
        return res.status(404).send({
          estado: "Falla",
          mensaje: "No se encontró el reclamo para actualizar.",
        });
      }

      res.status(200).send({
        estado: "OK",
        data: "Reclamo Actualizado",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    } 
  };

  informe = async (req, res) => {
    const formatosPermitidos = ["pdf", "csv"];
    try {
      const formato = req.body.formato;
      
      console.log(formato)
      if (!formato || !formatosPermitidos.includes(formato)) {
        return res.status(400).send({
          estado: "Falla",
          mensaje: "Formato inválido para el informe."
        });
      }
  
      const { buffer, path, headers } = await this.service.generarInforme(formato);
  
      res.set(headers);
  
      if (formato === 'pdf') {
        res.status(200).end(buffer);
      } else if (formato === 'csv') {
        res.status(200).download(path, (err) => {
          if (err) {
            return res.status(500).send({
              estado: "Falla",
              mensaje: "No se pudo generar el informe."
            });
          }
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor."
      });
    }
  }
  
}
