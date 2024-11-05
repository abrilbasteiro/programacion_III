import UsuariosOficinaService from "../services/usuariosOficinaService.js";

export default class UsuariosOficinaController{
    constructor(){
        this.service = new UsuariosOficinaService ();
    }

    buscarTodos = async (req, res) => {
        try {
            const usuariosOficina = await this.service.buscarTodos();
            res.status(200).send(usuariosOficina);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla", 
                mensaje: "Error interno en servidor."
            });
        }
    }
}