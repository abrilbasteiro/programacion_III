import { conexion } from "./conexion.js";

export default class Reclamos {
  buscarTodos = async () => {
    const sql = `SELECT r.idReclamo, r.asunto, r.descripcion, r.fechaCreado, r.fechaFinalizado, r.fechaCancelado, 
                        r.idReclamoEstado, re.descripcion AS "Descripción Estado", 
                        r.idReclamoTipo, rt.descripcion AS "Descripción Tipo", 
                        u.nombre AS "Creado por"
                        FROM reclamos AS r
                        INNER JOIN reclamos_tipo AS rt ON rt.idReclamosTipo = r.idReclamoTipo
                        INNER JOIN reclamos_estado AS re ON re.idReclamosEstado = r.idReclamoEstado
                        INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador;`;

    const [result] = await conexion.query(sql);
    return result;
  };

  buscarPorId = async (idReclamo) => {
    const sql = `SELECT * FROM reclamos WHERE idReclamo = ?`;
    const [result] = await conexion.query(sql, [idReclamo]);

    return result.length > 0 ? result[0] : null;
  };

  crear = async ({ asunto, idReclamoTipo, idUsuarioCreador }) => {
    const sql =
      "INSERT INTO reclamos (asunto, fechaCreado, idReclamoTipo, idReclamoEstado, idUsuarioCreador) VALUES (?, NOW(), 1, ?, ?)";
    const [result] = await conexion.query(sql, [
      asunto,
      idReclamoTipo,
      idUsuarioCreador,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({
        mensaje: "No se pudo crear el Reclamo.",
      });
    }

    return this.buscarPorId(result.insertId);
  };

  modificar = async (idReclamo, datos) => {
    const sql = "UPDATE reclamos SET ? WHERE idReclamo = ?";
    return conexion.query(sql, [datos, idReclamo]);
  };

  buscarDatosReportePdf = async () => {
    const sql = 'CALL `datosPDF`()';
    const [result] = await conexion.query(sql);
  
    const datosReporte = {
      reclamosTotales: result[0][0].reclamosTotales,
      reclamosNoFinalizados: result[0][0].reclamosNoFinalizados,
      reclamosFinalizados: result[0][0].reclamosFinalizados,
      descripcionTipoRreclamoFrecuente: result[0][0].descripcionTipoRreclamoFrecuente,
      cantidadTipoRreclamoFrecuente: result[0][0].cantidadTipoRreclamoFrecuente
    };
  
    return datosReporte;
  }

  buscarDatosReporteCsv = async () => {
    const sql = `SELECT r.idReclamo as 'reclamo', rt.descripcion as 'tipo', re.descripcion AS 'estado',
                 DATE_FORMAT(r.fechaCreado, '%Y-%m-%d %H:%i:%s') AS 'fechaCreado', CONCAT(u.nombre, ' ', u.apellido) AS 'cliente'
                FROM reclamos AS r 
                INNER JOIN reclamos_tipo AS rt ON rt.idReclamosTipo = r.idReclamoTipo 
                INNER JOIN reclamos_estado AS re ON re.idReclamosEstado = r.idReclamoEstado 
                INNER JOIN usuarios AS u ON u.idUsuario = r.idUsuarioCreador 
                    WHERE r.idReclamoEstado <> 4;`;

    const [result] = await conexion.query(sql);
    return result;
}
  
}
