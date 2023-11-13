import express, { Express, Request, Response } from 'express'
import dotenv from 'dotenv'
const Pool = require('pg').Pool

dotenv.config()

const app: Express = express()
const port = process.env.NODE_PORT

const pool = new Pool({
    user: 'cocreate',
    host: '93.103.55.194',
    database: 'cocreate',
    password: 'cocreate_denis1234',
    port: 42069,
})

app.get('/', (req: Request, res: Response) => {
    pool.query('SELECT * FROM test', (error: Error, results: any) => {
        if (error) throw error
        res.status(200).json(results.rows)
    })
})

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})