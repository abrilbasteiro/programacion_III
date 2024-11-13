import estadisticaReclamos from "../database/estadisticaReclamosDB.js";

export default class EstadisticaService {

    constructor(){
        this.estadistica = new estadisticaReclamos();
    }

    estadisticaReclamos = () => {
    return this.estadistica.estadisticaReclamos();
    }
    
}