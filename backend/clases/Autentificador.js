import jwt from 'jsonwebtoken'


export default class Autentificador {

  static isAuth(req, res, next) {
    const authorization = req.headers.authorization;
    if (authorization) {
      const token = authorization.slice(10, authorization.length); // Software2 XXXXXX
      jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
        if (err) {
          res.status(401).send({ message: 'Invalid Token' });
        } else {
          req.user = decode;
          next();
        }
      });
    } else {
      res.status(401).send({ message: 'No Token' });
    }
  };
} 
