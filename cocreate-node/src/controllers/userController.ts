import { Request, Response } from 'express';
import pool from '../config/database';
import bcrypt from 'bcrypt';
import { User } from '../models/userModel';

export const getUser = (req: Request, res: Response) => {
    if (req.session.userId) {
        pool.query(
            'SELECT * FROM "users" WHERE id = $1',
            [req.session.userId],
            (error: Error, results: any) => {
                if (error) return res.status(400).send(error);
                const user: User = results.rows[0];
                res.status(200).json({
                    id: user.id,
                    name: user.name,
                    email: user.email
                });
            }
        );
    } else {
        return res.status(401).send("No user logged in");
    }
}

export const changePassword = (req: Request, res: Response) => {
    const { new_password, old_password } = req.body;
    if (!req.session.userId) return res.status(401).send("No user logged in");

    pool.query(
        'SELECT * FROM "users" WHERE id = $1', 
        [req.session.userId], (error: Error, results: any) => {
            if (error) return res.status(400).send(error);
            if (results.rows.length == 0) return res.status(401).send('User not found');
            const user: User = results.rows[0];

            bcrypt.compare(old_password, user.password, (err: Error | undefined, result: boolean) => {
            if (err) return res.status(400).send(err);
            if (!result) return res.status(401).send('Invalid password');

            bcrypt.genSalt(Number(process.env.SALT_ROUNDS), (err: Error | undefined, salt: string) => {
                if (err) return res.status(400).send(err);

                bcrypt.hash(new_password, salt, (err: Error | undefined, hash: string) => {
                    if (err) return res.status(400).send(err);
                    pool.query(
                        'UPDATE "users" SET password = $1 WHERE id = $2',
                        [hash, req.session.userId],
                        (error: Error) => {
                            if (error) return res.status(400).send(error);
                            res.status(200).send("Password updated");
                        }
                    );
                });
            });
        });
    });
}