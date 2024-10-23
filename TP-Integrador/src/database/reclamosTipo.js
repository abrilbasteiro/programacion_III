import { conexion } from "./conexion.js";

export default class ReclamosTipo{

    buscarTodos = async () => {
        const sql = 'SELECT * FROM `reclamos_tipo` WHERE activo = 1; ';
        const [result] = await conexion.query(sql);
        return result
    }

    buscarPorId = async (idReclamosTipo) => {
        const sql = 'SELECT * FROM `reclamos_tipo` WHERE activo = 1 AND idReclamosTipo = ?; ';
        const [result] = await conexion.query(sql,[idReclamosTipo]);

        return (result.length > 0) ? result[0] : null;

    }

    crear = async ({ descripcion, activo })=> {
        const sql = 'INSERT INTO reclamos_tipo (descripcion,activo) VALUES (?,?);';
        const [result] = await conexion.query(sql, [descripcion, activo]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo crear el usuario tipo." 
            })
        }
        
        return this.buscarPorId(result.insertId)
    }

    modificar = async (idReclamosTipo, { descripcion, activo }) => {
        const sql = 'UPDATE reclamos_tipo SET descripcion = ?, activo = ? WHERE idReclamosTipo = ?;';
        return await conexion.query(sql, [descripcion, activo, idReclamosTipo]);
    }

}