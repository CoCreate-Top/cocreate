import { Request, Response } from "express";
import pool from "../config/database";
import { Project } from "../models/projectModel";
import { Application } from "../models/applicationModel";

/**
 * Gets all projects.
 *
 * Queries the "Projects" table and returns all rows.
 */
export const getProjects = (req: Request, res: Response) => {
    pool.query('SELECT * FROM "projects"', (error: Error, result: any) => {
        if (error) return res.status(400).json(error);
        res.status(200).json(result.rows);
    });
};

/**
 * Gets a project by ID.
 *
 * Takes an ID in the request body.
 * Queries the "Projects" table by that ID.
 * Returns the project data if found, error if not.
 */
export const getProject = (req: Request, res: Response) => {
    const id = req.params.id;
    pool.query(
        'SELECT * FROM "projects" WHERE id = $1',
        [id],
        (error: Error, result: any) => {
            if (error) return res.status(400).json(error);
            if (result.rowCount === 0)
                return res.status(404).json({ message: "Project not found" });
            res.status(200).json(result.rows);
        }
    );
};

/**
 * Creates a new project.
 *
 * Takes a request body containing the project title, creator, and description.
 * Inserts a new row into the "Projects" table with these values.
 * Returns the new project data including auto-generated ID.
 */
export const createProject = (req: Request, res: Response) => {
    const { title, description } = req.body;
    pool.query(
        'INSERT INTO "projects" (title, creator, description) VALUES ($1, $2, $3) RETURNING *',
        [title, req.session.userId, description],
        (error: Error, result: any) => {
            if (error) return res.status(400).json(error);
            res.status(201).json(result.rows);
        }
    );
};

/**
 * Updates a project in the database.
 *
 * Takes a request body containing the project ID and optionally a new title,
 * creator, status, and description. Queries the database to get the existing
 * project data. Updates the project by setting any provided fields to the new
 * values, while keeping existing values for any fields not provided.
 * Returns the updated project data.
 */
export const updateProject = (req: Request, res: Response) => {
    const id = req.params.id;
    const { title, creator, status, description } = req.body;

    pool.query(
        'SELECT * FROM "projects" WHERE id = $1',
        [id],
        (error: Error, result: any) => {
            if (error) return res.status(400).json(error);
            if (result.rows.length === 0) {
                return res.status(404).json({ message: "Project not found." });
            }
            const project: Project = result.rows[0];
            if (project.creator !== req.session.userId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            pool.query(
                'UPDATE "projects" SET title = $1, creator = $2, description = $3, status = $4 WHERE id = $5 RETURNING *',
                [
                    title ? title : project.title,
                    creator ? creator : project.creator,
                    description ? description : project.description,
                    status ? status : project.status,
                    id,
                ],
                (error: Error, result: any) => {
                    if (error) return res.status(400).json(error);
                    res.status(200).json(result.rows);
                }
            );
        }
    );
};

/**
 * Deletes a project by ID.
 *
 * Takes id of project
 * Returns nothing
 */

export const deleteProject = (req: Request, res: Response) => {
    const id = req.params.id;
    pool.query(
        'SELECT creator FROM "projects" WHERE id = $1',
        [id],
        (error: Error, result: any) => {
            if (error) return res.status(400).json(error);
            if (result.rows.length === 0)
                return res.status(404).json({ message: "Project not found." });
            if (result.rows[0].creator !== req.session.userId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            pool.query(
                'DELETE FROM "projects" WHERE id = $1',
                [id],
                (error: Error, result: any) => {
                    if (error) return res.status(400).json(error);
                    res.status(200).json({ message: "Project deleted." });
                }
            );
        }
    );
};

export const newApplication = (req: Request, res: Response) => {
    const projectId = req.params.id;
    const { profession } = req.body;

    pool.query(
        'INSERT INTO "applications" (project_id, user_id, profession) VALUES ($1, $2, $3)',
        [projectId, req.session.userId, profession],
        (error: Error, result: any) => {
            if (error) return res.status(400).json(error);
            res.status(200).json({ message: "Application created." });
        }
    );
};

export const getApplicationsPerProf = (req: Request, res: Response) => {
    const id = req.params.id;

    pool.query(
        'SELECT profession, COUNT(*) FROM "applications" WHERE project_id = $1 GROUP BY profession',
        [id],
        (error: Error, result: any) => {
            if (error) return res.status(400).json(error);
            if (result.rows.length === 0)
                return res
                    .status(404)
                    .json({ message: "Project not found or no applicants." });
            let applications = result.rows;
            var dict: { [key: string]: number } = {};
            applications.forEach(
                (app: any) => (dict[app.profession] = app.count)
            );
            res.status(200).json(dict);
        }
    );
};

export const confirmApplication = (req: Request, res: Response) => {
    const projectId = req.params.id;
    const { id } = req.body;

    pool.query(
        'SELECT creator FROM "projects", "applications" WHERE project_id = $1 AND project_id = id',
        [projectId],
        (error: Error, result: any) => {
            if (error) return res.status(400).json(error);
            if (result.rows.length === 0)
                return res.status(404).json({
                    message: "Project not found or wrong applicant id.",
                });
            if (result.rows[0].creator !== req.session.userId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            pool.query(
                'UPDATE "applications" SET status = ' +
                    "'approved'" +
                    " WHERE user_id = $1 AND project_id = $2",
                [id, projectId],
                (error: Error, res: any) => {
                    if (error) return res.status(400).json(error);
                    res.status(200).json(result.rows);
                }
            );
        }
    );
};

export const rejectApplication = (req: Request, res: Response) => {
    const projectId = req.params.id;
    const { id } = req.body;

    pool.query(
        'SELECT creator FROM "projects", "applications" WHERE project_id = $1 AND project_id = id',
        [projectId],
        (error: Error, result: any) => {
            if (error) return res.status(400).json(error);
            if (result.rows.length === 0)
                return res.status(404).json({
                    message: "Project not found or wrong applicant id.",
                });
            if (result.rows[0].creator !== req.session.userId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            pool.query(
                'UPDATE "applications" SET status = ' +
                    "'rejected'" +
                    " WHERE user_id = $1 AND project_id = $2",
                [id, projectId],
                (error: Error, res: any) => {
                    if (error) return res.status(400).json(error);
                    res.status(200).json(result.rows);
                }
            );
        }
    );
};

export const getApplications = (req: Request, res: Response) => {
    const id = req.params.id;
    pool.query(
        'SELECT creator FROM "projects", "applications" WHERE project_id = $1 AND project_id = id',
        [id],
        (error: Error, result: any) => {
            if (error) return res.status(400).json(error);
            if (result.rows.length === 0)
                return res
                    .status(404)
                    .json({ message: "Project not found or no applicants." });
            if (result.rows[0].creator !== req.session.userId) {
                return res.status(403).json({ message: "Unauthorized" });
            }
            pool.query(
                'SELECT "applications".* FROM "applications", "projects" WHERE project_id = $1 AND creator = $2',
                [id, req.session.userId],
                (error: Error, result: any) => {
                    if (error) return res.status(400).json(error);
                    const apps: Application[] = result.rows;

                    var dict: { [key: string]: string[] } = {};

                    apps.forEach((app: Application) => {
                        if (dict[app.profession] !== undefined) {
                            dict[app.profession].push(app.user_id);
                        } else {
                            dict[app.profession] = [app.user_id];
                        }
                    });

                    res.status(200).json(dict);
                }
            );
        }
    );
};
