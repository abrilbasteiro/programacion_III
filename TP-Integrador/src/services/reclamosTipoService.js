import ReclamosTipo from "../database/reclamosTipo.js";

export default class ReclamosTipoService{
    constructor(){
        this.reclamosTipo = new ReclamosTipo();
    }

    buscarTodos = () =>{
        return this.reclamosTipo.buscarTodos();
    }

    buscarPorId = (idReclamosTipo) =>{
        return this.reclamosTipo.buscarPorId(idReclamosTipo);
    }

    crear = (reclamosTipo) => {
        return this.reclamosTipo.crear(reclamosTipo);
    }

    modificar = (idReclamosTipo, datos) => {
        return this.reclamosTipo.modificar(idReclamosTipo, datos);
    }
}

