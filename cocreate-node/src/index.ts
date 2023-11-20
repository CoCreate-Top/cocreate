import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
const Pool = require('pg').Pool

dotenv.config()

const app: Express = express()
const port = process.env.NODE_PORT

//TODO: add port to .env file
const pool = new Pool({
    user: 'cocreate',
    host: process.env.DB_HOST,
    database: 'cocreate',
    password: process.env.DB_PASSWORD,
    port: 42069,
});

app.use(express.json());

app.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM "Users"', (error: Error, results: any) => {
        if (error) return res.status(400).send(error);
        res.status(200).json(results.rows)
    });
});

//TODO: hashing passwords
// signup endpoint - needs name, email and password in body
app.post('/signup', (req: Request, res: Response) => {
    const { name, email, password } = req.body;
    pool.query('INSERT INTO "Users" (name, email, password) VALUES ($1, $2, $3)', [name, email, password], (error: Error, results: any) => {
        if (error) return res.status(400).send(error);
        res.status(201).send(`User added with ID: ${results.insertId}`);
    });
});

//TODO: hashing passwords and creating access tokens, refresh tokens
// login endpoint - needs email and password in body
app.post('/login', (req: Request, res: Response) => {
    const { email, password } = req.body;
    pool.query('SELECT * FROM "Users" WHERE email = $1 AND password = $2', [email, password], (error: Error, results: any) => {
        if (error) res.status(400).send(error);
        if (results.rows.length == 0) {
            res.status(401).send('Invalid credentials')
        } else {
            res.status(200).send('Login successful')
        }
    });
});

//TODO: create a logout endpoint, which invalidates the refresh token
app.post('/logout', (req: Request, res: Response) => {
    
});

app.post('/user', (req: Request, res: Response) => {
    pool.query('INSERT INTO test (name) VALUES ($1)', ['denis'], (error: Error, results: any) => {
        if (error) throw error
        res.status(201).send(`User added with ID: ${results.insertId}`)
    });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})