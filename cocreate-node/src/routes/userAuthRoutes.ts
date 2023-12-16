import { Router } from "express";
import { userLogin, userLogout, userSignUp } from "../controllers/userAuthController";
import { googleOAuthHandler } from "../controllers/sessionsController";

const router = Router();

router.post("/signup", userSignUp);

router.post("/login", userLogin);

router.post("/logout", userLogout);

router.get('/oauth/google', googleOAuthHandler);

export default router;