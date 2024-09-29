import express from "express";
import { loginUser , signUpUser , logoutUser } from "../controllers/auth.controllers.js";
const router = express.Router();


router.post("/signup" , signUpUser );

router.post("/login" , loginUser );

router.post("/logout" , logoutUser );


export default router;