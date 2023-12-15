import express, { Express } from 'express'
import dotenv from 'dotenv'
import userAuthRoutes from './routes/userAuthRoutes'
import { googleOAuthHandler } from './controllers/sessionsController'

dotenv.config()

const app: Express = express()
const port = process.env.NODE_PORT || 8000

app.use(express.json());
app.use('/api/auth', userAuthRoutes);

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.get('/api/sessions/oauth/google', googleOAuthHandler);

// app.get('/', (req: Request, res: Response) => {
//     pool.query('SELECT * FROM "Users"', (error: Error, results: any) => {
//         if (error) return res.status(400).send(error);
//         res.status(200).json(results.rows)
//     });
// });

//TODO: creating access tokens, refresh tokens

// app.get('/users', (req: Request, res: Response) => {
//     pool.query('SELECT * FROM "Users"', (error: Error, results: any) => {
//         if (error) throw error
//         res.status(201).send(results.rows)
//     });
// });

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
})