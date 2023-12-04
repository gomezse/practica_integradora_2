



// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;

// const opts = {
//   jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//   secretOrKey: 'your_secret_key_here' // Reemplaza con tu clave secreta para validar el token
// };

// passport.use(new JwtStrategy(opts, async (jwtPayload, done) => {
//   try {
//     // Aquí debes verificar y buscar el usuario basado en jwtPayload (contiene la información del token)
//     const user = await User.findById(jwtPayload.id);

//     if (user) {
//       return done(null, user);
//     } else {
//       return done(null, false);
//     }
//   } catch (error) {
//     return done(error, false);
//   }
// }));


////////////////////////////

import jwt from "jsonwebtoken";
const SECRET_KEY_JWT = "secretJWT";

export const jwtValidation = (req, res, next) => {
  try {
    console.log(req);
    const token = req.cookies.token;
    const userToken = jwt.verify(token, SECRET_KEY_JWT);
    req.user = userToken;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};