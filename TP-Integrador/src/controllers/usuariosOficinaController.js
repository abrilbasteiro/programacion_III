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

    buscarPorId = async (req, res) => {
        try {
            const idUsuarioOficina = req.params.idUsuarioOficina; 
            const usuariosOficina = await this.service.buscarPorId(idUsuarioOficina); 
            if (!usuariosOficina) {
                return res.status(404).send({
                    estado: "Falla",
                    mensaje: "No se encontró el usuario oficina." 
                });
            }

            res.status(200).send(usuariosOficina);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla",
                mensaje: "Error interno en servidor."
            });
        }
    }

    crear = async (req, res) => {
        const { idUsuario,idOficina,activo } = req.body;

        if (!idUsuario) {
            return res.status(400).send({
                estado: "Falla",
                mensaje: "Se requiere el campo id usuario."
            });
        }

        if (!idOficina) {
            return res.status(400).send({
                estado: "Falla",
                mensaje: "Se requiere el campo id oficina."
            });
        }

        if (activo === undefined || activo === null) {
            return res.status(400).send({
                estado: "Falla",
                mensaje: "Se requiere el campo activo."
            });
        }

        try {
            const usuarioOficina = { idUsuario,idOficina,activo };
            const nuevoUsuarioOficina = await this.service.crear(usuarioOficina);
            res.status(201).send({
                estado: "OK", data: nuevoUsuarioOficina
            });
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla", mensaje: "Error interno en servidor."
            });
        }
    }

    modificar = async (req, res) => {
        try {
            const { activo } = req.body;
    
           
            if (activo === undefined || activo === null) {
                return res.status(400).json({
                    estado: "Falla",
                    mensaje: "Se requiere el campo activo."
                });
            }
    
            const idUsuarioOficina = req.params.idUsuarioOficina;
    
            const usuariosOficinaModificado = await this.service.modificar(idUsuarioOficina, { activo });
    
            if (usuariosOficinaModificado.affectedRows === 0) {
                return res.status(404).json({
                    estado: "Falla",
                    mensaje: "No se pudo modificar."
                });
            }
    
            res.status(200).json({
                estado: "OK",
                mensaje: "Usuarios oficina modificado."
            });
    
        } catch (err) {
            console.error(err);
            res.status(500).json({
                estado: "Falla",
                mensaje: "Error interno."
            });
        }
    }
}