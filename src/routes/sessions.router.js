import { Router } from "express";
import { usersManager } from "../dao/models/mongoose/UsersManager.js";
import { hashData, compareData, generateToken } from "../utils.js";
import passport from "passport";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/signup", async (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ message: "Los campos son obligatorios" });
  }
  try {
    const hashedPassword = await hashData(password);
    const createdUser = await usersManager.createOne({
      ...req.body,
      password: hashedPassword,
      role: "PREMIUM",
    });
    res.status(200).json({ message: "Usuario creado", user: createdUser });
  } catch (error) {
    res.status(500).json({ error });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Todos los campos son requeridos" });
  }
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect("/signup");
    }    
    const isPasswordValid = await compareData(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Contraseña no válida" });
    }
  
    //jwt
    const { first_name, last_name, role } = user;
    const token = generateToken({ first_name, last_name, email, role });
    
    res
      .status(200)
      .cookie("token", token, { httpOnly: true })      
      .json({ message: "Bienvenido a la pagina: ", token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});



router.get(
  "/auth/github",
  passport.authenticate("github", { scope: ["user:email"] })
);

router.get("/callback", passport.authenticate("github", {
  successRedirect: "/profile", 
  failureRedirect: "/error" 
}));



router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { failureRedirect: "/error" }),
  (req, res) => {        
    res.redirect("/profile");
  }
);

router.get("/signout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});




router.get(
  "/current",
  passport.authenticate("jwt",{ session: false }),
  authMiddleware(["PUBLIC"]),
  async (req, res) => {
   
    const user = req.user;
    console.log('Usuario',user);
    res.json({ message:user });
  }
);

router.get("/signout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});


router.post("/restaurar", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersManager.findByEmail(email);
    if (!user) {
      return res.redirect("/");
    }
    const hashedPassword = await hashData(password);
    user.password = hashedPassword;
    await user.save();
    res.status(200).json({ message: "Password updated" });
  } catch (error) {
    res.status(500).json({ error });
  }
});

export default router;


// export default router;



