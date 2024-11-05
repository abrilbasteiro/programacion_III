import NotificacionService from "../services/notificacionService.js";

export default class NotificacionController {
  constructor() {
    this.service = new NotificacionService();
  }

  enviar = async (req, res) => {
    try {
      const correoDestino = req.body.correoElectronico;
      await this.service.enviar(correoDestino);
      res
        .status(200)
        .send({ estado: "Éxito", mensaje: "Notificación enviada" });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };
}
