import { conexion } from "./conexion.js";

export default class UsuariosTipo{

    buscarTodos = async () => {
        const sql = 'SELECT uo.idUsuarioOficina, u.nombre as Nombre, u.apellido as Apellido,ut.descripcion as Tipo, o.nombre as Oficina FROM `usuarios_oficinas` as uo INNER JOIN usuarios as u on u.idUsuario = uo.idUsuario INNER JOIN usuarios_tipo as ut on ut.idUsuarioTipo = u.idTipoUsuario INNER JOIN oficinas as o on o.idOficina = uo.idOficina;';
        const [result] = await conexion.query(sql);
        return result
    }
}