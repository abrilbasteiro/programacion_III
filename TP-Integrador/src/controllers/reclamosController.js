import ReclamosService from "../services/reclamosService.js";
const PDFDocument = require('pdfkit');

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

  reclamosPDF = async (req, res) => {
    try {
    
      const estadistica = await this.service.buscarTodos();

      if(estadistica){
          const doc = new PDFDocument();
          
          res.setHeader('Content-Type', 'application/pdf');
          res.setHeader('Content-Disposition', 'attachment; filename="reclamos.pdf"');
      
          doc.pipe(res);

          //PDF
          doc.text('Lista de datos en PDF');
          estadistica.forEach( async element => {
              doc.text(element.asunto + ' ' + element.idReclamoTipo + ' ' + element.idUsuarioCreador)
          });

          doc.end();
      }
    } catch (error) {
        console.log(error);
        res.status(500).send({
            estado: "Falla", mensaje: "Error interno en servidor."
        });
    }
  }
}
