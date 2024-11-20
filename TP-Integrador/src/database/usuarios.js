import { conexion } from "./conexion.js";

export default class Usuarios {
  buscar = async (correoElectronico, contrasenia) => {
    const sql = `SELECT u.idUsuario, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.idTipoUsuario
            FROM usuarios  AS u
            WHERE u.correoElectronico = ? 
                AND u.contrasenia = SHA2(?, 256) 
                AND u.activo = 1;`;
    const [result] = await conexion.query(sql, [
      correoElectronico,
      contrasenia,
    ]);
    return result[0];
  };

  buscarTodos = async () => {
    try {
    const sql =
      'SELECT u.idUsuario, u.nombre, u.apellido, u.correoElectronico, u.contrasenia, ut.descripcion as "Usuario tipo", u.imagen, u.activo FROM `usuarios` as u INNER JOIN usuarios_tipo as ut on ut.idUsuarioTipo = u.idTipoUsuario;';
    const [result] = await conexion.query(sql);
    return result;
  } catch (error) {
    console.error("Error al buscar todos los usuarios:", error);
    throw new Error("Error al obtener los usuarios.");
  }
  };

  buscarPorId = async (idUsuario) => {
    const sql = `SELECT u.idUsuario, CONCAT(u.nombre, ' ', u.apellido) as usuario, u.idTipoUsuario
                FROM usuarios AS u
                WHERE u.idUsuario = ?
                AND u.activo = 1;`;
    const [result] = await conexion.query(sql, [idUsuario]);
    return result[0];
  };

  crear = async ({
    nombre,
    apellido,
    correoElectronico,
    contrasenia,
    idTipoUsuario,
    imagen,
    activo,
  }) => {

    if (!nombre || !apellido || !correoElectronico || !contrasenia || !idTipoUsuario) {
      throw new Error("Faltan datos obligatorios para crear el usuario.");
    }

    const sql =
      "INSERT INTO usuarios (nombre, apellido, correoElectronico, contrasenia, idTipoUsuario, imagen, activo) VALUES (?, ?, ?,SHA2(?, 256), ?, ?, ?)";
    const [result] = await conexion.query(sql, [
      nombre,
      apellido,
      correoElectronico,
      contrasenia,
      idTipoUsuario,
      imagen,
      activo,
    ]);

    return this.buscarPorId(result.insertId);
  };

  modificar = async (idUsuario, datos) => {
    if (!idUsuario || !datos) {
      throw new Error("Datos insuficientes para modificar el usuario.");
    }
    try {
      const sql = "UPDATE usuarios SET ? WHERE idUsuario = ?";
      const [result] = await conexion.query(sql, [datos, idUsuario]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error al modificar el usuario:", error);
      throw new Error("No se pudo modificar el usuario.");
    }
  };

  buscarPorCorreo = async (correoElectronico) => {
    if (!correoElectronico) throw new Error("El correo electrónico es obligatorio.");
    try {
    const query = 'SELECT * FROM usuarios WHERE correoElectronico = ?';
    const [resultado] = await conexion.query(query, [correoElectronico]);
    return resultado.length ? resultado[0] : null;
  } catch (error) {
    console.error("Error al buscar por correo:", error);
    throw new Error("No se pudo buscar el usuario por correo.");
  }
};

}