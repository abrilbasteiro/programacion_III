import { conexion } from "./conexion.js";

export default class UsuariosTipo {
  buscarTodos = async () => {
    const sql =
      "SELECT uo.idUsuarioOficina, u.nombre as Nombre, u.apellido as Apellido,ut.descripcion as Tipo, o.nombre as Oficina FROM `usuarios_oficinas` as uo INNER JOIN usuarios as u on u.idUsuario = uo.idUsuario INNER JOIN usuarios_tipo as ut on ut.idUsuarioTipo = u.idTipoUsuario INNER JOIN oficinas as o on o.idOficina = uo.idOficina;";
    const [result] = await conexion.query(sql);
    return result;
  };

  buscarPorId = async (idUsuarioOficina) => {
    const sql =
      "SELECT * FROM `usuarios_oficinas` WHERE activo = 1 AND idUsuarioOficina = ?; ";
    const [result] = await conexion.query(sql, [idUsuarioOficina]);

    return result.length > 0 ? result[0] : null;
  };

  crear = async ({ idUsuario, idOficina, activo }) => {
    const sql =
      "INSERT INTO usuarios_oficinas (idUsuario,idOficina,activo) VALUES (?,?,?);";
    const [result] = await conexion.query(sql, [idUsuario, idOficina, activo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "No se pudo crear el usuario oficinas.",
      });
    }

    return this.buscarPorId(result.insertId);
  };

  modificar = async (idUsuarioOficina, { activo }) => {
    const sql =
      "UPDATE usuarios_oficinas SET  activo = ? WHERE idUsuarioOficina = ?;";
    return await conexion.query(sql, [activo, idUsuarioOficina]);
  };
}
