import { conexion } from "./conexion.js";

export default class Usuarios{
    buscarTodos = async () => {
        const sql = 'SELECT u.idUsuario, u.nombre, u.apellido, u.correoElectronico, u.contrasenia, ut.descripcion as "Usuario tipo", u.imagen, u.activo FROM `usuarios` as u INNER JOIN usuarios_tipo as ut on ut.idUsuarioTipo = u.idTipoUsuario;';
        const [result] = await conexion.query(sql);
        return result;
    }

    buscarPorId = async (idUsuario) => {
        const sql = `SELECT * FROM usuarios WHERE idUsuario = ?`;
        const [result] = await conexion.query(sql, [idUsuario]);
        
        return (result.length > 0) ? result[0] : null;
    }

    crear = async ({nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo}) => {

        const sql = 'INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo) VALUES (?, ?, ?,SHA2(?, 256), ?, ?, ?)';
        const [result] = await conexion.query(sql, [nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo]);

        if (result.affectedRows === 0) {
            return res.status(404).json({
                mensaje: "No se pudo crear el usuario." 
            })
        }
        
        return this.buscarPorId(result.insertId);
    }

    modificar = async (idUsuario, datos) => {
        const sql = 'UPDATE usuarios SET ? WHERE idUsuario = ?';
        return conexion.query(sql, [datos, idUsuario]);
    }
}