
export const authMiddleware = (roles) => {  
  console.log('llego')
    return (req, res, next) => {
      if (roles.includes("PUBLIC")) {      
        return next();
      }      
      if (!roles.includes(req.user.role)) {           
        return res.redirect("/error-login");
        // return res.status(403).json({message:"Not authorized"});
      next();
    };
  }
};