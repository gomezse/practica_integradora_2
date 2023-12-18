import {Router} from 'express';
import { usersManager } from '../dao/models/mongoose/UsersManager.js';
import { jwtValidation } from '../middlewares/jwt.middleware.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
const router =new Router();

router.get('/:idUser',jwtValidation,authMiddleware(["ADMIN","PREMIUM"]),async (req,res)=>{
    const {idUser}=req.params;    
    const user = await usersManager.findById(idUser);
    res.json({message:"User founded successfully",user:user});
})

export default router;