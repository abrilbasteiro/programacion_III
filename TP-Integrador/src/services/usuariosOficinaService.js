import UsuariosOficina from "../database/usuariosOficina.js";

export default class UsuariosOficinaService{
    constructor(){
        this.usuariosOficina = new UsuariosOficina();
    }

    buscarTodos = () =>{
        return this.usuariosOficina.buscarTodos();
    }

    buscarPorId = (idUsuarioOficina) =>{
        return this.usuariosOficina.buscarPorId(idUsuarioOficina);
    }

    crear = (usuariosOficina) => {
        return this.usuariosOficina.crear(usuariosOficina);
    }

    modificar = (idUsuarioOficina, datos) => {
        return this.usuariosOficina.modificar(idUsuarioOficina, datos);
    }
}