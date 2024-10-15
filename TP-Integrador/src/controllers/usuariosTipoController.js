import UsuariosTipoService from "../services/usuariosTipoService.js";

export default class UsuariosTipoController {
    constructor() {
        this.service = new UsuariosTipoService();
    }

    buscarTodos = async (req, res) => {
        try {
            const usuariosTipo = await this.service.buscarTodos();
            res.status(200).send(usuariosTipo);
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
            const idUsuariosTipo = req.params.idUsuariosTipo; 
            const usuariosTipo = await this.service.buscarPorId(idUsuariosTipo); 
            if (!usuariosTipo) {
                return res.status(404).send({
                    estado: "Falla",
                    mensaje: "No se encontró el usuario tipo." 
                });
            }

            res.status(200).send(usuariosTipo);
        } catch (error) {
            console.log(error);
            res.status(500).send({
                estado: "Falla",
                mensaje: "Error interno en servidor."
            });
        }
    }

    crear = async (req, res) => {
        const { descripcion, activo } = req.body;

        if (!descripcion) {
            return res.status(400).send({
                estado: "Falla",
                mensaje: "Se requiere el campo descripción."
            });
        }

        if (activo === undefined || activo === null) {
            return res.status(400).send({
                estado: "Falla",
                mensaje: "Se requiere el campo activo."
            });
        }

        try {
            const usuariosTipo = { descripcion, activo };
            const nuevoUsuariosTipo = await this.service.crear(usuariosTipo);
            res.status(201).send({
                estado: "OK", data: nuevoUsuariosTipo
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
            const { descripcion, activo } = req.body;
    
            if (!descripcion) {
                return res.status(400).json({
                    estado: "Falla",
                    mensaje: "Se requiere el campo descripción."
                });
            }
    
            if (activo === undefined || activo === null) {
                return res.status(400).json({
                    estado: "Falla",
                    mensaje: "Se requiere el campo activo."
                });
            }
    
            const idUsuariosTipo = req.params.idUsuariosTipo;
    
            const usuariosTipoModificado = await this.service.modificar(idUsuariosTipo, { descripcion, activo });
    
            if (usuariosTipoModificado.affectedRows === 0) {
                return res.status(404).json({
                    estado: "Falla",
                    mensaje: "No se pudo modificar."
                });
            }
    
            res.status(200).json({
                estado: "OK",
                mensaje: "Usuarios Tipo modificado."
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
