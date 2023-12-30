import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';
import { User, UserProfile } from '../models/userModel';

export const getUser = (req: Request, res: Response) => {
    if (req.session.userId) {
        pool.query(
            'SELECT * FROM "users" WHERE id = $1',
            [req.session.userId],
            (error: Error, results: any) => {
                if (error) return res.status(400).json({ error });
                const user: User = results.rows[0];
                res.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email
                });
            }
        );
    } else {
        return res.status(401).json({ error: "No user logged in" });
    }
}

export const changePassword = (req: Request, res: Response) => {
    const { new_password, old_password } = req.body;
    if (!req.session.userId) return res.status(401).json({ error: "No user logged in" });

    pool.query(
        'SELECT * FROM "users" WHERE id = $1', 
        [req.session.userId], (error: Error, results: any) => {
            if (error) return res.status(400).json({ error });
            if (results.rows.length == 0) return res.status(401).json({error: 'User not found'});
            const user: User = results.rows[0];

            bcrypt.compare(old_password, user.password, (err: Error | undefined, result: boolean) => {
            if (err) return res.status(400).json({ err });
            if (!result) return res.status(401).json({error: 'Invalid password'});

            bcrypt.genSalt(Number(process.env.SALT_ROUNDS), (err: Error | undefined, salt: string) => {
                if (err) return res.status(400).json({ err });

                bcrypt.hash(new_password, salt, (err: Error | undefined, hash: string) => {
                    if (err) return res.status(400).json({ err });
                    pool.query(
                        'UPDATE "users" SET password = $1 WHERE id = $2',
                        [hash, req.session.userId],
                        (error: Error) => {
                            if (error) return res.status(400).json({ error });
                            res.status(200).json({ message: "Password updated" });
                        }
                    );
                });
            });
        });
    });
}

export const getMyProfile = (req: Request, res: Response) => {
    if (!req.session.userId) return res.status(401).json({ error: "No user logged in" });
    pool.query(
        'SELECT * FROM "user_profile" WHERE id = $1',
        [req.session.userId],
        (error: Error, results: any) => {
            if (error) return res.status(400).json({ error });
            const user: UserProfile = results.rows[0];
            res.status(200).json({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                about_me: user.about_me,
                skills: user.skills,
                job_title: user.job_title,
                experience: user.experience,
                education: user.education,
                location: user.location,
                languages: user.languages,
                linkedin: user.linkedin,
                github: user.github
            });
        }
    );
}

export const getUserProfile = (req: Request, res: Response) => {
    const { id } = req.params;
    pool.query(
        'SELECT * FROM "user_profile" WHERE id = $1',
        [id],
        (error: Error, results: any) => {
            if (error) return res.status(400).json({ error });
            const user: UserProfile = results.rows[0];
            res.status(200).json({
                id: user.id,
                first_name: user.first_name,
                last_name: user.last_name,
                about_me: user.about_me,
                skills: user.skills,
                job_title: user.job_title,
                experience: user.experience,
                education: user.education,
                location: user.location,
                languages: user.languages,
                linkedin: user.linkedin,
                github: user.github
            });
        }
    );
}

export const changeUserProfile = (req: Request, res: Response) => {
    const { id } = req.params;

    let query = 'UPDATE "user_profile" SET';
    let params = [];
    let index = 1;

    for (let field of ['first_name', 'last_name', 'about_me', 'skills', 'job_title', 'experience', 'education', 'location', 'languages', 'linkedin', 'github']) {
        if (req.body[field]) {
            query += ` ${field} = $${index},`;
            params.push(req.body[field]);
            index++;
        }
    }

    query = query.slice(0, -1) + ` WHERE id = $${index} RETURNING *`;
    params.push(id);

    pool.query(query, params, (error: Error, results) => {
        if (error) return res.status(400).json({ error });
        res.status(200).json(results.rows[0]);
    });
}