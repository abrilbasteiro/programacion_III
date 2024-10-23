import ReclamosTipoService from "../services/reclamosTipoService.js";

export default class ReclamosTipoController{
    constructor(){
        this.service = new ReclamosTipoService();
    }

    buscarTodos = async (req, res) =>{
        try {
            const reclamosTipo = await this.service.buscarTodos();
            res.status(200).send(reclamosTipo);
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
            const idReclamosTipo = req.params.idReclamosTipo; 
            const reclamosTipo = await this.service.buscarPorId(idReclamosTipo); 
            if (!reclamosTipo) {
                return res.status(404).send({
                    estado: "Falla",
                    mensaje: "No se encontró el reclamo tipo." 
                });
            }

            res.status(200).send(reclamosTipo);
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
            const reclamosTipo = { descripcion, activo };
            const nuevoReclamosTipo = await this.service.crear(reclamosTipo);
            res.status(201).send({
                estado: "OK", data: nuevoReclamosTipo
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
    
            const idReclamosTipo = req.params.idReclamosTipo;
    
            const reclamosTipoModificado = await this.service.modificar(idReclamosTipo, { descripcion, activo });
    
            if (reclamosTipoModificado.affectedRows === 0) {
                return res.status(404).json({
                    estado: "Falla",
                    mensaje: "No se pudo modificar."
                });
            }
    
            res.status(200).json({
                estado: "OK",
                mensaje: "Reclamos Tipo modificado."
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