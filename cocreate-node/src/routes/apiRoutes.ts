import { Router } from "express";
import { getProjects, getProject, createProject, updateProject, deleteProject, newApplication, getApplicationsPerProf, confirmApplication, rejectApplication, getApplications } from "../controllers/apiController";

const router = Router();

router.get("/projects", getProjects);

router.get("/project/:id", getProject);

router.post("/project/new", createProject);

router.put("/project/:id", updateProject);

router.delete("/project/:id", deleteProject);

router.post("/project/:id/apply", newApplication);

router.get("/project/:id/applied", getApplicationsPerProf);

router.put("/project/:id/confirm", confirmApplication );

router.put("/project/:id/reject", rejectApplication );

router.get("/project/:id/applicants", getApplications);

export default router;