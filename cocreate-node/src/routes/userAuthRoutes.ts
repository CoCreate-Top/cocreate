import { Router } from "express";
import { userLogin, userLogout, userSignUp } from "../controllers/userAuthController";

const router = Router();

router.post("/signup", userSignUp);

router.post("/login", userLogin);

router.post("/logout", userLogout);

export default router;