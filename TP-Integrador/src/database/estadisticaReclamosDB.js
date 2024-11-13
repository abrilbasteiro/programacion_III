import { conexion } from "./conexion.js"; // revisar conexion

const estadisticaReclamos = async () => {

    //este procedimiento deberia retornar 2 valores de forma separada que representen la cantidad de reclamos creados y cancelados    
    const consulta = 'call procEstadisticaReclamos()'; 

    const [results] = await conexion.query(consulta);
    
    const reclamosCreados = results[0][0].reclamosCreados;
    const reclamosCancelados = results[0][0].reclamosCancelados;

    const datos = {
        reclamosCreados : reclamosCreados,
        reclamosCancelados : reclamosCancelados
    }
    return datos
}

module.exports = {
    estadisticaReclamos
}