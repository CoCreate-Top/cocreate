import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
const Pool = require('pg').Pool

dotenv.config()

const app: Express = express()
const port = process.env.NODE_PORT

const bcrypt = require('bcrypt')

const pool = new Pool({
    user: 'cocreate',
    host: process.env.DB_HOST,
    database: 'cocreate',
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT,
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM "Users"', (error: Error, results: any) => {
        if (error) return res.status(400).send(error);
        res.status(200).json(results.rows)
    });
});

// signup endpoint - needs name, email and password in body
app.post('/signup', (req: Request, res: Response) => {
    const { name, email, password } = req.body;

    // generates salt with number rounds of hashing provided in .env
    bcrypt.genSalt(process.env.SALT_ROUNDS, (err: Error, salt: string) => {
        if (err) return res.status(400).send(err);

        // hashes password with salt
        bcrypt.hash(password, salt, (err: Error, hash: string) => {
            if (err) return res.status(400).send(err);

            //? password is hashed in the following format: $2b$10$b63K/D03WFBktWy552L5XuibmiD5SxCrKg9kHCqOYaZwxRjIg14u2
            // $2b$ - hashing algorithm
            // 10 - number of rounds of hashing
            // b63K/D03WFBktWy552L5Xu - salt
            // ibmiD5SxCrKg9kHCqOYaZwxRjIg14u2 - hashed password

            pool.query('INSERT INTO "Users" (name, email, password) VALUES ($1, $2, $3)', [name, email, hash], (error: Error, results: any) => {
                if (error) return res.status(400).send(error);
                console.log(results);
                res.status(201);
            });
        });
    });
});

//TODO: creating access tokens, refresh tokens
// login endpoint - needs email and password in body
app.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    
    // gets user by email (email is unique)
    pool.query('SELECT * FROM "Users" WHERE email = $1', [email], (error: Error, results: any) => {
        if (error) res.status(400).send(error);
        if (results.rows.length == 0) {
            res.status(401).send('Invalid credentials')
        } else {
            // if user exists compare password
            bcrypt.compare(password, results.rows[0].password, (err: Error, result: boolean) => {
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