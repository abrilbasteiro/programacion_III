// Modificar para que traiga nombre de usuario y numero de reclamo
import { conexion } from "./conexion.js";

export default class notificacion{

    enviar = async () => {
        const sql = 'SELECT O.nombre, o.activo, r.descripcion as "Tipo de reclamo" FROM `oficinas` as o INNER JOIN reclamos_tipo as r on r.idReclamosTipo = o.idReclamoTipo;';
        const [result] = await conexion.query(sql);
        return result;
    }
}