import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import { Strategy as LocalSrategy } from "passport-local";
import UsuariosService from "../services/usuariosService.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
dotenv.config();

const estrategia = new LocalSrategy(
  {
    usernameField: "correoElectronico",
    passwordField: "contrasenia",
  },
  async (correoElectronico, contrasenia, done) => {
    try {
      const service = new UsuariosService();
      const usuario = await service.buscar(correoElectronico, contrasenia);
      if (!usuario) {
        return done(null, false, { mensaje: "Login incorrecto!" });
      }

      const esContraseñaValida = await bcrypt.compare(contrasenia, usuario.contrasenia);
      if (!esContraseñaValida) {
        return done(null, false, { mensaje: "Login incorrecto!" });
      }

      return done(null, usuario, { mensaje: "Login correcto!" });
    } catch (exc) {
      done(exc);
    }
  },
);

const validacion = new JwtStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
  },
  async (jwtPayload, done) => {
    try {
     const service = new UsuariosService();
     const usuario = await service.buscarPorId(jwtPayload.idUsuario);
     if (!usuario) {
      return done(null, false, { mensaje: "Token incorrecto!" });
    }

    return done(null, usuario);
  } catch (exc) {
    return done(exc);
  }
 }

);

export { estrategia, validacion };
