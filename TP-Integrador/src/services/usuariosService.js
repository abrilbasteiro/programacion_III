import Usuarios from "../database/usuarios.js";
import bcrypt from 'bcrypt';

export default class UsuariosService {
  constructor() {
    this.usuarios = new Usuarios();
  }

  buscar = (correoElectronico, contrasenia) => {
    return this.usuarios.buscar(correoElectronico, contrasenia);
  };

  buscarTodos = () => {
    return this.usuarios.buscarTodos();
  };

  buscarPorId = (idUsuario) => {
    return this.usuarios.buscarPorId(idUsuario);
  };

  crear = async (usuario) => {
    const usuarioExistente = await this.buscarPorCorreo(usuario.correoElectronico);
    if (usuarioExistente) {
      throw new Error('El correo ya está registrado.');
    }

    usuario.contrasenia = await bcrypt.hash(usuario.contrasenia, 10);

    return this.usuarios.crear(usuario);
  };

  modificar = (idUsuario, datos) => {
    return this.usuarios.modificar(idUsuario, datos);
  };

  buscarPorCorreo = async (correoElectronico) => {
    const query = 'SELECT * FROM usuarios WHERE correoElectronico = ?';
    const [resultado] = await conexion.query(query, [correoElectronico]);
    return resultado.length ? resultado[0] : null;
  };
  

}
