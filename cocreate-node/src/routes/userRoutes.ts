import { Router } from "express";
import { getUser, changePassword, getUserProfile, getMyProfile, changeUserProfile } from "../controllers/userController";

const router = Router();

router.get("/user", getUser);

router.patch("/user", changePassword);

router.get("/profile", getMyProfile);

router.get("/profile/:id", getUserProfile);

router.patch("/profile/:id", changeUserProfile);

// TODO: Add routes for deleting user?

export default router;