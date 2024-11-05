import UsuariosOficina from "../database/usuariosOficina.js";

export default class UsuariosOficinaService{
    constructor(){
        this.usuariosOficina = new UsuariosOficina();
    }

    buscarTodos = () =>{
        return this.usuariosOficina.buscarTodos();
    }
}