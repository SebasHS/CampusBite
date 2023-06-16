import  jwt  from "jsonwebtoken";

export default class generadorToken{
//Esta clase tiene el metodo generarToken utilizado para generar el token del usuario que servira para una funcion en especÃ­fico
    static generarToken(user){
        return jwt.sign(
            {
              _id: user._id,
              name: user.name,
              email: user.email,
              isAdmin: user.isAdmin,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '30d',
            }
          );
    }    
    
}
