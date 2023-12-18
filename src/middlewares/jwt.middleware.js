import jwt from "jsonwebtoken";
const SECRET_KEY_JWT = "secretJWT";
//con request.header
// export const jwtValidation = (req, res, next) => {
//   try {
//     const authHeader =req.get("Authorization");
//     const token = authHeader.split(" ")[1];
//     const userToken = jwt.verify(token, SECRET_KEY_JWT);
    
//     req.user=userToken;
//     next();
//   } catch (error) {
//     res.json({ error: error.message });
//   }
// };

//con cookies
export const jwtValidation = (req, res, next) => {
  try {
    const token = req.cookies.token;
    const userToken = jwt.verify(token, SECRET_KEY_JWT);
    req.user = userToken;
    next();
  } catch (error) {
    res.json({ error: error.message });
  }
};

