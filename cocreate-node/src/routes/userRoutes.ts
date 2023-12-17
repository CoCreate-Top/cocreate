import { Router } from "express";
import { getUser, changePassword } from "../controllers/userController";

const router = Router();

router.get("/profile", getUser);

router.patch("/profile", changePassword);

// TODO: Add routes for deleting user?

export default router;