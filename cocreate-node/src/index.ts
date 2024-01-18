import express, { Express } from 'express';
import * as swaggerUi from 'swagger-ui-express';
import session from 'express-session';
import connectPgSimple from 'connect-pg-simple';

import dotenv from 'dotenv';
import userAuthRoutes from './routes/userAuthRoutes';
import projectRoutes from './routes/projectRoutes';
import { ensureAuthenticated } from './controllers/sessionsController';
import pool, { isProduction } from './config/database';
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
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 1000 * 60 * 30 }
}));

// Swagger configuration
const swaggerDocument = require('../swagger/swagger-output.json');

const port = process.env.NODE_PORT || 8000;

app.use(cors({
    origin: function (origin, callback) {
      const allowedOrigins = ['https://cocreate.top', 'http://localhost:4200'];
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    maxAge: 9999999999 // TODO: hotfix :glad:
  }));

app.use(express.json());

app.use('/api/auth', userAuthRoutes);

app.use('/api/db', ensureAuthenticated, projectRoutes);

app.use('/api/users', ensureAuthenticated, userRoutes);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

/* TEST ROUTES */

app.get("/ping", (_req, res) => {
    if (!isProduction()) res.status(200).json({ message: "pong (dev)" });
    else res.status(200).json({ message: "pong" });
});

app.get("/ping/secure", ensureAuthenticated, (_req, res) => {
    res.status(200).json({ message: "pong" });
});

app.get("/", (_req, res) => {
    res.status(200).json({ message: "Merry Chryzler" });
});

/* END OF TEST ROUTES */

app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
