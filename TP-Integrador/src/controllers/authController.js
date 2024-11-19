import jwt from "jsonwebtoken";
import passport from "passport";
import dotenv from "dotenv";
dotenv.config();

export default class AuthController {
  login = async (req, res) => {
    passport.authenticate("local", { session: false }, (err, usuario, info) => {

      if (err || !usuario) {
        return res.status(400).json({
          estado: "Falla",
          mensaje: "Solicitud incorrecta.",
        });
      }

      req.login(usuario, { session: false }, (err) => {

        if (err) {
          return res.status(500).send("Error en el login");
        }


        const token = jwt.sign(
          { idUsuario: usuario.idUsuario, correoElectronico: usuario.correoElectronico },
          process.env.JWT_SECRET,
          { expiresIn: "15m" }
        );


        return res.status(200).json({ estado: "OK", token });
      });
    })(req, res);
  };
}
