import express, { Express } from 'express'
import * as swaggerUi from 'swagger-ui-express';
import session from 'express-session'
import connectPgSimple from 'connect-pg-simple'

import dotenv from 'dotenv'
import userAuthRoutes from './routes/userAuthRoutes'
import apiRoutes from './routes/apiRoutes'
import { ensureAuthenticated } from './controllers/sessionsController'
import pool from './config/database';

dotenv.config()

const app: Express = express()

const PgStore = connectPgSimple(session);

app.use(session({
    store: new PgStore({
        pool: pool,
    }),
    secret: process.env.ACCESS_TOKEN_SECRET as string,
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false, maxAge: 1000 * 60 * 30 }
}));

// Swagger configuration
const swaggerDocument = require('../swagger/swagger-output.json');

const port = process.env.NODE_PORT || 8000

app.use(express.json());
app.use('/api/auth', userAuthRoutes);
app.use('/api/db', ensureAuthenticated, apiRoutes);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// TEST ROUTES

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.get("/ping/secure", ensureAuthenticated, (req, res) => {
    res.status(200).json({ message: "pong" });
});


// app.get('/', (req: Request, res: Response) => {
//     pool.query('SELECT * FROM "users"', (error: Error, results: any) => {
//         if (error) return res.status(400).send(error);
//         res.status(200).json(results.rows)
//     });
// });

// app.get('/users', (req: Request, res: Response) => {
//     pool.query('SELECT * FROM "users"', (error: Error, results: any) => {
//         if (error) throw error
//         res.status(201).send(results.rows)
//     });
// });

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});