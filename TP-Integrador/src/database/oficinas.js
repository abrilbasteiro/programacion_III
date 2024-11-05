import { conexion } from "./conexion.js";

export default class oficinas {
  buscarTodos = async () => {
    const sql =
      'SELECT O.nombre, o.activo, r.descripcion as "Tipo de reclamo" FROM `oficinas` as o INNER JOIN reclamos_tipo as r on r.idReclamosTipo = o.idReclamoTipo;';
    const [result] = await conexion.query(sql);
    return result;
  };

  buscarPorId = async (idOficina) => {
    const sql = `SELECT * FROM oficinas WHERE idOficina = ?`;
    const [result] = await conexion.query(sql, [idOficina]);

    return result.length > 0 ? result[0] : null;
  };

  crear = async ({ nombre, idReclamoTipo, activo }) => {
    const sql =
      "INSERT INTO oficinas (nombre, idReclamoTipo, activo) VALUES (?, ?, ?)";
    const [result] = await conexion.query(sql, [nombre, idReclamoTipo, activo]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "No se pudo crear la Oficina.",
      });
    }

    return this.buscarPorId(result.insertId);
  };

  modificar = async (idOficina, datos) => {
    const sql = "UPDATE oficinas SET ? WHERE idOficina = ?";
    return conexion.query(sql, [datos, idOficina]);
  };
}
