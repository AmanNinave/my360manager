import express from "express";
import { loginUser , signUpUser , logoutUser, updateUser } from "../controllers/auth.controllers.js";
const router = express.Router();


router.post("/signup" , signUpUser );

router.post("/login" , loginUser );

router.post("/logout" , logoutUser );

router.put("/update" , updateUser);
export default router;