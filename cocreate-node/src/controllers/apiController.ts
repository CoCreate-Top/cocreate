import { Request, Response } from "express";
import pool from "../config/database";
import { Project } from "../types/project";



/**
 * Gets all projects.
 *
 * Queries the "Projects" table and returns all rows.
 */
export const getProjects = (req: Request, res: Response) => {
    pool.query('SELECT * FROM "Projects"', (error: Error, result: any) => {
        if (error) return res.status(400).send(error);
        res.status(200).send(result.rows);
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
    const { id } = req.body;
    pool.query(
        'SELECT * FROM "Projects" WHERE id = $1',
        [id],
        (error: Error, result: any) => {
            if (error) return res.status(400).send(error);
            res.status(200).send(result.rows);
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
    const { title, creator, description } = req.body;
    pool.query(
        'INSERT INTO "Projects" (title, creator, description) VALUES ($1, $2, $3) RETURNING *',
        [title, creator, description],
        (error: Error, result: any) => {
            if (error) return res.status(400).send(error);
            res.status(201).send(result.rows);
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
    const { id, title, creator, status, description } = req.body;

    pool.query(
        'SELECT * FROM "Projects" WHERE id = $1',
        [id],
        (error: Error, result: any) => {
            if (error) return res.status(400).send(error);
            if (result.rows.length === 0) {
                return res.status(404).send("Project not found.");
            }
            const project: Project = result.rows[0];
            pool.query(
                'UPDATE "Projects" SET title = $1, creator = $2, description = $3, status = $4 WHERE id = $5 RETURNING *',
                [
                    title ? title : project.title,
                    creator ? creator : project.creator,
                    description ? description : project.description,
                    status ? status : project.status,
                    id,
                ],
                (error: Error, result: any) => {
                    if (error) return res.status(400).send(error);
                    res.status(200).send(result.rows);
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
    const { id } = req.body;
    pool.query(
        'DELETE FROM "Projects" WHERE id = $1',
        [id],
        (error: Error, result: any) => {
            if (error) return res.status(400).send(error);
            res.status(200).send("Project deleted.");
        }
    );
};
