import EstadisticaService from "../services/estadisticaService.js";

export default class EstadisticaController{

    constructor (){
        this.service = new EstadisticaService();
    }

    estadisticaReclamos = async (req, res) => {
    try{
        const estadisticaReclamos = await this.service.estadisticaReclamos();
        res.status(200).json({estado:'OK', dato:estadisticaReclamos});
    }catch (error){
        console.log(error);
        res.status(500).send({
            estado:"Falla", mensaje: "Error interno en servidor."
        });
    }
  }
}
