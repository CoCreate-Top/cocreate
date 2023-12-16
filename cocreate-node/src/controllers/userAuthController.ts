import { Request, Response } from 'express';
import bcrypt from 'bcrypt'
import pool from '../config/database';


/**
 * Handles user signup. 
 * 
 * Takes name, email and password from request body. 
 * Generates salt and hashes password using bcrypt.
 * Inserts new user with hashed password into database.
 * Returns 201 status on success.
*/
export const userSignUp = (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // generates salt with number rounds of hashing provided in .env
    bcrypt.genSalt(Number(process.env.SALT_ROUNDS), (err: Error | undefined, salt: string) => {
        if (err) return res.status(400).send(err);

        // hashes password with salt
        bcrypt.hash(password, salt, (err: Error | undefined, hash: string) => {
            if (err) return res.status(400).send(err);

            //? password is hashed in the following format: $2b$10$b63K/D03WFBktWy552L5XuibmiD5SxCrKg9kHCqOYaZwxRjIg14u2
            // $2b$ - hashing algorithm
            // 10 - number of rounds of hashing
            // b63K/D03WFBktWy552L5Xu - salt
            // ibmiD5SxCrKg9kHCqOYaZwxRjIg14u2 - hashed password

            pool.query('INSERT INTO "users" (name, email, password) VALUES ($1, $2, $3) RETURNING id', [name, email, hash], (error: Error, result) => {
                if (error) return res.status(400).send(error);
                req.session.userId = result.rows[0].id;
                res.status(201).send('User created');
            });
        });
    });
};

/**
 * Login endpoint that takes email and password in request body, 
 * queries for user by email, compares password with bcrypt, 
 * and returns 200 if valid credentials or 401 if invalid.
*/
export const userLogin = (req: Request, res: Response) => {
    const { email, password } = req.body;

    // gets user by email (email is unique)
    pool.query(
        'SELECT * FROM "users" WHERE email = $1',
        [email],
        (error: Error, results: any) => {
            if (error) return res.status(400).send(error);
        if (results.rows.length == 0) {
            return res.status(401).send('Invalid credentials')
        } else {
            // if user exists compare password
            bcrypt.compare(password, results.rows[0].password, (err: Error | undefined, result: boolean) => {
                if (err) return res.status(400).send(err);
                if (result) {
                    req.session.userId = results.rows[0].id;
                    res.status(200).send('Login successful')
                } else {
                    res.status(401).send('Invalid credentials')
                }
            });
        }
    });
};

export const userLogout = (req: Request, res: Response) => {
    if (req.session.userId) {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).send("Could not log out");
            } else {
                return res.status(200).send("Logged out successfully");
            }
        });
    } else {
        return res.status(200).send("No user logged in");
    }
};