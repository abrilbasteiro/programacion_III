import { conexion } from "./conexion.js";

export default class UsuariosTipo{
    
    buscarTodos = async () => {
        const sql = 'SELECT * FROM `usuarios_tipo` WHERE activo = 1;';
        const [result] = await conexion.query(sql);
        return result
    }

    buscarPorId = async (idUsuariosTipo)=> {
        const sql = 'SELECT * FROM `usuarios_tipo` WHERE activo = 1 AND idUsuarioTipo = ?;';
        const [result] = await conexion.query(sql,[idUsuariosTipo]);

        return (result.length > 0) ? result[0] : null;
    }

    crear = async ({ descripcion, activo })=> {
        const sql = 'INSERT INTO usuarios_tipo (descripcion,activo) VALUES (?,?);';
        const [result] = await conexion.query(sql, [descripcion, activo]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo crear el usuario tipo." 
            })
        }
        
        return this.buscarPorId(result.insertId)
    }

    modificar = async (idUsuariosTipo, { descripcion, activo }) => {
        const sql = 'UPDATE usuarios_tipo SET descripcion = ?, activo = ? WHERE idUsuarioTipo = ?;';
        return await conexion.query(sql, [descripcion, activo, idUsuariosTipo]);
    }
    

}