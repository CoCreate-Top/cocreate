import express, { Express } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

import dotenv from 'dotenv';
import userAuthRoutes from './routes/userAuthRoutes';
import projectRoutes from './routes/projectRoutes';
import { ensureAuthenticated } from './controllers/sessionsController';
import pool from './config/database';
import cors from 'cors';
import userRoutes from './routes/userRoutes';

dotenv.config();

const app: Express = express();

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

const port = process.env.NODE_PORT || 8000;

app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['http://cocreate.top', 'http://localhost:4200'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    }
  }));
app.use(express.json());

app.use('/api/auth', userAuthRoutes);

app.use('/api/db', ensureAuthenticated, projectRoutes);

app.use('/api/users', ensureAuthenticated, userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// TEST ROUTES

app.get("/ping", (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.get("/ping/secure", ensureAuthenticated, (req, res) => {
    res.status(200).json({ message: "pong" });
});

app.get("/", (req, res) => {
    res.status(200).json({ message: "Merry Chryzler" });
});

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});