export default class verificarAdmin {
  static esAdmin(req, res, next) {
    if (req.user && req.user.isAdmin) {
      next();
    } else {
      res.status(401).send({ message: "Token Invalida" });
    }
  }
}
