import bcrypt from "bcrypt";
import UsuariosService from "../services/usuariosService.js";

export default class UsuariosController {
  constructor() {
    this.service = new UsuariosService();
  }

  buscarTodos = async (req, res) => {
    try {
      const usuarios = await this.service.buscarTodos();
      res.status(200).send(usuarios);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  buscarPorId = async (req, res) => {
    try {
      const idUsuario = req.params.idUsuario;
      const usuario = await this.service.buscarPorId(idUsuario);
      if (!usuario) {
        return res.status(404).send({
          estado: "Falla",
          mensaje: "No se encontró el usuario.",
        });
      }
      res.status(200).send(usuario);
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  crear = async (req, res) => {
    const { nombre, apellido, correoElectronico, contrasenia, tipo_usuario } = req.body;

    if (!nombre || !apellido || !correoElectronico || !contrasenia) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Faltan datos obligatorios.",
      });
    }

    try {
      const usuarioExistente = await this.service.buscarPorCorreo(correoElectronico);
      if (usuarioExistente) {
        return res.status(409).send({
          estado: "Falla",
          mensaje: "El correo ya está registrado.",
        });
      }

      const saltRounds = 10;
      const contrasenaCifrada = await bcrypt.hash(contrasenia, saltRounds);

      const usuario = {
        nombre,
        apellido,
        correoElectronico,
        contrasenia: contrasenaCifrada,
        tipo_usuario: tipo_usuario || "cliente", 
        imagen: req.body.imagen || null,
        activo: req.body.activo !== undefined ? req.body.activo : true, 
      };

      const nuevoUsuario = await this.service.crear(usuario);
      res.status(201).send({
        estado: "OK",
        mensaje: "Usuario creado correctamente.",
        data: nuevoUsuario,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  modificar = async (req, res) => {
    try {
      const idUsuario = req.params.idUsuario;
      const {
        nombre,
        apellido,
        correoElectronico,
        contrasenia,
        idTipoUsuario,
        imagen,
        activo,
      } = req.body;

      if (
        nombre === undefined ||
        apellido === undefined ||
        correoElectronico === undefined ||
        contrasenia === undefined ||
        idTipoUsuario === undefined ||
        imagen === undefined ||
        activo === undefined
      ) {
        return res.status(400).send({
          estado: "Falla",
          mensaje: "Faltan datos obligatorios.",
        });
      }

      const usuarioActualizado = await this.service.modificar(idUsuario, {
        nombre,
        apellido,
        correoElectronico,
        contrasenia,
        idTipoUsuario,
        imagen,
        activo,
      });

      if (!usuarioActualizado) {
        return res.status(404).send({
          estado: "Falla",
          mensaje: "No se encontró el usuario para actualizar.",
        });
      }

      res.status(200).send({
        estado: "OK",
        data: "Usuario Actualizado",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        estado: "Falla",
        mensaje: "Error interno en servidor.",
      });
    }
  };

  registrar = async (req, res) => {
    const { nombre, apellido, correoElectronico, contrasenia } = req.body;

    if (!nombre || !apellido || !correoElectronico || !contrasenia) {
      return res.status(400).send({
        estado: "Falla",
        mensaje: "Todos los campos son obligatorios.",
      });
    }
  
    try {
      const usuarioExistente = await this.service.buscarPorCorreo(correoElectronico);
    if (usuarioExistente) {
      return res.status(409).send({
        estado: "Falla",
        mensaje: "El correo ya está registrado.",
      });
    }

    const saltRounds = 10;
    const contrasenaCifrada = await bcrypt.hash(contrasenia, saltRounds);

    const usuario = {
      nombre,
      apellido,
      correoElectronico,
      contrasenia,
      idTipoUsuario: 3,
      imagen: null, 
      activo: true,
    };

    const nuevoUsuario = await this.service.crear(usuario);
    res.status(201).send({
      estado: "OK",
      mensaje: "Usuario registrado exitosamente.",
      data: nuevoUsuario,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({
      estado: "Falla",
      mensaje: "Error interno en servidor.",
    });
  }
};
}

