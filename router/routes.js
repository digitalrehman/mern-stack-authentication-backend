import express from "express";
import { login, signUp, emailVerify, logout, forgotPassword, resetPassword, check_Token } from "../controllers/controller.js";
import verify_Token from "../middleware/auth.js";
let routes = express.Router();
routes.get('/checkAuthentication', verify_Token, check_Token)
routes.post("/signup", signUp)
routes.post("/login", login)
routes.post("/emailverify", emailVerify)
routes.post("/logout", logout)
routes.post("/forgot-password", forgotPassword)
routes.post("/reset-password/:token", resetPassword)

export default routes