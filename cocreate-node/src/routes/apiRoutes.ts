import { Router } from "express";
import { getProjects, getProject, createProject, updateProject, deleteProject } from "../controllers/apiController";

const router = Router();

router.get("/projects", getProjects);

router.get("/project", getProject);

router.post("/project", createProject);

router.put("/project", updateProject);

router.delete("/project", deleteProject);

export default router;