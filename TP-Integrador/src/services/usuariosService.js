import Usuarios from "../database/usuarios.js";

export default class UsuariosService{

    constructor() {
        this.usuarios = new Usuarios();
    }

    buscar = (correoElectronico, contrasenia) => {
        return this.usuarios.buscar(correoElectronico, contrasenia);
    }

    buscarTodos = () => {
        return this.usuarios.buscarTodos();
    }

    buscarPorId = (idUsuario) => {
        return this.usuarios.buscarPorId(idUsuario);
    }

    crear = (usuario) => {
        return this.usuarios.crear(usuario);
    }

    modificar = (idUsuario, datos) => {
        return this.usuarios.modificar(idUsuario, datos);
    }

}