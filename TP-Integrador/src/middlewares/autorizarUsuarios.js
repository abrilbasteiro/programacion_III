export default function autorizarUsuarios(perfilAutorizados = []) {
  return (req, res, next) => {
    const usuario = req.user;
    console.log("usuario", usuario);
    if (!usuario || !perfilAutorizados.includes(usuario.idUsuarioTipo)) {
      return res.status(403).json({
        estado: "Flla",
        mesaje: "Acceso denegado.",
      });
    }

    next();
  };
}
