import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
import { Pool } from 'pg'
import bcrypt from 'bcrypt'

dotenv.config()

const app: Express = express()
const port = process.env.NODE_PORT


const pool = new Pool({
    user: 'cocreate',
    host: process.env.DB_HOST,
    database: 'cocreate',
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM "Users"', (error: Error, results: any) => {
        if (error) return res.status(400).send(error);
        res.status(200).json(results.rows)
    });
});


/**
 * Handles user signup. 
 * 
 * Takes name, email and password from request body. 
 * Generates salt and hashes password using bcrypt.
 * Inserts new user with hashed password into database.
 * Returns 201 status on success.
*/
app.post("/signup", (req: Request, res: Response) => {
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

            pool.query('INSERT INTO "Users" (name, email, password) VALUES ($1, $2, $3)', [name, email, hash], (error: Error) => {
                if (error) return res.status(400).send(error);
                res.status(201).send('User created');
            });
        });
    });
});

//TODO: creating access tokens, refresh tokens

/**
 * Login endpoint that takes email and password in request body, 
 * queries for user by email, compares password with bcrypt, 
 * and returns 200 if valid credentials or 401 if invalid.
*/
app.post("/login", (req: Request, res: Response) => {
    const { email, password } = req.body;

    // gets user by email (email is unique)
    pool.query(
        'SELECT * FROM "Users" WHERE email = $1',
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
                    res.status(200).send('Login successful')
                } else {
                    res.status(401).send('Invalid credentials')
                }
            });
        }
    });
});


//TODO: create a logout endpoint, which invalidates the refresh token and access token
app.post('/logout', (req: Request, res: Response) => {

});

app.get('/users', (req: Request, res: Response) => {
    pool.query('SELECT * FROM "Users"', (error: Error, results: any) => {
        if (error) throw error
        res.status(201).send(results.rows)
    });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})