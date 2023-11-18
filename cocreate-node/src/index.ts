import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
const Pool = require('pg').Pool

dotenv.config()

const app: Express = express()
const port = process.env.NODE_PORT

const pool = new Pool({
    user: 'cocreate',
    host: process.env.DB_HOST,
    database: 'cocreate',
    password: process.env.DB_PASSWORD,
    port: 42069,
});

app.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM test', (error: Error, results: any) => {
        if (error) throw error
        res.status(200).json(results.rows)
    });
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